import { useEffect, useState } from "react";
import { useRoute, useLocation, Route } from "wouter";
import "./App.css";
import CharacterInfo from "./CharacterInfo";
import LocationInfo from "./LocationInfo";
import EpisodeInfo from "./EpisodeInfo";
import {
  InfoData,
  ResultsData,
  LocationLink,
  CharacterData,
  LocationData,
  EpisodeData,
  LocationDataParser,
  EpisodeDataParser,
  CharacterDataParser,
} from "./types";
import { ResultsParser } from "./types";

function App() {
  const [searchType, setSearchType] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [results, setResults] = useState<
    Array<CharacterData | LocationData | EpisodeData>
  >([]);
  const [info, setInfo] = useState<InfoData>({});
  // give count, prev and next their own state
  const [location, setLocation] = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetch("https://rickandmortyapi.com/api/" + searchType + "/?name=" + search)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // TODO: handle error
        const parsedData = ResultsParser.parse(res);
        setResults(parsedData.results);
        setInfo((prevState) => ({
          ...prevState,
          count: parsedData.info.count,
          pages: parsedData.info.pages,
          next: parsedData.info.next,
          prev: parsedData.info.prev,
        }));
      });
  };

  function checkId(
    selected: CharacterData | LocationData | EpisodeData,
    paramId: string
  ) {
    return selected.id === parseInt(paramId);
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
    );
  }

  let resultDisplay;

  if (results.length !== 0) {
    resultDisplay = results.map((results) => (
      <li key={results.id}>
        <a onClick={() => setLocation("/" + searchType + "/" + results.id)}>
          {results.name}
        </a>
      </li>
    ));
  }

  const searchTypeOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSearchType(e.currentTarget.name);
    // THIS NEEDS TO CHANGE IN LINE WITH CHANGES TO STATE STRUCTURE
    setResults([]);
  };

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
        <button disabled={searchType === ""}>Submit</button>
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
        {(params) => {
          const [selected] = results.filter((result) =>
            checkId(result, params.id)
          );
          const characterData = CharacterDataParser.parse(selected);
          return <CharacterInfo {...characterData} />;
        }}
      </Route>

      <Route path="/location/:id">
        {(params) => {
          const [selected] = results.filter((result) =>
            checkId(result, params.id)
          );
          const locationData = LocationDataParser.parse(selected);
          return <LocationInfo {...locationData} />;
        }}
      </Route>

      <Route path="/episode/:id">
        {(params) => {
          const [selected] = results.filter((result) =>
            checkId(result, params.id)
          );
          const episodeData = EpisodeDataParser.parse(selected);
          return <EpisodeInfo {...episodeData} />;
        }}
      </Route>
    </div>
  );
}

export default App;
