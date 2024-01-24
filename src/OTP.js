import React from 'react'

export default function OTP() {
  return (
    <div>
      <label for="otp"><h1>Enter the OTP send on Your Email</h1></label>
      <input type='number' minLength={4} maxLength={4}></input>
      
    </div>
  )
} 