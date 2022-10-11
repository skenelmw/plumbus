import React, { useEffect, useState } from "react";
import { z } from "zod";
import { CharacterDataParser, LocationData, CharacterData } from "./types";


const LocationInfo = ({ name, type, dimension, residents }: LocationData) => {
  const [residentRes, setResidentRes] = useState<Array<CharacterData>>([]);

  useEffect(() => {
    function chopURL(url: string) {
      return parseInt(url.toString().substring(43));
    }
    const residentNos = residents.map(chopURL);
    console.log(residentNos)
    fetch("https://rickandmortyapi.com/api/character/" + residentNos)
      .then((res) => {
        if (!res.ok) {
          throw new Error('api response was bad')
        }
        return res.json();
      })
      .then((res) => {
//need to figure out what to do if more than 20 residents
        console.log(res)
        const charResults = z.array(CharacterDataParser).parse(res)
        setResidentRes(charResults)
      })
      .catch((error) => {
        console.error('fetch rquest failed', error);
      });
    }, []);

  return (
    <div>
      <p>Name: {name}</p>
      <p>Type: {type}</p>
      <p>Dimension: {dimension}</p>
      <p>Residents:</p>
      <ul>
         {residentRes.map((results) => (
          <li key={results.id}>
            <p>{results.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationInfo;
