import React from "react";

const LocationInfo = (props) => {
    const { name, type, dimension, } = props.info

    console.log(props)
    return (
        <div>
            <p>Name: {name}</p>
            <p>Type: {type}</p>
            <p>Dimension: {dimension}</p>
        </div>
    )
}

export default LocationInfo