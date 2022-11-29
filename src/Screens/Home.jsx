import React, { useEffect, useRef, useState } from "react";
import Card from "../Components/Card";
import "./Home.css";
import axios from "axios";
import Data from "../Data.json";
import { Link } from "react-router-dom";

const Home = () => {
  const data = useRef({});
  const [filteredData, setFilteredData] = useState({});
  const searchIsOn = useRef(false);
  const page = useRef(0);

  function getScrollTop() {
    return window.pageYOffset !== undefined
      ? window.pageYOffset
      : (document.documentElement || document.body.parentNode || document.body)
          .scrollTop;
  }

  function getDocumentHeight() {
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
      `https://matchday.ai/referee/champ/fixture/dummy-matches?page=${page.current}`,
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
        setFilteredData(res.data);
        page.current = page.current + 1;
      })
      .catch((err) => {
        data.current = Data;
        setFilteredData(Data);
      });

    window.onscroll = function () {
      if (!searchIsOn.current) {
        if (
          Math.ceil(getScrollTop()) <
          getDocumentHeight() - window.innerHeight
        )
          return;

        if (data.current.hasMorePage) {
          axios(
            `https://matchday.ai/referee/champ/fixture/dummy-matches?page=${page.current}`,
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
              setFilteredData(data.current);
              page.current = page.current + 1;
            })
            .catch((err) => {
              data.current = Data;
              setFilteredData(Data);
            });
        }
      }
    };
  }, []);

  const search = (val) => {
    if (!val) {
      searchIsOn.current = false;
      return setFilteredData(data.current);
    }
    searchIsOn.current = true;
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
    setFilteredData({ ...filteredData, fixtures: filteredDataProcessed });
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
