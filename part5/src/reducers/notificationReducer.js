const initialState = null

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      const { notification, timer } = action.data
      if (notification === null) {
        return null
      } else {
        if (state !== null) {
          clearTimeout(state.timer)
        }
        return { notification, timer }
      }
    default:
      break
  }

  return state
}

const setNotification = (notification, time) => {
  return async dispatch => {
    const timer = setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        data: { notification: null }
      })
    }, time * 1000)

    dispatch({
      type: 'SET_NOTIFICATION',
      data: { notification, timer }
    })
  }
}

export default reducer
export { setNotification }
