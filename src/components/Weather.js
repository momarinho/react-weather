import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './Loader';

const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY;

const Weather = () => {
  const [coordinates, setCoordinates] = useState(null);
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        console.log(error);
        setError('Failed to retrieve your location. Please try again.');
      }
    );
  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (coordinates) {
        setLoading(true);
        setError(null);
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
          );
          setWeatherData(response.data);
          setLoading(false);
        } catch (error) {
          console.error(error);
          setError('Failed to retrieve weather data. Please try again.');
          setLoading(false);
        }
      }
    };
    fetchWeatherData();
  }, [coordinates]);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${OPEN_WEATHER_API_KEY}`
      );
      const { lat, lon } = response.data[0];
      setCoordinates({ lat, lon });
      setWeatherData(null);
      setLocation('');
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError('Failed to retrieve weather data. Please try again.');
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
      );
      setWeatherData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError('Failed to refresh weather data. Please try again.');
      setLoading(false);
    }
  };

  const renderWeatherData = () => {
    if (weatherData) {
      const {
        name,
        weather,
        main: { temp, feels_like, humidity },
      } = weatherData;
      return (
        <div>
          <h2 className="text-2xl text-center text-gray-600 font-bold mb-2">
            {name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-lg shadow-lg bg-white hover:bg-gray-200 relative m-2 bg-opacity-80">
              <p className="mb-2">{weather[0].description}</p>
            </div>
            <div className="p-8 rounded-lg shadow-lg bg-white hover:bg-gray-200 relative m-2 bg-opacity-80">
              <p className="mb-2">Temperature: {temp}°C</p>
            </div>
            <div className="p-8 rounded-lg shadow-lg bg-white hover:bg-gray-200 relative m-2 bg-opacity-80">
              <p className="mb-2">Feels like: {feels_like}°C</p>
            </div>
            <div className="p-8 rounded-lg shadow-lg bg-white hover:bg-gray-200 relative m-2 bg-opacity-80">
              <p className="mb-2">Humidity: {humidity}%</p>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gray-900">
      <div className="max-w-md mx-auto px-6 py-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4 text-center">Weather App</h1>
        <form onSubmit={handleSearch} className="flex mb-4">
          <input
            type="text"
            value={location}
            onChange={handleLocationChange}
            className="w-full rounded-l-lg border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white px-4 py-2"
            placeholder="Enter a location"
            required
          />
          <button
            type="submit"
            className="px-8 rounded-r-lg bg-blue-400 text-white font-bold p-2 uppercase border-gray-200 border-t border-b border-r"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ionicon"
              viewBox="0 0 512 512"
              width="26"
              height="26"
            >
              <path
                d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
                fill="none"
                stroke="currentColor"
                strokeMiterlimit="10"
                strokeWidth="32"
              ></path>
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="32"
                d="M338.29 338.29L448 448"
              ></path>
            </svg>
          </button>
        </form>
        {loading && <Loader />}
        {error && <p className="text-center mb-4 text-red-500">{error}</p>}
        {!loading && !error && renderWeatherData()}
        {!loading && !error && (
          <button
            onClick={handleRefresh}
            className="bg-blue-500 text-white font-bold p-2 uppercase rounded-lg shadow-lg hover:bg-blue-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-refresh-cw"
            >
              <polyline points="23 4 23 10 17 10"></polyline>
              <polyline points="1 20 1 14 7 14"></polyline>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
            </svg>
          </button>
        )}
      </div>
    </main>
  );
};

export default Weather;
