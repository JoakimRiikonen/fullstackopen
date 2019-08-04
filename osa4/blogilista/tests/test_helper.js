const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'Firstblog',
        author: 'Firstauthor',
        url: 'Firsturl',
        likes: 2
    },
    {
        title: 'Secondblog',
        author: 'Secondauthor',
        url: 'Secondurl',
        likes: 4
    },
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(b => b.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs,
    blogsInDb,
    usersInDb
}