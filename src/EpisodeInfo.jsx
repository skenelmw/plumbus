import React from "react";

const EpisodeInfo = (props) => {
    const { name, air_date, episode } = props.info

    console.log(props)
    return (
        <div>
            <p>Name: {name}</p>
            <p>Episode no. {episode}</p>
            <p>Date aired: {air_date}</p>
        </div>
    )
}

export default EpisodeInfo