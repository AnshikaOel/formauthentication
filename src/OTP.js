import React, { useEffect, useState } from 'react'
import { Link, useNavigate,useLocation } from 'react-router-dom';
import image from "./shareThought.jpg"

export default function OTP() {
  const location = useLocation();
 
  const navigate=useNavigate();
  const  [userOTP,setuserOTP]=useState('')
  const {state:{info}}=location
  // console.log("this is location "+info)
  useEffect(()=>{ 
    console.log('Recieved props in otp',info) 
  },[info])
  
  const handleregistration=async(e)=>{
    try{
    const response=await fetch("http://localhost:5000/userInfo",{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
    body:JSON.stringify(info),
    }) 
    if(response.ok){
      console.log("Data saved succcessfully on server")
    }else{
      navigate('/registration')
      console.log("Failed to save data server"+response.status)
    }
    }catch(err){
      console.error(err)
    }
}
  const SubmitOTP=async(e)=>{
    e.preventDefault();  
    console.log("this is just try")
    try{
      const response=await fetch('http://localhost:5000/verifyOTP',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',    
        },
        body:JSON.stringify({userOTP})
      })
      const responseData=await response.json()
      if(responseData.message=='true'){
        console.log("this is otp--"+responseData.message)
        //  info=JSON.stringify(info)
        // console.log("this is OTP"+info)
        // 
        handleregistration()
        let a=JSON.stringify(info)
        let b=JSON.parse(a)
        console.log("this is handle rehistration"+typeof(b))
        console.log("this is handle rehistration"+b.id)
        let id=b.id
        // console.log("this is for accounte created")
        navigate('/AccountCreated',{state:{id}})
      }else{
        // console.log("this is for registration")
        navigate('/registration')
      }
    }catch(error){
      console.error('Error sending data ',error)
    }
  }
  return (
    <div>
    <img src={image} alt='background-image'/>
    <div id='d'>
    <form className="row g-3" action="/submit" method="post" onSubmit={SubmitOTP}>
      <div>
      <label for="otp"><h1>Enter the OTP send on Your Email</h1></label>
      <input type='number' minLength={4} maxLength={4} className='otpbox' value={userOTP} onChange={(e)=>{setuserOTP(e.target.value)}}></input>
      <br></br>
      <center><button type='submit' className='btn btn-primary submitText' >Continue</button></center>
      </div>
    </form>  
    </div>
    </div>
  )
}  