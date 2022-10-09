import { useState } from "react";
import { useLocation, Route } from "wouter";
import "./App.css";
import CharacterInfo from "./CharacterInfo";
import LocationInfo from "./LocationInfo";
import EpisodeInfo from "./EpisodeInfo";
import {
  CharacterData,
  LocationData,
  EpisodeData,
  LocationDataParser,
  EpisodeDataParser,
  CharacterDataParser,
  SearchType,
  SearchTypeParser,
  ResultsInfo,
} from "./types";
import { ResultsParser } from "./types";

function App() {
  // let's set the type of searchType to be limited to the string values we are expecting
  const [searchType, setSearchType] = useState<SearchType>(null);
  const [search, setSearch] = useState<string>("");
  const [results, setResults] = useState<
    Array<CharacterData | LocationData | EpisodeData>
  >([]);
  // swapped this to use a parser type rather than our hand-written type, need to instantiate it with valid initial values
  const [info, setInfo] = useState<ResultsInfo>({
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  });
  // give count, prev and next their own state
  const [location, setLocation] = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetch("https://rickandmortyapi.com/api/" + searchType + "/?name=" + search)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // TODO: handle error where parser fails
        const { results, info } = ResultsParser.parse(res); // we are getting the two fields results and info from the parsed API response

        setInfo((prevState) => ({
          ...prevState,
          ...info, // ... means "blow up" or destructure the info object so that we get all its properties in the new object
        }));

        setResults(results);
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
    // we need to tell typescript that the value of e.currentTarget.value is a SearchType
    const typeToSet = SearchTypeParser.parse(e.currentTarget.name);

    console.log(typeToSet);
    setSearchType(typeToSet);
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
        <button disabled={!searchType}>Submit</button>
      </form>
      <Route path="/">
        <ul>{resultDisplay}</ul>
      </Route>

      {/* THIS IS NOW ONE ROUTE USING SEARCH TYPE */}
      <Route path={`/${searchType}/:id`}>
        {(params) => {
          const [selected] = results.filter((result) =>
            checkId(result, params.id)
          );
          if (searchType === "character") {
            // use the parsers to narrow the type
            const character = CharacterDataParser.parse(selected);
            return <CharacterInfo {...character} />;
          } else if (searchType === "episode") {
            const episode = EpisodeDataParser.parse(selected);
            return <EpisodeInfo {...episode} />;
          } else if (searchType === "location") {
            const location = LocationDataParser.parse(selected);
            return <LocationInfo {...location} />;
          }
        }}
      </Route>
    </div>
  );
}

export default App;
