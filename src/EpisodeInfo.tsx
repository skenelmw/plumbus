import React from "react";
import { EpisodeData } from "./types";

const EpisodeInfo = ({ name, air_date, episode, characters }: EpisodeData) => {
  return (
    <div>
      <p>Name: {name}</p>
      <p>Episode no. {episode}</p>
      <p>Date aired: {air_date}</p>
    </div>
  );
};

export default EpisodeInfo;
