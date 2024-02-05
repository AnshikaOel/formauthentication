import React ,{ useEffect,useState}from 'react'
import { Link ,useLocation ,useNavigate} from 'react-router-dom'
import image from "./shareThought2.jpg"

export default function Feed() {
  // console.log("lets begin")
  const navigate=useNavigate()
  const post=()=>{
    navigate('/Post',{state:{id}})
  }
  const location = useLocation();
  let {state:{id}}=location
  useEffect(()=>{
    console.log('Recieved props',id)
  },[id]) 

  id=JSON.stringify(id)
  id=JSON.parse(id)
  console.log("this is feed "+id)
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
     console.log("yaayy..we got the user name"+nameUser+"--"+typeof(nameUser))
   }else{
     console.log("Some error occured in getting the user name")
   }
  }catch(err){
   console.error(err)
  }
 }
 userName()
 
 // for showing all posts 
 const show_posts=async()=>{
  console.log("this is feed data")
    const response=await fetch('http://localhost:5000/getData')
    
    if(response.ok)
    {
      let data=await response.json()
      data=data.data
      console.log(data)
      let size=data.length
      var tab=""
      for(let i=0;i<size;i++){
        tab+=
          `<div class="userpost">
            <div class='postContainer'>
              <div class='postTitle'>${data[i].post_title}</div>
              <div class='postSection'>
                <div class="comment">Comment</div>
                <div class="reply">Reply</div>
              </div> 
            </div>
          </div>`;
      }
      document.querySelector('.showpost').innerHTML=tab

    }else{
      console.log("some error occured")
    }
  }
 show_posts()

  return ( 
    <div >
      <img src={image} alt='background-image' className='image2'/>
      <div id='feeds'>
      <h2>Hello</h2>
      <h1>{fullname}</h1>
        <div className='tabs-post'>
         <div className='sepTab'>All Post</div>
         <div className='sepTab'>Commented Post</div>
         <div className='sepTab'>Replied Post</div>
         <br></br>
         {/* <Link to={{pathname:'/feed',state:{data:id}}} className="linkStyle">   </Link>*/}
         <div className='sepTab' id='createpost' onClick={post}>Create Post + </div>
        </div>
        <div className='post'>
           <h2>All Posts</h2>
            <div  className='showpost'></div>
          {/* get data from .json file and show posts here  on Click you can read full post with comments*/}
        </div>
      </div>
    </div>
  )
}
  