const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({})
        .populate('blogs')
    response.json(users.map(user => user.toJSON()))
})

usersRouter.post('/', async (request, response, next) => {
    try {
        const body = request.body

        if (body.password.length < 3) {
            response.status(400).json({ error: 'User validation failed: password is too short' })
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash: passwordHash
        })

        const savedUser = await user.save()

        response.json(savedUser.toJSON())
    } catch (error) {
        next(error)
    }
})

module.exports = usersRouter