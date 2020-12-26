import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { userStateStorageKey } from './config'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import { create, initializeBlogs, like, remove } from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch()
  const [user, setUser] = useState(null)
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(userStateStorageKey)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        userStateStorageKey, JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
    } catch (error) {
      dispatch(setNotification('Failed to login!', 5))
      console.log(error)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem(userStateStorageKey)
    setUser(null)
  }

  const handleCreateBlog = async (title, author, url) => {
    try {
      dispatch(create(title, author, url))
      dispatch(setNotification('Successfully created blog!', 5))
    } catch (error) {
      dispatch(setNotification('Failed to create blog!', 5))
      console.log(error)
    }
  }

  const handleUpdateBlog = async (blog) => {
    try {
      dispatch(like(blog))
    } catch (error) {
      console.log(error)
      dispatch(setNotification('Failed to update blog!', 5))
    }
  }

  const handleRemoveBlog = async (blog) => {
    const { id } = blog
    try {
      if (window.confirm('are you sure you want to remove the blog?')) {
        dispatch(remove(id))
      }
    } catch (error) {
      console.log(error)
      dispatch(setNotification('Failed to remove blog!', 5))
    }
  }

  return (
    <div>
      <Notification />
      {user === null ? (
        <LoginForm onLogin={handleLogin} />
      )
      : (
        <>
          <h2>blogs</h2>
          <div>{user.name} is logged in. <button onClick={handleLogout}>log out</button></div>
          <br />
          <Togglable buttonLabel="new blog" >
            <BlogForm onCreate={handleCreateBlog} />
          </Togglable>
          {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={() => handleUpdateBlog(blog)}
              removeBlog={() => handleRemoveBlog(blog)}
              authenticatedUsername={user.username} />
          )}
        </>
      )
    }
    </div>
  )
}

export default App