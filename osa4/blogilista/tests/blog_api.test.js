const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

describe('blogs', () => {
    beforeEach(async () => {
        await Blog.remove({})
        for (let blog of helper.initialBlogs) {
            let blogObject = new Blog(blog)
            await blogObject.save()
        }
    })

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('blogs are all returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(helper.initialBlogs.length)
    })

    test('contains id (not _id) field', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })

    test('blog can be added', async () => {
        const newBlog = {
            title: 'Uploadedblog',
            author: 'UAuthor',
            url: 'UUrl',
            likes: 5
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        const titles = response.body.map(x => x.title)

        expect(response.body.length).toBe(helper.initialBlogs.length + 1)
        expect(titles).toContain('Uploadedblog')
    })

    test('likes are automatically 0 if not defined', async () => {
        const newBlog = {
            title: 'Uploadedblog',
            author: 'UAuthor',
            url: 'UUrl'
        }

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
        const likes = response.body.likes
        expect(likes).toEqual(0)
    })

    test('note without title or url is not added', async () => {
        const newBlog = {
            author: 'UAuthor',
            url: 'UUrl'
        }

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        const secondNewBlog = {
            title: 'NewTitle',
            author: 'NewAuthor'
        }

        const secondResponse = await api
            .post('/api/blogs')
            .send(secondNewBlog)
            .expect(400)
    })

    test('blogs can be deleted', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd.length).toBe(blogsAtStart.length - 1)

        const titles = blogsAtEnd.map(b => b.title)

        expect(titles).not.toContain(blogToDelete.title)
    })

    test('blogs can be modified', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToModify = blogsAtStart[0]

        const blog = {
            ...blogToModify,
            likes: 999
        }

        const response = await api
            .put(`/api/blogs/${blogToModify.id}`)
            .send(blog)
            .expect(200)
        expect(response.likes).not.toBe(blogToModify.likes)
    })
})

describe('users', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const user = new User({ username: 'root', password: 'password' })
        await user.save()
    })

    test('creation successful with unique username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'Freshuser',
            name: 'Fresh U. Ser',
            password: 'secure'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length + 1)
        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails if username not unique', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'copycat',
            password: '123123'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })

    test('creation fails when username is too short', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'r',
            name: 'R. Johnson',
            password: '1qerfdfc'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('short')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })

    test('creation fails when password is too short', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'imagination',
            name: 'Is Running Out',
            password: 'as'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('short')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })
})



afterAll(() => {
    mongoose.connection.close()
})