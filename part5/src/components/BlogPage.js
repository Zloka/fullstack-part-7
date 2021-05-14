
import React from 'react'
import PropTypes from 'prop-types'

const BlogPage = ({ author, id, likes, title, url, onLike }) => {

  return (
    <div id={id}>
      <h3>{title}</h3>
      <div>{url}</div>
      <div>{likes} <button id="like-button" onClick={onLike}>like</button></div>
      <div>added by {author}</div>
    </div>
  )
}

BlogPage.propTypes = {
  author: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  onLike: PropTypes.func.isRequired
}

export default BlogPage;
