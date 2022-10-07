import React, { useEffect, useState } from "react";
import type { LocationData } from "./types";

const LocationInfo = ({ name, type, dimension, residents }: LocationData) => {
  const [residentRes, setResidentRes] = useState([]);

  // TODO for you
  // useEffect(() => {
  //   const fetchData = async () => {
  //     function chopURL(url) {
  //       return parseInt(url.toString().substring(43));
  //     }
  //     const residentNos = residents.map(chopURL);
  //     const data = await fetch(
  //       "https://rickandmortyapi.com/api/character/" + residentNos
  //     );
  //     const residentData = await data.json();
  //     setResidentRes(residentData);
  //   };
  //   fetchData().catch(console.error);
  // }, []);

  return (
    <div>
      <p>Name: {name}</p>
      <p>Type: {type}</p>
      <p>Dimension: {dimension}</p>
      <p>Residents:</p>
      <ul>
        {/* {residentRes.map((results) => (
          <li key={results.id}>
            <p>{results.name}</p>
          </li>
        ))} */}
      </ul>
    </div>
  );
};

export default LocationInfo;
