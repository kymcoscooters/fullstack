const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    if (body.password.length < 3) {
      return response.status(400).json({ error: 'password must be atleast 3 characters long' })
    }

    const users = await User.find({})
    const usernames = users.map(u => u.username)

    if (usernames.includes(body.username)) {
      return response.status(400).json({ error: 'username already exists' })
    }

    let adult

    if (body.adult === undefined) {
      adult = true
    } else {
      adult = body.adult
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      adult,
      passwordHash
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (e) {
    console.log(e)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

module.exports = usersRouter