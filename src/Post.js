import React, { useState,useEffect } from 'react'
import { Link,useLocation,useNavigate } from 'react-router-dom';
import image from "./shareThought2.jpg"
import { toast } from 'react-toastify';

const Post=() =>{
  
const navigate=useNavigate()
const location=useLocation()
let {state:{id}}=location
useEffect(() => {
  // Access the ID from the state passed in the link
  console.log('ID from state:', id);
}, [id]);
const [postTitle,setpostTitle]=useState("")
  const [postData,updatePostData]=useState("")
  const [fullname,setfullname]=useState("")

  // calling function for the user name
  const userName=async()=>{
   let nameUser
   try{
     const response=await fetch('http://localhost:5000/userName',{
       method:'POST',
       headers:{'Content-Type':'application/json',
     },
     body:JSON.stringify({id}),
   })
   console.log("this is account created ")
   if(response.ok)
   {
     let a=await response.json()
      nameUser=a.data.fullname
      setfullname(nameUser)
     console.log("yaayy..we got the user name"+nameUser+"--"+typeof(nameUser))
   }else{
     console.log("Some error occured in getting the user name")
   }
  }catch(err){
   console.error(err)
  }
 }
 userName()
//saving post with the email id 

const save_post=async()=>{
  const data={
    id:id,
    postTitle:postTitle,
    post_data:postData

  }
  fetch(`http://localhost:5000/post_save`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
    },
    body:JSON.stringify(data),
  })
  .then(response=>response.json()
  .then(data1=>{
    console.log("Data Added Successfully : ",data1)
    navigate('/feed',{state:{id}})
  })
  .catch(error=>{
    console.error("Error adding data : ",error)
  }))
}

const validate=()=>{
  if(postData.length>1 && postTitle.length>1)
  {
    save_post() 
  }else{
    toast.warning("Enter valid Post Title and Post")
  }
}

// for plcaeholder
const myStyle={
  width:'95%',
  height :'50%',
}

  return (
    <div>
      <img src={image} alt='background-image' className='image2'/>
      <div id='feeds'>
        <div className='tabs-post'>
          <div className='sepTab'><Link to={{pathname:'/feed'}}>All Post</Link></div>
          <div className='sepTab'><Link to={{pathname:'/feed'}}>Commented Post</Link></div>
          <div className='sepTab'><Link to={{pathname:'/feed'}}>Replied Post</Link></div>
          <br></br>
        </div>
        <div className='post_blockMain'>
          <h1>Create Post</h1>
          <h2>{fullname}</h2>
          <input type='text' placeholder='Post Title' className='post_block' onChange={(e)=>setpostTitle(e.target.value)}></input>
          <h1></h1>
          <textarea id ="post" placeholder='Describe your Post' className='post_block' style={myStyle} onChange={(e)=>updatePostData(e.target.value)}></textarea>
          <br></br>
          <center><button className='btn btn-primary' onClick={validate}>Post</button></center>
        </div>
      </div>
    </div>
  ) 
}
export default Post
 