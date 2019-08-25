import React, { useEffect } from 'react'
import Blogs from './components/Blogs'
import { connect } from 'react-redux'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import User from './components/User'
import BlogExpanded from './components/BlogExpanded'
import blogService from './services/blogs'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, newBlog } from './reducers/blogReducer'
import { setUser, login, clearUser } from './reducers/loggedUserReducer'
import { initializeUsers } from './reducers/usersReducer'
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom'
import { Container, Menu } from 'semantic-ui-react'


const App = (props) => {
  const initBlogs = props.initializeBlogs
  const initUsers = props.initializeUsers
  const setUser = props.setUser
  useEffect(() => {
    initBlogs()
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [initBlogs, initUsers, setUser])

  const logout = () => {
    window.localStorage.setItem(
      'loggedBlogappUser', ''
    )

    props.clearUser()
  }

  if (props.loggedUser === null) {
    return (
      <Container>
        <br/>
        <h1>BlogApp</h1>
        <h2>Log in to application</h2>
        <Notification/>
        <LoginForm/>
      </Container>
    )
  }

  return (
    <Container>
      <Router>
        <Menu>
          <Menu.Item>
            <Link to='/'>blogs</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to='/users'>users</Link>
          </Menu.Item>
          <Menu.Item position='right'>
            { props.loggedUser.name }
          </Menu.Item>
          <Menu.Item onClick={() => logout()}>
            logout
          </Menu.Item>
        </Menu>
        <h1>BlogApp</h1>
        <Notification/>
        <Route exact path='/' render={() =>
          <Blogs/>
        }/>
        <Route exact path='/users' render={() =>
          <Users /* users={props.users} *//>
        }/>
        <Route exact path='/users/:id' render={({ match }) =>
          <User user={props.users.find(u => u.id === match.params.id)}/>
        }/>
        <Route exact path='/blogs/:id' render={({ match }) =>
          <BlogExpanded blog={props.blogs.find(b => b.id === match.params.id)}/>
        }/>
      </Router>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser,
    users: state.users,
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  setNotification,
  initializeBlogs,
  initializeUsers,
  setUser,
  login,
  clearUser,
  newBlog
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
