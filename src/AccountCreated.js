import React, { useEffect, useState} from 'react'
import { Link ,Navigate,useLocation, useNavigate} from 'react-router-dom'
import image from "./shareThought.jpg"

export default function AccountCreated() {
  const feed=()=>{
    navigate('/feed',{state:{id}})
   }
  const navigate=useNavigate() 
  const location = useLocation();
  let {state:{id}}=location
  useEffect(()=>{
    console.log('Recieved props in account created',id) 
  },[id])
   id=JSON.stringify(id)
   id=JSON.parse(id)
  //  console.log("THis sis account created so "+id)
   const [fullname,setfullname]=useState('')
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
      console.log("yaayy..we got the user name--"+nameUser+"--"+typeof(nameUser))
    }else{
      console.log("Some error occured in getting the user name")
    }
   }catch(err){
    console.error(err)
   }
   

  }
  userName()
  console.log("jbvkj"+fullname)
  return (
    <div>
      <img src={image} alt='background-image'/>
      <div id='d'>
        <h1>Account Created successfully</h1>
        <h2 className='accnt_username'>{fullname}</h2>
        <br></br>
        <center><button className='btn btn-primary' onClick={feed}>Create Your First Post</button></center>
        {/* <Link to={{pathname:'/feed',state:{id_no:id}}}className="linkStyle"></Link> */}
      </div>
    </div>
  )
} 