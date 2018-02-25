const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { blogs, nonExistingId, blogsInDb } = require('./test_helper')

beforeAll(async () => {
  await Blog.remove({})

  const blogObjects = blogs.map(b => new Blog(b))
  await Promise.all(blogObjects.map(b => b.save()))
})

test('all blogs are returned', async () => {
  const blogsInDatabase = await blogsInDb()

  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(blogsInDatabase.length)
})

test('blogs are added', async () => {
  const blogObject = new Blog({
    title: 'auroblogi',
    author: 'mluukkai',
    url: 'totter.com',
    likes: 12
  })

  const blogsBefore = await blogsInDb()

  await api
    .post('/api/blogs')
    .send(blogObject)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAfter = await blogsInDb()

  const titles = blogsAfter.map(b => b.title)

  expect(blogsAfter.length).toBe(blogsBefore.length +1)
  expect(titles).toContainEqual(blogObject.title)
})

test('blog added without likes is created with 0 likes', async () => {
  const blogObject = new Blog({
    title: 'Type Wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html'
  })

  const response = await api
    .post('/api/blogs')
    .send(blogObject)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBe(0)
})

test('blog added without title gets correct response', async () => {
  const blogObject = new Blog({
    url: 'blogspot.com',
    author: 'jorma töttersteröm',
    likes: 1
  })

  await api
    .post('/api/blogs')
    .send(blogObject)
    .expect(400)
})

test('blog added without url gets correct response', async () => {
  const blogObject = new Blog({
    title: 'autoblogi',
    author: 'mluukkai',
    likes: 1
  })

  await api
    .post('/api/blogs')
    .send(blogObject)
    .expect(400)
})

afterAll(() => {
  server.close()
})