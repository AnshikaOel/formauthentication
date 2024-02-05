import React from 'react'
import { Link } from 'react-router-dom';

export default function fullPostRead() {
  return (
    <div>
      <div>
        <div><Link to={{pathname:'/feed'}}>All Post</Link></div>
        <div><Link to={{pathname:'/feed'}}>Commented Post</Link></div>
        <div><Link to={{pathname:'/feed'}}>Replied Post</Link></div>
      </div>
      <div>
        All Posts
        {/* get data from .json file and show full post with comments*/}
      </div>
    </div>
  )
}
 