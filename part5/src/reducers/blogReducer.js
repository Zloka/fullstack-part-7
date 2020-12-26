import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'LIKE':
      const blog = action.data
      const newState = state.map(existingBlog => existingBlog.id === blog.id ? blog : existingBlog)
      return newState
    case 'CREATE':
      return state.concat(action.data)
    case 'INIT_BLOGS':
      return action.data
    case 'REMOVE':
      return state.filter(blog => blog.id !== action.data)
    default:
      break
  }

  return state
}

const like = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.update(blog.id, { ...blog, likes: blog.likes + 1 })
    dispatch({
      type: 'LIKE',
      data: newBlog
    })
  }
}

const create = (title, author, url) => {
  return async dispatch => {
    const newBlog = await blogService.create({ title, author, url })
    dispatch({
      type: 'CREATE',
      data: newBlog
    })
  }
}

const remove = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE',
      data: id
    })
  }
}

const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export default reducer
export { like, create, initializeBlogs, remove }