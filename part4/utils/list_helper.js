const lodash = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((acc, cur) => acc + cur.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((acc, cur) => acc && acc.likes > cur.likes ? acc : cur, undefined)
}

const mostBlogs = (blogs) => {
  const blogsObject = blogs.reduce((acc, cur) => {
    const clone = lodash.cloneDeep(acc)
    clone[cur.author] = (clone[cur.author] || 0) + 1
    return clone
  }, {})

  const arr = Object.keys(blogsObject).map(key => {
    const val = blogsObject[key]

    return { author: key, blogs: val }
  }).sort((a, b) => a.blogs < b.blogs)

  return arr[0]
}

const mostLikes = (blogs) => {
  const blogsObject = blogs.reduce((acc, cur) => {
    const clone = lodash.cloneDeep(acc)
    clone[cur.author] = (clone[cur.author] || 0) + cur.likes
    return clone
  }, {})

  const arr = Object.keys(blogsObject).map(key => {
    const val = blogsObject[key]

    return { author: key, likes: val }
  }).sort((a, b) => a.likes < b.likes)

  return arr[0]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}