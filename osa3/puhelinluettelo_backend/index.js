require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const morgan = require('morgan')
app.use(express.static('build'))
const Person = require('./models/person')

/* Following code is quite crude */
morgan.token('showBody', (req) => {
    let data = JSON.stringify(req.body)
    if(data.length > 2){
        return data
    }
    return ' '
})

/* Exactly like tiny but with the request body at the end */
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :showBody'))

let persons = [{
    name: 'Arto Hellas',
    number: '123-1231231',
    id: 0
},{
    name: 'Ada Lovelace',
    number: '39-44-532532',
    id: 1
},{
    name: 'Joakim Riikonen',
    number: '123-1231231',
    id: 2
}
]

app.get('/', (req, res) => {
    res.send('<h1>Hello</h1>')
})

app.get('/info', (req, res) => {
    Person.find({}).then(persons => {
        let html = `<div>Phonebook has info for ${persons.length} people</div>
        <div>${new Date()}</div>`
        res.send(html)
    })
})

app.get('/api/persons', (req,res) => {
    Person.find({}).then(persons => {
        res.json(persons.map(p => p.toJSON()))
    })
})

/* const generateId = () => {
    return Math.floor(Math.random()*1000)
} */

app.post('/api/persons', (req,res,next) => {
    const body = req.body
    if(!body.name || !body.number){
        return res.status(400).json({
            error: 'name or number missing'
        })
    }

    let uniqueName = true
    persons.forEach((item) => {
        if(item.name === body.name){
            uniqueName = false
        }
    })

    if(!uniqueName){
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save()
        .then(savedPerson => savedPerson.toJSON())
        .then(savedAndFormattedPerson => {
            res.json(savedAndFormattedPerson)
        })
        .catch(error => next(error))

    /* persons = persons.concat(person) */
})

app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    /* const person = persons.find(p => p.id === id)
    if(person){
        res.json(person)
    }
    else{
        res.status(404).end()
    } */
    Person.findById(id)
        .then(person => {
            if(person){
                res.json(person.toJSON())
            }
            else{
                unknownEndpoint(req, res)
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    /* const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)

    res.status(204).end() */
    Person.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body

    const person = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(req.params.id, person, { new:true })
        .then((updatedPerson) => {
            res.json(updatedPerson.toJSON())
        })
        .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
    console.error(error.name, error.message)

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return res.status(400).send({ error: 'malformatted id' })
    }
    else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})