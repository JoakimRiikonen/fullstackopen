const initialState = { message: null, isError: false }

const reducer = (state = initialState, action) => {
  switch(action.type) {
  case 'SET_NOTIFICATION':
    return {
      message: action.message,
      isError: action.isError
    }
  case 'CLEAR_NOTIFICATION':
    return initialState
  default:
    return state
  }
}

export const setNotification = (message, isError=false, duration=5000) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      message,
      isError
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, duration)
  }
}

export default reducer