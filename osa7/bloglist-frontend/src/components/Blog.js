import React from 'react'
import { connect } from 'react-redux'
import { voteBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {

  return(
    <div>
      <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
    </div>
  )
}

const mapDispatchToProps = {
  voteBlog
}

export default connect(null, mapDispatchToProps)(Blog)