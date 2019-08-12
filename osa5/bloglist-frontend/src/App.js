import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import useField from './hooks/index'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [isError, setIsError] = useState(false)
  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, isError) => {
    setIsError(isError)
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    },5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loginUser = await loginService.login({
        username: username.value,
        password: password.value
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(loginUser)
      )

      blogService.setToken(loginUser.token)

      notify(`logged in as ${username.value}`)
      setUser(loginUser)
      username.clear('')
      password.clear('')
    } catch (error) {
      notify(error.response.data.error, true)
    }
  }

  const handleBlogRemove = (id) => {
    blogService.remove(id)
    setBlogs(blogs.filter(b => b.id !== id))
  }

  const logout = () => {
    window.localStorage.setItem(
      'loggedBlogappUser', ''
    )

    setUser(null)
  }

  const createBlog = async (title, author, url) => {
    console.log('createblog', title, author, url)
    blogFormRef.current.toggleVisibility()
    const blog = {
      title: title,
      author: author,
      url: url
    }
    try {
      const returnedBlog = await blogService.create(blog)
      setBlogs(blogs.concat(returnedBlog))
      notify(`a new blog ${blog.title} by ${blog.author} added`)
    } catch (error) {
      notify(error.response.data.error, true)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notification} isError={isError} />
        <LoginForm
          handleSubmit={handleLogin}
          username={username}
          password={password}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} isError={isError} />
      <p>
        { user.name } logged in
        <button onClick={() => logout()}>logout</button>
      </p>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <h2>create new</h2>
        <NewBlogForm createBlog={createBlog} />
      </Togglable>
      {blogs.sort((a, b) => {
        return b.likes - a.likes
      }).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          username={user.username}
          handleBlogRemove={handleBlogRemove} />
      )}
    </div>
  )
}

export default App
