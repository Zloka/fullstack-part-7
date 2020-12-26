import React, { useState } from 'react'

const HiddenBlogContent = ({ url, likes, onLike, name, onRemove, shouldShowRemove }) => {
  const handleLikeClick = (event) => {
    event.preventDefault()
    onLike()
  }

  const handleRemoveClick = (event) => {
    event.preventDefault()
    onRemove()
  }

  return (
    <>
      <div>{url}</div>
      <div>{likes} <button id="like-button" onClick={handleLikeClick}>like</button></div>
      <div>{name}</div>
      {shouldShowRemove ? <button id="remove-button" onClick={handleRemoveClick}>remove</button> : null}
    </>
  )
}

const Blog = ({ blog, updateBlog, removeBlog, authenticatedUsername }) => {
  const [hidden, setHidden] = useState(true)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div id="blog" style={blogStyle}>
      <div>
        <span>{blog.title}</span> <span>{blog.author}</span> <button id="toggle-view-button" onClick={() => setHidden(!hidden)}>{hidden ? 'view' : 'hide'}</button>
      </div>
      {hidden
        ? null
        : <HiddenBlogContent
            url={blog.url}
            likes={blog.likes}
            onLike={updateBlog}
            name={blog.user.name}
            onRemove={removeBlog}
            shouldShowRemove={authenticatedUsername === blog.user.username}
          />}
  </div>
)}

export default Blog
