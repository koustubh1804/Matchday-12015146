import React from "react";
import "./Card.css";
import logo from "../assets/logo_white.png";
import crown from "../assets/crown.png";

const Card = ({ data }) => {
  return (
    <div className="card">
      <h3>{data.tournament[0].name}</h3>
      <h6>{data.round}</h6>
      <div className="card-main-area">
        <div className="player-1-col">
          <div className="flag-outer-box">
            {data.team1[0].name == data.winner && (
              <img className="crown" src={crown} />
            )}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_India.svg"
              className="flag"
            />
          </div>
          <p>{data.team1[0].name}</p>
        </div>
        <div className="match-details">
          <p>v/s</p>
          <p className="sets">{`${data.a1}-${data.b1},${data.a2}-${data.b2},${data.a3}-${data.b3}`}</p>
          <img src={logo} />
        </div>
        <div className="player-2-col">
          <div className="flag-outer-box">
            {data.team2[0].name == data.winner && (
              <img className="crown" src={crown} />
            )}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_India.svg"
              className="flag"
            />
          </div>
          <p>{data.team2[0].name}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
