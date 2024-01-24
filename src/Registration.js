import React, { useState } from 'react'
import image from "./background.jpg"
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
const {generateOTP,otp}=require('./OTPver')
export default function Registration() {
    
    const [fname,fnamechange]=useState("")
    const [lname,lnamechange]=useState("")
    const [id,idchange]=useState("")
    const [password,passwordchange]=useState("")
    const [generatedOTP,generatedOTPChange]=useState("")
    const navigate=useNavigate();

    const handleregistration=(e)=>{
        e.preventDefault()
        let info={id,fname,lname,password}
        console.log(info)
        fetch("http://localhost:3000/user",{
            method:"POST",
            headers:{'content-type':'application/json'},
            body:JSON.stringify(info)
        }).then((res)=>{
               toast.success('Registered Succesfully')
               navigate('/Login')
        }).catch((err)=>{
               toast.error('failed:'+err.message)
        })
    }

    const validateEmail = (id) => {
      return String(id)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const validatePassword=(password)=>{
      var uppercase=/[A-Z]/g
      var lowerCase=/[a-z]/g
      var number=/[0-9]/g
      var specialChar=/[!@#$%^&*()_+{}\]:;<>,.?~\\/-]/
        if(password.length>=8 && password.match(lowerCase) && password.match(uppercase) && password.match(number) && password.match(specialChar))
        return true
      return false
    }

    const hide=()=>{
      const a= document.getElementsByTagName('p')
      for( let i=0;i<a.length;i++)
      {a[i].style.display='none'}
    }

    const validateAll=()=>{
      if(validatePassword(password) && validateEmail(id))
      {
        handleGeneatedOTP()
        navigate('/OTP')
      }else{
        alert("Enter valid email Id and Password")
      }
    }

const handleGeneatedOTP=async()=>{
  try{
    const response=await fetch('/api/generateOTP',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
    })
   if(response.ok){
    const data=await response.json()
    generatedOTPChange(data.otp)
   }else{
    console.log('Failed to generate OTP')
   }
  }catch(error){
    console.log("Error geneating OTP : ",error)
  }
} 
    return (
    <div onLoad={hide()}>
    <img src={image} alt='background-image'/>
    <div id='d'>
      <h3>Create Your Account</h3>
      <br></br>
      <form className="row g-3" >
        <div className="col-md-6">
          <label for="inputEmail4" className="form-label">First Name</label>
          <input type="text" className="form-control" value={fname} onChange={(e)=>fnamechange(e.target.value)}></input><p className={fname.length<2?'invalid':'invalid-hide'}>*Invalid First Name</p>
        </div>
        <div className="col-md-6">
          <label for="inputEmail4" className="form-label">Last Name</label>
          <input type="text" className="form-control" value={lname} onChange={(e)=>lnamechange(e.target.value)}></input><p className={lname.length<2?'invalid':'invalid-hide'}>*Invalid Last Name</p>
        </div>
        <div className="col-md-6">
          <label for="inputEmail4" className="form-label">Email</label>
          <input type="email" className="form-control" value={id} onChange={(e)=>idchange(e.target.value)}></input><p className={validateEmail(id)?'invalid-hide':'invalid'}>*Invalid Email</p>
        </div>
        <div className="col-md-6">
          <label for="inputPassword4" className="form-label">Password</label>
          <input type="password" className="form-control" value={password} onChange={(e)=>passwordchange(e.target.value)}></input><p className={validatePassword(password)?'invalid-hide':'invalid'}>*Invalid Password</p>
        </div>
        <div className="col-12">
          {/* <button type="submit" className="btn btn-primary" onClick={handleregistration}>Sign up</button> */}
          <button type='submit' className='btn btn-primary' onClick={validateAll}>Continue</button>
        </div>
        </form>
    </div>
{/* onClick={OTPver.generateOTP}  */}
    </div>
  )
}
