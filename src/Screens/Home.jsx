import React, { useEffect, useRef, useState } from "react";
import Card from "../Components/Card";
import "./Home.css";
import axios from "axios";
import Data from "../Data.json";
import { Link } from "react-router-dom";

const Home = () => {
  const data = useRef({});
  const [filteredData, sFD] = useState({});
  const sIO = useRef(false);
  const pg = useRef(0);

  function gST() {
    return window.pageYOffset !== undefined
      ? window.pageYOffset
      : (document.documentElement || document.body.parentNode || document.body)
          .scrollTop;
  }

  function gDH() {
    const body = document.body;
    const html = document.documentElement;

    return Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
  }

  useEffect(() => {
    axios(
      `https://matchday.ai/referee/champ/fixture/dummy-matches?page=${pg.current}`,
      {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
        }),
      }
    )
      .then((res) => {
        data.current = res.data;
        sFD(res.data);
        pg.current = pg.current + 1;
      })
      .catch((err) => {
        data.current = Data;
        sFD(Data);
      });

    window.onscroll = function () {
      if (!sIO.current) {
        if (Math.ceil(gST()) < gDH() - window.innerHeight) return;

        if (data.current.hasMorePage) {
          axios(
            `https://matchday.ai/referee/champ/fixture/dummy-matches?page=${pg.current}`,
            {
              method: "GET",
              headers: new Headers({
                "Content-Type": "application/json",
                Accept: "application/json",
              }),
            }
          )
            .then((res) => {
              data.current = {
                ...res.data,
                fixtures: [...data.current.fixtures, ...res.data.fixtures],
              };
              sFD(data.current);
              pg.current = pg.current + 1;
            })
            .catch((err) => {
              data.current = Data;
              sFD(Data);
            });
        }
      }
    };
  }, []);

  const search = (val) => {
    if (!val) {
      sIO.current = false;
      return sFD(data.current);
    }
    sIO.current = true;
    const filteredDataProcessed = data.current?.fixtures.filter((fixture) => {
      if (
        new RegExp(val.toLowerCase()).test(
          fixture.tournament[0].name.toLowerCase()
        )
      )
        return fixture;
      else if (
        new RegExp(val.toLowerCase()).test(fixture.team1[0].name.toLowerCase())
      )
        return fixture;
      else if (
        new RegExp(val.toLowerCase()).test(fixture.team2[0].name.toLowerCase())
      )
        return fixture;
    });
    sFD({ ...filteredData, fixtures: filteredDataProcessed });
  };

  return (
    <div>
      <header>
        <h1>International Matches</h1>
        <div className="input-form">
          <input
            type="text"
            placeholder="search"
            className="search-box"
            onChange={(e) => search(e.target.value)}
          />
        </div>
      </header>
      <div className="match-cards">
        {filteredData?.fixtures?.map((fixture, index) => {
          return (
            <Link to="/video">
              <Card key={fixture.fixtureId} data={fixture} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
