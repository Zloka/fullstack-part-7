const listHelper = require('../utils/list_helper')

const blog1 = {
  _id: '5a422aa71b54a676234d17f8',
  title: 'Go To Statement Considered Harmful',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  likes: 5,
  __v: 0
}
const blog2 = {
  _id: 'testid2',
  title: 'Test Title 2',
  author: 'Test Author 2',
  url: 'http://www.test.url/2',
  likes: 2,
  __v: 0
}
const blog3 = {
  _id: 'testid3',
  title: 'Test Title 3',
  author: 'Test Author 3',
  url: 'http://www.test.url/3',
  likes: 3,
  __v: 0
}

const blog4 = {
  _id: 'testid4',
  title: 'Test Title 4',
  author: 'Test Author 3',
  url: 'http://www.test.url/4',
  likes: 4,
  __v: 0
}

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('should return the list of the only blog when only one blog is listed', () => {
    const result = listHelper.totalLikes([blog1])
    expect(result).toBe(5)
  })

  test('should return 0 when the list of blogs is empty', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('should return the sum of likes of all blogs when more than one blog is listed', () => {
    const result = listHelper.totalLikes([blog1, blog2, blog3])
    expect(result).toBe(10)
  })
})

describe('favorite blog', () => {
  test('should return undefined when the list is empty', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toBe(undefined)
  })

  test('should return the blog with the most likes', () => {
    const result = listHelper.favoriteBlog([blog1, blog2, blog3])
    expect(result).toEqual(blog1)
  })
})

describe('most blogs', () => {
  test('should return undefined when the list is empty', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toBe(undefined)
  })

  test('should return the author with the most blogs', () => {
    const result = listHelper.mostBlogs([blog1, blog2, blog3, blog4])
    expect(result).toEqual({ author: blog4.author, blogs: 2 })
  })
})

describe('most likes', () => {
  test('should return undefined when the list is empty', () => {
    const result = listHelper.mostLikes([])
    expect(result).toBe(undefined)
  })

  test('should return the author with the most likes in total across all of their blogs', () => {
    const result = listHelper.mostLikes([blog1, blog2, blog3, blog4])
    expect(result).toEqual({ author: blog4.author, likes: blog4.likes + blog3.likes })
  })
})