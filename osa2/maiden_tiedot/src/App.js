import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import SearchBar from './components/SearchBar'
import Results from './components/Results'

const App = () => {

  const [newSearch, setNewSearch] = useState('')
  const [data, setData] = useState([])

  useEffect(() => {
    let url = `https://restcountries.eu/rest/v2/name/${newSearch}`
    Axios
      .get(url)
      .then(response => {
        console.log(response.data.length)
        setData(response.data)
      })
  }, [newSearch])

  const setCountry = (event) => {
    setNewSearch(event.target.value)
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  return (
    <div>
      <SearchBar newSearch={newSearch} onChange={handleSearchChange}/>
      <Results data={data} onButtonClick={setCountry}/>
    </div>
  );
}

export default App;
