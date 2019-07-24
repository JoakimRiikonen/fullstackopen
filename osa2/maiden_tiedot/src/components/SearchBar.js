import React from 'react'

const SearchBar = ({newSearch, onChange}) => (
    <div>
      find countries <input value={newSearch} onChange={onChange}/>
    </div>
  )

export default SearchBar