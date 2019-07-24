import React from 'react'

const Countries = ({data, onButtonClick}) => {

    const rows = () => data.map((country, i) => (
        <div key={country.numericCode}>
            {country.name}
            <button value={country.name} onClick={onButtonClick}>show</button>
        </div>
    ))

    return(
        <div>
            {rows()}
        </div>
    )
}

export default Countries