import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Switch, Route, Link, useRouteMatch
} from 'react-router-dom'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import { create, initializeBlogs, like, remove } from './reducers/blogReducer'
import { initializeUser, login, logout } from './reducers/userReducer'

const User = ({ userId, blogs }) => {
  if (!userId) {
    return null
  }
  console.log(blogs)
  const name = blogs[0].user.name

  return (
    <div>
      <h3>{name}</h3>
      <h4>added blogs</h4>
      <ul>
        {blogs.map(blog => {
          return (
            <li key={blog.id}>{blog.title}</li>
          )
        })}
      </ul>
    </div>
  )
}

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
   dispatch(initializeUser())
  }, [dispatch])

  const handleLogin = async (username, password) => {
    dispatch(login(username, password))
  }

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logout())
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

  const userIdsMappedToBlogs = Array.from(new Set(blogs.map(blog => blog.user.id))).map(userId => {
    return [userId, blogs.filter(blog => blog.user.id === userId)]
  })

  const match = useRouteMatch('/users/:id')
  const mappedUser = match
    ? userIdsMappedToBlogs.find(tuple => tuple[0] === match.params.id)
    : null
  console.log({mappedUser})
  return (
    <>
      <Notification />
      {user === null ? (
        <LoginForm onLogin={handleLogin} />
      )
      : (
        <>
          <h2>blogs</h2>
          <div>{user.name} is logged in. <button onClick={handleLogout}>log out</button></div>
          <br />
          <Switch>
            <Route path="/users/:id">
              <User userId={mappedUser ? mappedUser[0] : null} blogs={mappedUser ? mappedUser[1] : []} />
            </Route>
            <Route path="/users" >
                <h2>Users</h2>
                <table>
                  <tbody>
                    <tr>
                      <th></th>
                      <th>blogs created</th>
                    </tr>
                    {userIdsMappedToBlogs.map(tuple => {
                      return (
                        <tr key={tuple[0]}>
                          <td>
                            <Link to={`/users/${tuple[0]}`}>{tuple[1][0].user.name}</Link>
                          </td>
                          <td>{tuple[1].length}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </Route>
              <Route path="/">
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
            </Route>
          </Switch>
        </>
      )
    }
    </>
  )
}

export default App