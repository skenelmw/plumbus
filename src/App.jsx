import { useState } from 'react';
import './App.css'

function App() {
    const [searchType, setSearchType] = useState("")
    const [search, setSearch] = useState("")
    const [results, setResults] = useState([])

    const handleSearch = (e) => {
      e.preventDefault();
      fetch("https://rickandmortyapi.com/api/" + searchType + "/?name=" + search).then(res => {
        return res.json();
      })
      .then(console.log)
    }

    function handleTextChange(e) {
      setSearch(e.target.value);
    }

    return (
      <div className="App">
        <h1>Welcome to a search engine for the Rick and Morty API! Please select what you want to search for.</h1>
        <button onClick={() => setSearchType("character")}>
          A Character
        </button>
        <button onClick={() => setSearchType("location")}>
          A Location
        </button>
        <button onClick={() => setSearchType("episode")}>
          An Episode
        </button>
        <form onSubmit={handleSearch}>
          <input type="text" value={search} onChange={handleTextChange}/>
          <button disabled={searchType === ""}>
            Submit
          </button>
        </form>
      </div>
    )
 }

export default App