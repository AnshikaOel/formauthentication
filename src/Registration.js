import React, { useState } from 'react'
import image from "./background.jpg"
import { toast } from 'react-toastify'
export default function Registration() {
  
    const [fname,fnamechange]=useState("")
    const [lname,lnamechange]=useState("")
    const [phoneno,phonenochange]=useState("")
    const [email,emailchange]=useState("")
    const [password,passwordchange]=useState("")
    const [confirmpassword,confirmpasswordchange]=useState("")

    const handleregistration=(e)=>{
        e.preventDefault()
        let info={fname,lname,phoneno,email,password,confirmpassword}
        console.log(info)

        fetch("http://localhost:3000/user",{
            method:"POST",
            headers:{'content-type':'application/json'},
            body:JSON.stringify(info)
        }).then((res)=>{
               toast.success('Registered Succesfully')
        }).catch((err)=>{
               toast.error('failed:'+err.message)
        })
    }
    
    const fnamehandle=(e)=>{
        e=fnamechange(e.target.value)
        // const lent=2
        if(fname.length>=2) {
            console.log("valid")
        }else{
            console.log("invalid"+fname)
        }
    }

    return (
    <div>
    <img src={image}/>
    <div id='d'>
      <form className="row g-3" >
        <div className="col-md-6">
          <label for="inputEmail4" className="form-label">First Name</label>
          <input type="text" className="form-control" value={fname} onChange={fnamehandle}></input>
        </div>
        <div className="col-md-6">
          <label for="inputEmail4" className="form-label">Last Name</label>
          <input type="text" className="form-control" value={lname} onChange={e=>lnamechange(e.target.value)}></input>
        </div>
        <div className="col-md-6">
          <label for="inputEmail4" className="form-label">Phone No.</label>
          <input type="number" className="form-control" value={phoneno} onChange={e=>phonenochange(e.target.value)}></input>
        </div>
        <div className="col-md-6">
          <label for="inputEmail4" className="form-label">Email</label>
          <input type="email" className="form-control" value={email} onChange={e=>emailchange(e.target.value)}></input>
        </div>
        <div className="col-md-6">
          <label for="inputPassword4" className="form-label">Password</label>
          <input type="password" className="form-control" value={password} onChange={e=>passwordchange(e.target.value)}></input>
        </div>
        <div className="col-md-6">
          <label for="inputEmail4" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" value={confirmpassword} onChange={e=>confirmpasswordchange(e.target.value)}></input>
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
