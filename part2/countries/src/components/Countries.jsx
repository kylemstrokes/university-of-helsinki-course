import { useState } from "react";
import Country from "./Country";

const Countries = ({ countries }) => {
    console.log('countries component loaded')
  const [countriesToShow, setCountriesToShow] = useState([]);

  const handleShowCountry = (country) => {
    let newList = countriesToShow.concat(country);
    setCountriesToShow(newList);
  };

  const handleHideCountry = (country) => {
    let newList = countriesToShow.filter(
      (c) => c.name.common !== country.name.common
    );
    setCountriesToShow(newList);
  };

  if (countries.length <= 10) {
    return (
      <>
        {countries.map((country) => (
          <div key={country.name.common}>
            {countriesToShow.some(
              (c) => c.name.common === country.name.common
            ) ? (
              <>
                <Country country={country} />
                <button onClick={() => handleHideCountry(country)}>Hide</button>
              </>
            ) : (
              <>
                {country.name.common}
                <button onClick={() => handleShowCountry(country)}>Show</button>
              </>
            )}
          </div>
        ))}
      </>
    );
  }
  return <div>Too many matches, specify another filter</div>;
};

export default Countries;
