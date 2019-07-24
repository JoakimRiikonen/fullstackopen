import React from 'react'

const Weather = ({data}) => {
    console.log(data)
    if(data === ''){
        return(
            <div></div>
        )
    }
    console.log(data.weather[0].description)
    return(
        <div>
            <b>Description:</b> {data.weather[0].description}
            <div>
                <b>Temperature:</b> {(data.main.temp - 273.15).toFixed(2)} C
            </div>
            <div>
                <b>Wind:</b> {data.wind.speed} kph, {data.wind.deg} degrees
            </div>
        </div>
    )
}

export default Weather