import React from 'react'
import { connect } from 'react-redux'
import useField from '../hooks/index'
import { login } from '../reducers/loggedUserReducer'
import { setNotification } from '../reducers/notificationReducer'

import { Form, Button } from 'semantic-ui-react'

const LoginForm = (props) => {
  const username = useField('text')
  const password = useField('password')

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await props.login(username.value, password.value)
      props.setNotification(`logged in as ${username.value}`)
      username.clear()
      password.clear()
    } catch (error) {
      console.log('hello')
      props.setNotification(error.response.data.error, true)
    }
  }

  return(
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <label>username</label>
        <input id='username' {...username} clear=""/>
      </Form.Field>
      <Form.Field>
        <label>password</label>
        <input id='password' {...password} clear=""/>
      </Form.Field>
      <Button type="submit">login</Button>
    </Form>
  )
}

const mapDispatchToProps = {
  login,
  setNotification
}

export default connect(null, mapDispatchToProps)(LoginForm)