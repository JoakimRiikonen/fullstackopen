import React from 'react'
import { connect } from 'react-redux'
import NewBlogForm from './NewBlogForm'
import Togglable from './Togglable'
import { setNotification } from '../reducers/notificationReducer'
import { newBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'

import { Table } from 'semantic-ui-react'

const Blogs = (props) => {
  const blogFormRef = React.createRef()
  const createBlog = async (title, author, url) => {
    console.log('createblog', title, author, url)
    try {
      blogFormRef.current.toggleVisibility()
      await props.newBlog(title, author, url)
      props.setNotification(`a new blog ${title} by ${author} added`)
      console.log('hello')
    } catch (error) {
      console.log(error)
      blogFormRef.current.toggleVisibility()
      props.setNotification(error.response.data.error, true)
      throw error
    }
  }

  return(
    <div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <h2>create new</h2>
        <NewBlogForm createBlog={createBlog} />
      </Togglable>
      <br/>
      <Table striped>
        <Table.Body>
          {props.blogs.sort((a, b) => {
            return b.likes - a.likes
          }).map(blog =>
            <Table.Row key={blog.id}>
              <Table.Cell>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title} {blog.author}
                </Link>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  )
}


const mapStateToProps = (state) => {
  return{
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  setNotification,
  newBlog
}

export default connect(mapStateToProps, mapDispatchToProps)(Blogs)