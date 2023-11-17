import React from 'react'
import "./Style.css";

const CountryDetails = ({ countries }) => {
    const countryName = window.location.pathname.substring(1);
    const country = countries.find(
      (c) => c.name.toLowerCase() === countryName.toLowerCase()
    );
  
    if (!country) {
      return <div>Country not found</div>;
    }
  
    return (
      <div className="container">
        <img src={country.flag} alt="" id="country_img" />
                          <div id="textdiv">
                            <h3>{country.name}</h3>
                            <p>Population: {country.population}</p>
                            <p>Region: {country.region}</p>
                            <p>Capital: {country.capital}</p>
                          </div>
      </div>
    );
  };

export default CountryDetails