import loginService from '../services/login'
import blogService from '../services/blogs'

const reducer = (state=null, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.data
  case 'CLEAR_USER':
    return null
  default:
    return state
  }
}

export const login = (username, password) => {
  return async dispatch => {
    const loginUser = await loginService.login({
      username,
      password
    })

    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(loginUser)
    )

    blogService.setToken(loginUser.token)
    dispatch({
      type: 'SET_USER',
      data: loginUser
    })
  }
}

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    data: user
  }
}

export const clearUser = () => {
  return {
    type: 'CLEAR_USER'
  }
}

export default reducer