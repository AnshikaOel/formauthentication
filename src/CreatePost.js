import React from 'react'
import { Link } from 'react-router-dom'
import image from "./shareThought2.jpg"
export default function Home(props) {

  let id=props.location.state.id
  console.log(id)
  return (
    <div >
      <img src={image} alt='background-image' className='image2'/>
      <div id='feeds'>
        <div className='tabs-post'>
         <div className='sepTab'><Link to={{pathname:'/feed'}} className="linkStyle">All Post</Link></div>
         <div className='sepTab'><Link to={{pathname:'/feed'}} className="linkStyle">Commented Post</Link></div>
         <div className='sepTab'><Link to={{pathname:'/feed'}} className="linkStyle">Replied Post</Link></div>
        </div>
        <div><Link className="linkStyle">Create Post</Link></div>
        <div className='create_post'>
           Create Post
        </div>
      </div>
    </div>
  )
} 
 