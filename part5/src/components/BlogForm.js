import React, { useState } from 'react'

const TextInput = ({ name, value, onValueChange, inputId }) => {
  return (
    <div>
      {name}
      <input id={inputId} type="text" value={value} name={name} onChange={({ target }) => onValueChange(target.value)} />
    </div>
  )
}

const BlogForm = ({ onCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = (event) => {
    event.preventDefault()
    onCreate(title, author, url)
  }

  return (
    <>
    <h2>create new</h2>
    <form onSubmit={handleCreate}>
      <TextInput inputId="title-input" name="Title" value={title} onValueChange={setTitle} />
      <TextInput inputId="author-input" name="Author" value={author} onValueChange={setAuthor} />
      <TextInput inputId="url-input" name="URL" value={url} onValueChange={setUrl} />
      <button id="create-blog-submit" type="submit">create</button>
    </form>
    </>
  )
}

export default BlogForm