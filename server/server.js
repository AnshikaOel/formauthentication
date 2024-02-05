const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {generateOTP,getOTP,verifyOTP} = require('./OTPver');  // Import the OTPver file
const {sendemail} =require('./OTPsend');
const { consumers } = require('nodemailer/lib/xoauth2');
const fs=require('fs/promises')
const path=require('path');
// const { CallTracker } = require('assert');
// const { Await } = require('react-router-dom');
// const { userInfo } = require('os');
// const { count } = require('console');
// const userIndo =require('./userInfo.json')
const port = 5000;
const app = express();
let temp=true 

app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
}));

app.post('/generateOTP', (req, res) => {
    try{
        generateOTP();
        console.log("Generated OTP:", getOTP()); 
  res.json({ otp: getOTP() });
}catch(err){
    console.log('some error caught',err)
    res.status(500).json({err:'Internal server error'})
}
});

app.post('/sendmail',async(req,res)=>{
    const {userEmail,otp}=req.body
    try{
        await sendemail(userEmail,otp)
        res.status(200).json({success:true,message:'email sent successfully'})
    }catch(error){
        console.error('Error sending OTP email ',error)
        res.status(500).json({success:false,message:'Error sending email'})
    }
})

app.post('/verifyOTP',(req,res)=>{
    const userOTP=req.body.userOTP
    console.log('Recieved data : in server ',userOTP)

    // call the function
     let verificationstatus=verifyOTP(userOTP)
     temp=verificationstatus
    console.log("this is server "+temp)
    res.json({message:`${verificationstatus}`})

})


// saving data
app.post('/userInfo',async(req,res)=>{
    const {fname,lname,id,password}=req.body;
    const data={
        fname,
        lname,
        id,
        password
    }

    try{
        const filePath=path.join(__dirname,'userInfo.json')
        let existingInfo=[]
        try{
            const existingDataBuffer=await fs.readFile(filePath)
            existingInfo=JSON.parse(existingDataBuffer.toString())
        }catch(readError){

        }
        existingInfo.push(data)
        await fs.writeFile(filePath,JSON.stringify(existingInfo,null,2))
        res.status(200).json({success:true,message:'Data saved Successfully'})
    }catch(error){
        console.error("Error saving data : ",error)
        res.status(500).json({success:false,message:'Error saving data'})
    }
})


// retriving data
app.post('/login',async(req,res)=>{
    const{id,password}=req.body
    let fileData=[]
    console.log("this is login "+id+password)
    try{
        let filePath=path.join(__dirname,'userInfo.json')
        const fileContent=await fs.readFile(filePath,'utf-8')
        fileData=JSON.parse(fileContent)
    }catch(err){
        console.error(err)
    }
    console.log(fileData)
    const verificationstatus=fileData.find(u=>u.id==id && u.password==password)
    if(verificationstatus){
        console.log("login in done")
        res.json({success:true})
    }else{
        console.log("login in not done")
        res.json({success:false,error:'Invalid Credentials'})
    }
})

//accounte created call
app.post('/userName',async(req,res)=>{
    const {id}=req.body
    // console.log("this is server account created "+id)
    let fileData=[]
    try{
        let filePath=path.join(__dirname,'userInfo.json')
        const fileContent=await fs.readFile(filePath,'utf-8')
        fileData=JSON.parse(fileContent)
    }catch(err)
    {
        console.error("Some error occured--"+err)
        return res.status(500).json({success:false,message:"Invalid Server Error"})
    }
    let nameUser=fileData.find(u=>u.id==id)
    if(!nameUser){
        return res.json({success:false,message:"User not found",data:null})
    }
    let fullname=nameUser["fname"]+" "+nameUser["lname"]
    console.log("this server account created "+fullname)
   res.json({success:true,message:"user found",data:{fullname}})
})


//saving  data of post 

app.post('/post_save',async(req,res)=>{
    const data =req.body
    const newData={
        post_title:data.postTitle,
        post_data:data.post_data
    }
    console.log(newData)
    try{
        let filePath=path.join(__dirname,'userInfo.json')
        const content=await fs.readFile(filePath,'utf8')
         const jsonData=JSON.parse(content)
        //  console.log(jsonData)
        const objectToUpdate=jsonData.findIndex(obj=>obj.id===data.id)
                if(objectToUpdate!==-1){
                   Object.assign(jsonData[objectToUpdate],newData) 
                   await fs.writeFile(filePath,JSON.stringify(jsonData,null,2),'utf-8')
                   console.log('data has been updated successfully')
                   res.status(200).json({message:'data updated '})
                }else{
                    console.error('ID not found ',data.id)
                    res.status(404).json({error:'Id Not found'})
                }
    }catch(error){
        console.error("error in adding file : ",error)
        res.status(500).json({error:'Internal Server Error'})
    }
})


//get all data 
app.get('/getData',async(req,res)=>{
    try{
        let filePath=path.join(__dirname,'userInfo.json')
        const content=await fs.readFile(filePath,'utf-8')
        const data=JSON.parse(content)
        res.status(200).json({message:"data send successfully",data:data})
    }catch(error){
        console.error('error in reading file ',error)
        res.status(500).json({error:'Internal Server Error'})
    }
})
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
