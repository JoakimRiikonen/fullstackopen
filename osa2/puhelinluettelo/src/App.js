import React, { useState, useEffect } from 'react'
import Numbers from './components/Numbers'
import Filter from './components/Filter'
import AddNumber from './components/AddNumber'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons] = useState([/* { 
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
    } */
  ]) 

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ notification, setNotification ] = useState(null)
  const [ error, setError ] = useState(false)

  useEffect(() => {
    personService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  const notify = (message, isError) => {
    setNotification(message)
    setError(isError)
    setTimeout(() => {
      setNotification(null)
    },5000)
  }

  const addName = (event) => {
    event.preventDefault()
    let willAdd = true
    let willOverwrite = false
    persons.forEach((item, index, array) => {
      if(item.name === newName){
        willAdd = false
        willOverwrite = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      }
    })
    const personObject = {
      name: newName,
      number: newNumber
    }
    if(willAdd){
      console.log('add')
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          notify(`Added ${returnedPerson.name}`, false)
        })
    }
    if(willOverwrite){
      console.log('overwrite')
      let id = persons.find(p => p.name === newName).id
       personService
        .update(id, personObject)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== id ? p : returnedPerson))
          setNewName('')
          setNewNumber('')
          notify(`Modified ${returnedPerson.name}`, false)
        })
    }

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handleDelete = (event) => {
    let removedId = Number(event.target.value)
    let removedName = persons.find(p => p.id === removedId).name
    let makeSure = window.confirm(`Delete ${removedName}`)

    console.log('remove', removedId)
    if(makeSure){
      personService
        .remove(removedId)
        .then(response => {
          let newPersons = persons.filter(person => person.id !== removedId)
          setPersons(newPersons)
          notify(`Removed ${removedName}`, false)
        })
        .catch(error =>{
          notify(`${removedName} was already deleted from the server`, true)
          setPersons(persons.filter(p => p.id !== removedId))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notification} isError={error}/>

      <Filter newFilter={newFilter} onChange={handleFilterChange}/>
      <AddNumber
        onSubmit={addName} 
        newName={newName} 
        onNameChange={handleNameChange}
        newNumber={newNumber}
        onNumberChange={handleNumberChange}
      />
      <Numbers persons={persons} filter={newFilter} handleDelete={handleDelete}/>
    </div>
  )
}

export default App