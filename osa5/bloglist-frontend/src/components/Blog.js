import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, username, handleBlogRemove }) => {
  const [ showExpanded, setShowExpanded ] = useState(false)
  const [ likes, setLikes ] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleExpanded = () => {
    setShowExpanded(!showExpanded)
  }

  const handleLike = () => {
    const blogToSend = {
      ...blog,
      likes: likes+1,
      user: blog.user.id
    }
    blogService.put(blogToSend)
    setLikes(likes+1)
  }

  const handleRemove = () => {
    console.log('remove')
    if(window.confirm(`remove blog ${blog.title} by ${blog.author}?`)){
      handleBlogRemove(blog.id)
    }
  }

  if(showExpanded){
    return(
      <div style={blogStyle}>
        <div onClick={() => toggleExpanded()}>
          {blog.title} {blog.author}
        </div>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          {likes} likes
          <button onClick={() => handleLike()}>like</button>
        </div>
        <div>
          added by {blog.user.name}
        </div>
        { username === blog.user.username &&
          <button onClick={() => {handleRemove()}}>remove</button>
        }

      </div>
    )
  }

  return(
    <div onClick={() => toggleExpanded()} style={blogStyle}>
      {blog.title} {blog.author}
    </div>
  )
}

export default Blog