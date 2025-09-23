import React from "react";
import "./Card.css";

const Card = (props) => {
  return (
    <div className="cardContainer">
      <p className="cardID">ID: {props.id}</p>
      <h1>Title: {props.title}</h1>
      <p>Description: {props.desc}</p>
    </div>
  );
};

export default Card;
