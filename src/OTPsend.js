const nodemailer=require('nodemailer')

const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'anshika.oe@gmail.com',
        pass:"princeofpersia"
    }
})

const mailConfig={
    from:'anshika.oel@gmail.com',
    to:'anshika.oel@gmail.com',
    subject:'OTP Verification',
    text:`Your OTP for the verification is ${otp}`
}

transporter.sendMail(mailConfig,(err,info)=>{
    if(err){
        console.error('Error Sending email : ',err)
    }else{
        console.log('Email sent successfully')
    }
})