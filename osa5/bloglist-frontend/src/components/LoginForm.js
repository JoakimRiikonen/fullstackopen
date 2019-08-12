import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleSubmit,
  username,
  password
}) => {
  return(
    <form onSubmit={handleSubmit}>
      <div>
        username
        {/* <input
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange}/> */}
        <input {...username} clear=""/>
      </div>
      <div>
        password
        {/* <input
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}/> */}
        <input {...password} clear=""/>
      </div>
      <button type="submit">login</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
}

export default LoginForm