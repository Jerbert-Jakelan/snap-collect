import React from "react";

export default function Card(props) {
  return (
    <div className="card-info">
      <img alt="?" className="image-source" src={props.card.image} />
      <h2>
        Player:
        {props.card.name}
      </h2>
      <h3>
        Year:
        {props.card.year}
      </h3>
    </div>
  );
}
