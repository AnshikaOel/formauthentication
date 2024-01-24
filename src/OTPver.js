const express=require('express')
const bodyParser=require('body-parser')

const app=express()
const port = 5000;

app.use(bodyParser.json())

let otp;
function generateOTP(){
    otp= Math.trunc(Math.random() * 1000);
}
const getOTP=() => {
    return otp
}

app.post('/api/geneateOTP',(req,res)=>{
    generateOTP()
    res.json({otp:getOTP()})
})

app.listen(port,()=>{
    console.log("Server is running on port 3000")
})
// module.exports = {generateOTP,getOTP: () => otp}