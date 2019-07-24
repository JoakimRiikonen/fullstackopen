import React from 'react'

const Numbers = ({persons, filter, handleDelete}) => {
    const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

    const rows = () => personsToShow.map((person, i) => (
        <div key={person.id}>
            {person.name} {person.number}
            <button value={person.id} onClick={handleDelete}>delete</button>
        </div>
    ))

    return(
        <div>
            <h2>Numbers</h2>
            {rows()}
        </div>
    )
}

export default Numbers