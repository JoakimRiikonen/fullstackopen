import React from 'react'

const AddNumber = ({onSubmit, newName, onNameChange, newNumber, onNumberChange}) => {
    return(
        <div>
            <h2>Add a new</h2>
            <form onSubmit={onSubmit}>
                <div>
                name: <input value={newName} onChange={onNameChange}/>
                </div>
                <div>
                number: <input value={newNumber} onChange={onNumberChange}/>
                </div>
                <div>
                <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default AddNumber