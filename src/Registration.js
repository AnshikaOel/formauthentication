import React, { useState } from 'react'
import image from "./background.jpg"
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
export default function Registration() {
  
    const [fname,fnamechange]=useState("")
    const [lname,lnamechange]=useState("")
    const [phoneno,phonenochange]=useState("")
    const [id,idchange]=useState("")
    const [password,passwordchange]=useState("")
    const [confirmpassword,confirmpasswordchange]=useState("")

    const navigate=useNavigate();

    const handleregistration=(e)=>{
        e.preventDefault()
        let info={id,fname,lname,phoneno,password,confirmpassword}
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

    const validateConfirmPassword=(confirmpassword,password)=>{
      if(password===confirmpassword) return true;
      return false;
    }

    const hide=()=>{
      const a= document.getElementsByTagName('p')
      for( let i=0;i<a.length;i++)
      {a[i].style.display='none'}
    }

    return (
    <div onLoad={hide()}>
    <img src={image} alt='background-image'/>
    <div id='d'>
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
          <label for="inputEmail4" className="form-label">Phone No.</label>
          <input type="number" className="form-control" value={phoneno} onChange={(e)=>phonenochange(e.target.value)}></input><p className={phoneno.length!==10?'invalid':'invalid-hide'}>*Invalid Phone Number</p>
        </div>
        <div className="col-md-6">
          <label for="inputEmail4" className="form-label">Email</label>
          <input type="email" className="form-control" value={id} onChange={(e)=>idchange(e.target.value)}></input><p className={validateEmail(id)?'invalid-hide':'invalid'}>*Invalid Email</p>
        </div>
        <div className="col-md-6">
          <label for="inputPassword4" className="form-label">Password</label>
          <input type="password" className="form-control" value={password} onChange={(e)=>passwordchange(e.target.value)}></input><p className={validatePassword(password)?'invalid-hide':'invalid'}>*Invalid Password</p>
        </div>
        <div className="col-md-6">
          <label for="inputEmail4" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" value={confirmpassword} onChange={(e)=>confirmpasswordchange(e.target.value)}></input><p className={validateConfirmPassword(confirmpassword,password)?'invalid-hide':'invalid'}>*Password Does not match</p>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary" onClick={handleregistration}>Sign up</button>
          <button type="Login" className="btn btn-primary" >Login</button>
        </div>
        </form>
    </div>

    </div>
  )
}
