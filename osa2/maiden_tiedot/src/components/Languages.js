import React from 'react'

const Languages = ({languages}) => {

    const rows = () => languages.map((language, i) => (
        <li key={i}>{language.name}</li>
    ))

    return(
        <div>
            <h2>languages</h2>
            <ul>
                {rows()}
            </ul>
        </div>
    )
}

export default Languages