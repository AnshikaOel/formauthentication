import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {

  const [email,emailUpdate]=useState('')
  const [password,passwordUpdate]=useState('')

  const ProceedLogin=(e)=>{
    e.preventDefault()
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
                <input type='text' className='' value={email} onChange={emailUpdate}></input>
              </div>
              <div>
                <label>Password</label>
                <input type='password' className='' value={password} onChange={passwordUpdate}></input>
              </div>
            </div>
            <div className=''>
              <button type='submit' className=''></button>
              <Link className="" to={'/registration'}>New User</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
