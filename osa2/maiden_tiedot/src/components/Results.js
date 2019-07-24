import React from 'react'
import Countries from './Countries'
import Country from './Country'

const Results = ({data, onButtonClick}) => {

    if(data.length > 10){
        return(
            <div>
                Too many matches, specify another filter
            </div>
        )
    }

    if(data.length > 1){
        console.log(data)
        return(
            <Countries data={data} onButtonClick={onButtonClick}/>
        )
    }

    if(data.length === 1){
        return(
            <Country country={data[0]}/>
        )
    }

    return(
        <div>
            results go here
        </div>
    )
}

export default Results