import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Login() {

  const [id,idUpdate]=useState('')
  const [password,passwordUpdate]=useState('')

  const ProceedLogin=(e)=>{
    e.preventDefault()
    if(validate())
    {
      console.log('procedd')
      fetch("http://localhost:3000/user/"+id).then((res)=>{
        console.log(res)
        return res.json()
      }).then((resp)=>{
        console.log(resp)
      }).catch((err)=>{
        toast.error('Login Failed due to : '+err.message)
      })
    }
  }

  const validate=()=>{
    let result=true;
    if(id==='' || id===null){
      result=false
      toast.warning('Please enter a Email Id')
    }
    if(password==='' || password===null){
      result=false
      toast.warning('Please Enter a valid Password')
    }
    return result
  }

  return (
    <div className='row'>
      <div className=''>
        <form onSubmit={ProceedLogin} className=''>
          <div>
            <div>
              <h2>User Login</h2>
            </div>
            <div>
              <div>
                <label>Email</label>
                <input type='text' className='' value={id} onChange={e=>idUpdate(e.target.value)}></input>
              </div>
              <div>
                <label>Password</label>
                <input type='password' className='' value={password} onChange={e=>passwordUpdate(e.target.value)}></input>
              </div>
            </div>
            <div className=''>
              <button type='submit' className=''>Submit</button>
              <Link className="" to={'/registration'}>New User</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
