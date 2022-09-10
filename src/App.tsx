import { useEffect, useState } from 'react';
import { useRoute, useLocation, Route } from 'wouter';
import './App.css'
import CharacterInfo from './CharacterInfo';
import LocationInfo from './LocationInfo';
import EpisodeInfo from './EpisodeInfo';

function App() {

  type InfoData = {
    count?: number
    pages?: number
    next?: string
    prev?: string
  }

  type ResultsData = {
    id: number
    name: string
  }

  type LocationLink = {
    name: string
      url: string
  }

  type CharacterData = ResultsData & {
    location: LocationLink
    status: string
    species: string
    image: string
    origin: LocationLink
  }

  type LocationData = ResultsData & {
    type: string
    dimension: string
    residents: string[]
  }

  type EpisodeData = ResultsData & {
    air_date: string
    episode: string
    characters: string[]
  }

  const [searchType, setSearchType] = useState<string>("")
  const [search, setSearch] = useState<string>("")
  const [results, setResults] = useState<Array<CharacterData | LocationData | EpisodeData>>([])
  const [info, setInfo] = useState<InfoData>({})
  // give count, prev and next their own state
  const [location, setLocation] = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetch("https://rickandmortyapi.com/api/" + searchType + "/?name=" + search)
    .then(res => {
      return res.json();
    })
    .then(res => {
      setResults(res.results);
      console.log(res.info);
      setInfo((prevState) => ({
        ...prevState,
        count: res.info.count,
        pages: res.info.pages,
        next: res.info.next,
        prev: res.info.prev
      }));
      console.log(info);
    })
  }

  function checkId(selected: CharacterData | LocationData | EpisodeData, paramId: string) {
    return selected.id === parseInt(paramId)
  }

  function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  let infoDisplay;

  if (info.count) {
    infoDisplay = (
      <div>
        <p>Results found: {info.count}</p>
        <button disabled={info.prev === null}>Previous Page</button>
        <button disabled={info.next === null}>Next Page</button>
      </div>
    )
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

  const searchTypeOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSearchType(e.currentTarget.name);
    // THIS NEEDS TO CHANGE IN LINE WITH CHANGES TO STATE STRUCTURE
    setResults([]);
  
  }

  return (
    <div className="App">
      <h1>Welcome to a search engine for the Rick and Morty API! </h1>
      <h2>Please select what you want to search for.</h2>
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
      <Route path="/">
        <ul>{resultDisplay}</ul>
      </Route>

      {/* <Route path="/:searchType/:id">
        {params => {
          // IDEA: can i put the search type in the route path so the search type is passed in props?
          let componentToDisplay
          const [selected] = results.filter(checkId)
          if (!selected) {
            componentToDisplay = 404
          } else if (params.searchType === "character") { componentToDisplay = <CharacterInfo info={selected} /> }
          else if (params.searchType === "location") { componentToDisplay = <LocationInfo info={selected} /> }
          else if (params.searchType === "episode") { componentToDisplay = <EpisodeInfo info={selected} /> }

          return (
            <div>
              {componentToDisplay}
              <button onClick={() => setLocation("/")}>Back</button>
            </div>
          )
        }}
      </Route> */}
      <Route path="/character/:id">
        {params => {
          const [selected] = results.filter((result) => checkId(result, params.id))
          return (
          <CharacterInfo info={selected} />
          )
        }}
      </Route>

      <Route path="/location/:id">
        {params => {
          const [selected] = results.filter((result) => checkId(result, params.id))
          return (
          <LocationInfo info={selected} />
          )
        }}
      </Route>

      <Route path="/episode/:id">
        {params => {
          const [selected] = results.filter((result) => checkId(result, params.id))
          return (
          <EpisodeInfo info={selected} />
          )
        }}
      </Route>
      
      
    </div>
  )
}

export default App