import Search from "./components/Search";
import Countries from "./components/Countries";
import Country from "./components/Country";
import { useState, useEffect } from "react";
import axios from "axios";

let countriesUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";

let allCountries = axios.get(countriesUrl).then((response) => {
  return response.data;
});


const App = () => {
  const [searchTerm, setSearchTerm] = useState(null);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    allCountries.then((data) => {
      const matchedCountries = countriesMatchSearch(data, searchTerm);
      setCountries(matchedCountries);
    });
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    if (event.target.value === null) {
      return;
    }
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <Search
        placeholder="Search for a country..."
        onChange={handleSearchChange}
      ></Search>

      {countries.length === 1 ? (
        <Country country={countries[0]}></Country>
      ) : (
        <Countries countries={countries}></Countries>
      )}
    </>
  );
};

const countriesMatchSearch = (countries, searchTerm) => {
  return searchTerm
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];
};

export default App;
