import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'CHANGE_BLOG': {
    const id = action.data.id
    return state.map(b => b.id !== id ? b : action.data)
  }
  case 'REMOVE_BLOG': {
    return state.filter(b => b.id !== action.data)
  }
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const newBlog = (title, author, url) => {
  return async dispatch => {
    const blog = {
      title,
      author,
      url
    }
    const returnedBlog = await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: returnedBlog
    })
  }
}

export const voteBlog = (id) => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    const blogToChange = blogs.find(b => b.id === id)
    const changedBlog = {
      ...blogToChange,
      likes: blogToChange.likes + 1,
      user: blogToChange.user.id
    }
    blogService.put(changedBlog)
    dispatch({
      type: 'CHANGE_BLOG',
      data: changedBlog
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: id
    })
  }
}

export const newComment = (id, content) => {
  return async dispatch => {
    const changedBlog = await blogService.comment(id, content)
    dispatch({
      type: 'CHANGE_BLOG',
      data: changedBlog
    })
  }
}

export default reducer