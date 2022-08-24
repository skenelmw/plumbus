import React from "react";

const CharacterInfo = (props) => {
    const { name, status, location, species, image, origin } = props.info

    console.log(props)
    return (
        <div>
            <p>Name: {name}</p>
            <img src={image} />
            <p>Species: {species}</p>
            <p>Location: {location.name}</p>
            <p>Origin: {origin.name}</p>
            <p>Alive: {status}</p>
        </div>
    )
}

export default CharacterInfo