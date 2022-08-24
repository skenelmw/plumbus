import { useEffect, useState } from 'react';
import { useRoute, useLocation, Route } from 'wouter';
import './App.css'
import CharacterInfo from './CharacterInfo';
import LocationInfo from './LocationInfo';
import EpisodeInfo from './EpisodeInfo';

function App() {
  const [searchType, setSearchType] = useState("")
  const [search, setSearch] = useState("")
  const [results, setResults] = useState([])
  const [location, setLocation] = useLocation();

  useEffect(() => {
    if (location === "/") {
      setLocation("/home");
    }
  })

  const handleSearch = (e) => {
    e.preventDefault();
    fetch("https://rickandmortyapi.com/api/" + searchType + "/?name=" + search)
    .then(res => {
      return res.json();
    })
    .then(res => {
      setResults(res.results)
    })
  }

  function handleTextChange(e) {
    setSearch(e.target.value);
  }

  let resultDisplay;
  if (results.length !== 0) {
    resultDisplay = results.map(results =>
      <li
        key={results.id}
      >
        <a onClick={() => setLocation("/" + searchType + "/" + results.id)}>{results.name}</a>
      </li>
    );
  }

  const searchTypeOnClick = (e) => {
    setSearchType(e.target.name);
    setResults([]);
  }

  return (
    <div className="App">
      <h1>Welcome to a search engine for the Rick and Morty API! Please select what you want to search for.</h1>
      <button name="character" onClick={searchTypeOnClick}>
        A Character
      </button>
      <button name="location" onClick={searchTypeOnClick}>
        A Location
      </button>
      <button name="episode" onClick={searchTypeOnClick}>
        An Episode
      </button>
      <form onSubmit={handleSearch}>
        <input type="text" value={search} onChange={handleTextChange} />
        <button disabled={searchType === ""}>
          Submit
        </button>
      </form>
      <Route path="/home">
        <ul>{resultDisplay}</ul>
      </Route>

      <Route path="/:searchType/:id">
        {params => {
          // IDEA: can i put the search type in the route path so the search type is passed in props?
          let componentToDisplay
          function checkId(object) {
            return object.id === parseInt(params.id)
          }
          const [selected] = results.filter(checkId)
          if (!selected) {
            componentToDisplay = 404
          } else if (params.searchType === "character") { componentToDisplay = <CharacterInfo info={selected} /> }
          else if (params.searchType === "location") { componentToDisplay = <LocationInfo info={selected} /> }
          else if (params.searchType === "episode") { componentToDisplay = <EpisodeInfo info={selected} /> }

          return (
            <div>
              {componentToDisplay}
              <button onClick={() => setLocation("/home")}>Back</button>
            </div>
          )
        }}
      </Route>
    </div>
  )
}

export default App