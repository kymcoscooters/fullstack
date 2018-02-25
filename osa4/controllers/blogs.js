const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  if (blog.likes === undefined) {
    blog.likes = 0
  }
  if (blog.title === undefined || blog.url === undefined) {
    return response.status(400).json(blog)
  }
  const result = await blog.save()
  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)

    response.status(204).end()
  } catch (e) {
    console.log(e)
    response.status(400).send({ error: 'malformatted id' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  try {
    await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

    response.json(blog)
  } catch (e) {
    console.log(e)
    response.status(400).send({ error: 'malformatted id' })
  }
})
module.exports = blogsRouter