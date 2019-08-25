import React from 'react'
import { connect } from 'react-redux'
import useField from '../hooks/index'
import { newBlog } from '../reducers/blogReducer'

import { Form, Button } from 'semantic-ui-react'

const NewBlogForm = (props) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const submitForm = async (event) => {
    //uses try-catch so that the fields arent cleared if upload fails
    try {
      event.preventDefault()
      await props.createBlog(title.value, author.value, url.value)
      title.clear()
      author.clear()
      url.clear()
      console.log('hello!"#')
    } catch (error) {
      console.log(error)
    }
  }

  return(
    <Form onSubmit={submitForm}>
      <Form.Field>
        <label>title</label>
        <input id='title' {...title} clear=""/>
      </Form.Field>
      <Form.Field>
        <label>author</label>
        <input id='author' {...author} clear=""/>
      </Form.Field>
      <Form.Field>
        <label>url</label>
        <input id='url' {...url} clear=""/>
      </Form.Field>
      <Button type="submit">submit</Button>
    </Form>
  )
}

const mapDispatchToProps = {
  newBlog
}

export default connect(null, mapDispatchToProps)(NewBlogForm)