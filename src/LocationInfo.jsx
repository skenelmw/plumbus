import React from "react";

const LocationInfo = (props) => {
    const { name, type, dimension, residents } = props.info

    function chopURL(url) {
        return url.toString().substring(43);
    }
    const hopeThisWorks = residents.map(chopURL)
    console.log(hopeThisWorks)

    fetch("https://rickandmortyapi.com/api/character/" + hopeThisWorks)

    return (
        <div>
            <p>Name: {name}</p>
            <p>Type: {type}</p>
            <p>Dimension: {dimension}</p>
            <p>Residents: {}</p> 
        </div>
    )
}

export default LocationInfo