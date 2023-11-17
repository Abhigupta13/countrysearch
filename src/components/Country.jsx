import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
// import CountryDetails from "./countryDetails"
import "./Style.css";

export const Country = ({countries,searchparam}) => {
  // const [countries, setCountry] = useState([]);
  const [data, setData] = useState([]);
  const [search, setsearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searched] = useState(["name"]);
  const [selected, setselected] = useState("");
  const selecttag = [
    "Filter By Region",
    "Africa",
    "Americas",
    "Asia",
    "Europe",
    "Oceania",
  ];
  const location = useLocation();

  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true);

      // Check if the route has a countryName parameter
      if (location.pathname !== "/" && location.pathname !== "/") {
        const countryName = location.pathname.substring(1);
        const countryData = countries.find(
          (c) => c.name.toLowerCase() === countryName.toLowerCase()
        );

        if (countryData) {
          setData([countryData]);
        } else {
          setData([]);
        }
      } else {
        // Fetch data when there's no specific countryName in the path
        setData([]);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [location.pathname, countries]);

  const handlesearch = (countries) => {
    setselected("Filter By Region");

    return countries.filter((country) =>
      searched.some(
        (newcountry) =>
          country[newcountry].toString().toLowerCase().indexOf(search.toLowerCase()) > -1
      )
    );
  };

  const handleclick = () => {
    setIsLoading(true);
    let a = handlesearch(countries);
    setData(a);
    setIsLoading(false);
  };

  const handleChange = (e) => {
    setIsLoading(true);
    setselected(e.target.value);
    setsearch("");
    if (e.target.value === "Filter By Region") {
      setData(countries);
    } else {
      setData(
        [...countries].filter((country) => country.region === e.target.value)
      );
    }
    setIsLoading(false);
  };

  return (
   <>
          {isLoading ? (
            <div>Loading............</div>
          ) : (
            <div>
              <select
                onChange={(e) => {
                  handleChange(e);
                }}
                value={selected}
                className="custom-select"
                aria-label="Filter Countries By Region"
              >
                {selecttag.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
              <input
                className="search-input"
                type="text"
                placeholder="Search for a country..."
                value={search}
                onChange={(e) => setsearch(e.target.value)}
              />
              <button className="search-button" onClick={handleclick}>
                Search
              </button>
              <div className="container">
                {data.length > 0
                  ? data.map((country, i) => {
                      return (
                        
                        <Link
                          key={i}
                          to={`/${country.name.toLowerCase()}`}
                          className={`country-list-${country.id}`}
                          id="list"
                        >
                          <img src={country.flag} alt="" id="country_img" />
                          <div id="textdiv">
                            <h3>{country.name}</h3>
                            <p>Population: {country.population}</p>
                            <p>Region: {country.region}</p>
                            <p>Capital: {country.capital}</p>
                          </div>
                        </Link>
                      );
                    })
                  : countries.map((country, i) => {
                      return (
                        <Link
                          key={i}
                          to={`/${country.name.toLowerCase()}`}
                          className={`country-list-${country.id}`}
                          id="list"
                        >
                          <img src={country.flag} alt="" id="country_img" />
                          <div id="textdiv">
                            <h3>{country.name}</h3>
                            <p>Population: {country.population}</p>
                            <p>Region: {country.region}</p>
                            <p>Capital: {country.capital}</p>
                          </div>
                        </Link>
                      );
                    })}
              </div>
            </div>
          )}
     
    </>
  );
};

