import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Languages from './Languages'
import Weather from './Weather'


const Country = ({country}) => {
    /* ihka oma openweathermap api key, älä käytä liikaa pls */
    const weatherAPIKey = "c1a55667031cd569934a2ef25e813b8d"

    const [weatherData, setWeatherData] = useState('')
    console.log(weatherData)

    useEffect(() => {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${weatherAPIKey}`
        console.log(url)
        axios
            .get(url)
            .then(response => {
                console.log(response.data)
                setWeatherData(response.data)
            })
    },[country.capital])

    return(
        <div>
            <h1>{country.name}</h1>
            <div>
                capital {country.capital}
            </div>
            <div>
                population {country.population}
            </div>
            <Languages languages={country.languages}/>
            <img src={country.flag} width="250" height="150" alt="flag"/>
            <h2>Weather in {country.capital}</h2>
            <Weather data={weatherData}/>
        </div>
    )
}

export default Country