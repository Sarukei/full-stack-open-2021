import React, { useState, useEffect } from "react";
import axios from "axios";

const Filter = (props) => {
  return (
    <div>
      find countries{" "}
      <input value={props.filter} onChange={props.handleFilter} />
    </div>
  );
};

const CountryResult = ({ country }) => {
  return <div>{country.name}</div>;
};

const CountryInfo = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>

      <h2>languages</h2>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt={`Flag of ${country.name}`} width="115" />
    </div>
  );
};

const Countries = ({ countries }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (countries.length === 1) {
    return <CountryInfo country={countries[0]} />;
  }

  return (
    <div>
      {countries.map((country) => (
        <CountryResult country={country} key={country.numericCode} />
      ))}
    </div>
  );
};

const App = (props) => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const countriesToShow = !filter
    ? countries
    : countries.filter((country) =>
        country.name.toLowerCase().includes(filter)
      );

  useEffect(() => {
    axios
      .get(`https://restcountries.eu/rest/v2/all`)
      .then((response) => setCountries(response.data));
  }, []);

  const handleFilter = (e) => {
    setFilter(e.target.value.toLowerCase());
  };

  return (
    <div>
      <Filter handleFilter={handleFilter} filter={filter} />
      <Countries countries={countriesToShow} />
    </div>
  );
};
export default App;
