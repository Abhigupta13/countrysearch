import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Style.css";

export const Country = ({ countries }) => {
  const [data, setData] = useState([]);
  const [search, setsearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setselected] = useState("");


  const location = useLocation();

  useEffect(() => {
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
      // Display all countries when on the "/" endpoint
      setData([...countries]);
    }

    setIsLoading(false);
  }, [location.pathname, countries]);

  const handlesearch = () => {

    return countries.filter((country) =>
    country.name.toLowerCase() === search.toLowerCase()
  );
  };

  const handleclick = () => {
    setIsLoading(true);
    let a = handlesearch();
    setData(a);
    setIsLoading(false);
  };
  return (
    <>
      {isLoading ? (
        <div>Loading............</div>
      ) : (
        <div>
         <h1>Country Finder</h1>
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
            {data.map((country, i) => (
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
            ))}
          </div>
        </div>
      )}
    </>
  );
};
