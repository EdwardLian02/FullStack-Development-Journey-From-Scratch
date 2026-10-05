import React from 'react'

const Search = ({searchTerm, setSearchTerm}) => {

  return (
    <div className="search">
       <div>
            <img src="search.svg" alt="Search" />
            <input type="text" placeholder='Search for movies' 
                onChange={(event) => {
                  setSearchTerm(event.target.value)
                  console.log(event.target.value)
                }}
                value={searchTerm}
            />

        
       </div>
    </div>
  )
}

export default Search