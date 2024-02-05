const express=require('express')
const bodyParser=require('body-parser')
const cors = require('cors');
const app=express() 
app.use(bodyParser.json())

let otp;
function generateOTP(){
 otp=Math.trunc(Math.random()*10000)
}

function getOTP(){
    return otp
}
  
function verifyOTP(userOTP){
    console.log("THis is otp verification")
    if(userOTP==1111) return true
       return false
}

console.log(otp)
module.exports={generateOTP,getOTP,verifyOTP}
