import React, { useState, useEffect } from "react";
import axios from "axios";

const WeatherStackAPIKey = process.env.REACT_APP_WEATHERSTACK_API_KEY;
// console.log("WEATHER API", WeatherStackAPIKey);

const WeatherReport = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const BASE_URL = `http://api.weatherstack.com`;

    axios
      .get(`${BASE_URL}/current`, {
        params: {
          access_key: WeatherStackAPIKey,
          query: `${country.capital}, ${country.name}`,
          units: "m",
          type: "City",
        },
      })
      .then((response) => {
        console.log(response.data);
        const { current } = response.data;
        setWeather({
          temp: `${current.temperature} Celsius`,
          wind: `${current.wind_speed} mph direction ${current.wind_dir}`,
          weatherIcon: current.weather_icons[0],
          weatherDesc: current.weather_descriptions[0],
        });
      });
  }, [country]);

  if (!weather) {
    return <h2>Could not load weather data</h2>;
  }

  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <p>
        <strong>temperature:</strong> {weather.temp}
      </p>
      <img src={weather.weatherIcon} alt={weather.weatherDesc} />
      <p>
        <strong>wind:</strong> {weather.wind}
      </p>
    </div>
  );
};

const Filter = (props) => {
  return (
    <div>
      find countries{" "}
      <input value={props.filter} onChange={props.handleFilter} />
    </div>
  );
};

const CountryResult = ({ country, handleShowCountry }) => {
  return (
    <div>
      {country.name}{" "}
      <button onClick={() => handleShowCountry(country)}>show</button>
    </div>
  );
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

      <WeatherReport country={country} />
    </div>
  );
};

const Countries = ({ countries, handleShowCountry }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (countries.length === 1) {
    return <CountryInfo country={countries[0]} />;
  }

  return (
    <div>
      {countries.map((country) => (
        <CountryResult
          country={country}
          key={country.numericCode}
          handleShowCountry={handleShowCountry}
        />
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
        country.name.toLowerCase().includes(filter.toLowerCase())
      );

  useEffect(() => {
    axios
      .get(`https://restcountries.eu/rest/v2/all`)
      .then((response) => setCountries(response.data));
  }, []);

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const handleShowCountry = (country) => {
    setFilter(country.name);
  };

  return (
    <div>
      <Filter handleFilter={handleFilter} filter={filter} />
      <Countries
        countries={countriesToShow}
        handleShowCountry={handleShowCountry}
      />
    </div>
  );
};
export default App;
