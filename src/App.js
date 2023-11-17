import "./index.css";
import { Country } from "./components/Country";
import CountryDetails from "./components/countryDetails.jsx";
import React,{useEffect,useState} from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://codejudge-question-artifacts-dev.s3.amazonaws.com/q-1709/data.json");
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries data:", error);
      }
    };

    fetchData();
  }, []);
  return(
  <Router>
  <Routes>
    <Route exact path="/" element={<Country countries={countries} />}  />

    <Route exact path="/:countryName" element={<CountryDetails countries={countries} />} />
       
      </Routes>
    </Router>
  )
}

export default App;
