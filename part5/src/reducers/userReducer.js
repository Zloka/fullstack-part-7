import { userStateStorageKey } from '../config'
import blogService from '../services/blogs'
import loginService from '../services/login'

const initialState = null

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data
    default:
      break
  }

  return state
}

const login = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({
      username, password
    })
    window.localStorage.setItem(
      userStateStorageKey, JSON.stringify(user)
    )
    blogService.setToken(user.token)
    dispatch({
      type: 'SET_USER',
      data: user,
    })
  }
}


const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem(userStateStorageKey)
    dispatch({
      type: 'SET_USER',
      data: null
    })
  }
}

const initializeUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem(userStateStorageKey)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch({
        type: 'SET_USER',
        data: user,
      })
    }
  }
}

export default reducer
export { initializeUser, logout, login }
