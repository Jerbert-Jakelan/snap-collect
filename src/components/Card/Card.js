import React from "react";
import "./Card.css";

export default function Card(props) {
  return (
    <div className="card-info">
      <div className="front">
        <img alt="?" className="image-source" src={props.card.image} />
      </div>
      <div className="back">
        <h2>
          Player:
          {props.card.name}
        </h2>
        <h3>
          Year:
          {props.card.year}
        </h3>
      </div>
    </div>
  );
}
