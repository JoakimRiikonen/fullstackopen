import React, { useState } from 'react'
const NewBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const submitForm = (event) => {
    event.preventDefault()
    createBlog(title, author, url)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <form onSubmit={submitForm}>
      <div>
        title:
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}/>
      </div>
      <div>
                author:
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}/>
      </div>
      <div>
                url:
        <input
          type="text"
          value={url}
          name="Author"
          onChange={({ target }) => setUrl(target.value)}/>
      </div>
      <button type="submit">submit</button>
    </form>
  )
}

export default NewBlogForm