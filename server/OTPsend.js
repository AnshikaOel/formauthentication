const nodemailer=require('nodemailer')
// const cors = require('cors');

const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'yourgmail@gmail.com',
        pass:"your password"
    },
})
   

const sendemail=(useremail,otp)=>{
    const mailConfig={
        from:'your gmail@gmail.com',
        to:useremail,
        subject:'OTP Verification',
        text:`Your OTP for the verification is ${otp}`
    }
    
    return new Promise((resolve,reject)=>{
    transporter.sendMail(mailConfig,(err,info)=>{
        if(err){
            console.error('Error Sending email : ',err)
            reject(err)
        }else{
            console.log('Email sent successfully')
            resolve(info)
        }
    })
})

}

module.exports={sendemail}