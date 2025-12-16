import {useState, useEffect} from 'react'
import axios from 'axios'

const Weather = ({ capitalCity }) => {
  const [weatherCurrent, setWeatherCurrent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_SOME_KEY;
    const weatherBaseUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${capitalCity}&aqi=no`;

    axios
      .get(weatherBaseUrl)
      .then((response) => {
        setWeatherCurrent(response.data.current);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setLoading(false);
      });
  }, [capitalCity]);

  if (loading) {
    return <div>Loading weather...</div>;
  }

  return (
    <div>
      <div>Temperature: {weatherCurrent.temp_f} °F</div>
      <div>Conditions: {weatherCurrent.condition.text}</div>
      <img
        src={weatherCurrent.condition.icon}
        alt={weatherCurrent.condition.text}
      />
    </div>
  );
};

export default Weather;