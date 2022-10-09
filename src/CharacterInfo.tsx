import { CharacterData } from "./types";

const CharacterInfo = ({
  name,
  status,
  location,
  species,
  image,
  origin,
}: CharacterData) => {
  return (
    <div>
      <p>Name: {name}</p>
      <img src={image} />
      <p>Species: {species}</p>
      <p>Location: {location.name}</p>
      <p>Origin: {origin.name}</p>
      <p>Alive: {status}</p>
    </div>
  );
};

export default CharacterInfo;
