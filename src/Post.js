import React, { useState } from 'react'

export default function Post() {
    const [post,updatePost]=useState("")
  return (
    <div>
    <center>
      <h1>Let's Post Something</h1>
      <label for="Post">Tell Us what do you want to post </label>
      <h1></h1>
      <textarea id ="post" placeholder='Lets Write'rows={20} cols={70} onChange={(e)=>updatePost(e.target.value)}></textarea>
      <br></br>
      <button className='btn btn-primary'>Post</button>
    </center>
    </div>
  )
}
 