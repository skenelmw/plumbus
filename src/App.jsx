import { useState } from 'react';
import './App.css'

function App() {
    const [searchType, setSearchType] = useState("")
    const [search, setSearch] = useState("")
    const [results, setResults] = useState([])
    const [resultInfo, setResultInfo] = useState()

    const handleSearch = (e) => {
      e.preventDefault();
      fetch("https://rickandmortyapi.com/api/" + searchType + "/?name=" + search).then(res => {
        return res.json();
      })
      .then(res => {
        setResults(res.results)
        setResultInfo(res.info)
      })

    }

    function handleTextChange(e) {
      setSearch(e.target.value);
    }
    let resultDisplay;
    if (searchType == "character" && results.length !== 0){
      resultDisplay = results.map(results => 
        <li
        key={results.id}
        >
          {results.name}
        </li>
        );
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
        {resultDisplay}
      </div>
    )
 }

export default App