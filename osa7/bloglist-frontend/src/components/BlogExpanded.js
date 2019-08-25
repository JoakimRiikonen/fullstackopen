import React, { useState } from 'react'
import { connect } from 'react-redux'
import useField from '../hooks/index'
import { voteBlog, removeBlog, newComment } from '../reducers/blogReducer'
import { Redirect } from 'react-router-dom'

import { List, Form, Button } from 'semantic-ui-react'

const BlogExpanded = ({ blog, loggedUser, voteBlog, removeBlog, newComment }) => {

  const [redir, setRedir] = useState(false)
  const commentField = useField('text')

  const handleRemove = () => {
    console.log('remove')
    if(window.confirm(`remove blog ${blog.title} by ${blog.author}?`)){
      removeBlog(blog.id)
      setRedir(true)
    }
  }

  const addComment = (event) => {
    event.preventDefault()
    newComment(blog.id, commentField.value)
    commentField.clear()
  }

  return(
    <div>
      {blog &&
        <div>
          <h2>{blog.title} by {blog.author}</h2>
          <a href={blog.url}>{blog.url}</a>
          <div>
            {blog.likes} likes
            <Button onClick={() => voteBlog(blog.id)}>like</Button>
          </div>
          <div>
            added by {blog.user.name}
          </div>
          { loggedUser.username === blog.user.username &&
            <Button onClick={() => {handleRemove()}}>remove</Button>
          }
          <h3>comments</h3>
          <Form onSubmit={addComment}>
            <Form.Group>
              <input {...commentField} clear=""/>
              <Form.Button type="submit">add comment</Form.Button>
            </Form.Group>
          </Form>
          <List divided>
            {blog.comments.map((c, i) =>
              <List.Item key={i}>
                <li>{c}</li>
              </List.Item>
            )}
          </List>
        </div>
      }
      {redir ? (<Redirect to='/'/>) : (<></>)}
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser
  }
}

const mapDispatchToProps = {
  voteBlog,
  removeBlog,
  newComment
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogExpanded)