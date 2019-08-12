const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = (request) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

blogsRouter.get('/', async (request, response) => {
    /* Blog
        .find({})
        .then(blogs => {
            response.json(blogs.map(blog => blog.toJSON()))
        }) */
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
    /* const blog = new Blog(request.body) */
    const body = request.body

    /* blog
        .save()
        .then(result => {
            response.status(201).json(result)
        }) */

    try {
        //const token = getTokenFrom(request)
        const decodedToken = jwt.verify(request.token, process.env.SECRET)

        if(!request.token || !decodedToken.id){
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        const user = await User.findById(decodedToken.id)

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes === undefined ? 0 : body.likes,
            user: user._id
        })
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.status(201).json(savedBlog.toJSON())
    } catch (error) {
        next(error)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)

        if(!request.token || !decodedToken.id){
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        const user = await User.findById(decodedToken.id)
        const blog = await Blog.findById(request.params.id)
        console.log(user._id.toString())

        if (user._id.toString() === blog.user._id.toString()) {
            await Blog.findByIdAndRemove(request.params.id)
            response.status(204).end()
        }
        else {
            response.status(401).json({ error: 'wrong token' })
        }

    } catch (error) {
        next(error)
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    try{
        const blog = request.body

        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        response.status(200).json(updatedBlog.toJSON())
    }
    catch (error) {
        next(error)
    }
})

module.exports = blogsRouter