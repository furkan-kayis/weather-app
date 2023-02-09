import { useCallback, useContext, useEffect, useState } from 'react';
import {
  MyLocationRounded,
  LocationSearchingRounded,
  LocationOnRounded,
} from '@mui/icons-material';
import { ScaleContext } from '../contexts/scaleContext';
import { WeatherContext } from '../contexts/weatherContext';
import Nav from './Home/Nav';
import { getDayName, getMonthName } from '../utils/dateConverter';

export default function Home() {
  const { weather, fetchWeather, loading } = useContext(WeatherContext);

  const [nav, setNav] = useState(false);

  const { scale } = useContext(ScaleContext);
  const symbol = scale === 'fahrenheit' ? '℉' : '℃';

  const date = new Date();

  const handleFetch = useCallback(() => {
    if (fetchWeather) fetchWeather('istanbul');
  }, [fetchWeather]);

  function toggleNav() {
    setNav((n) => !n);
  }

  function getLocationData() {
    if (!loading && fetchWeather) {
      navigator.geolocation.getCurrentPosition((position) => {
        fetchWeather({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      });
    }
  }

  useEffect(handleFetch, [handleFetch]);

  return (
    <div className="relative flex flex-col place-items-center bg-app-dark-blue bg-[linear-gradient(rgba(30,33,58),rgba(30,33,58,0.8)),url('src/assets/cloud-background.png')] bg-[50%_10%] bg-no-repeat px-3 py-[1.125rem] max-lg:min-h-screen lg:w-[28.75rem] lg:px-[2.875rem] lg:py-[2.625rem]">
      <Nav nav={nav} toggleNav={() => toggleNav()} />
      <div className="flex w-full justify-between">
        <button
          type="button"
          onClick={toggleNav}
          className="h-10 bg-app-gray px-4 font-medium text-app-gray-2"
        >
          Search for places
        </button>
        <button
          type="button"
          onClick={getLocationData}
          className="h-10 w-10 rounded-full bg-app-gray bg-opacity-30 text-app-gray-2"
        >
          {loading && !nav ? (
            <LocationSearchingRounded className="animate-pulse" />
          ) : (
            <MyLocationRounded />
          )}
        </button>
      </div>
      {weather != null && (
        <>
          <img
            src={
              new URL(
                `/src/assets/${weather.list[0].weather[0].main.toLowerCase()}.png`,
                import.meta.url
              ).href
            }
            alt=""
            loading="lazy"
            className="mt-[4.75rem] md:mt-[6.75rem]"
          />
          <p className="mt-10 min-w-[12.125rem] text-center text-[9rem] font-medium text-app-gray-2 md:mt-[5.5rem]">
            {scale === 'celsius'
              ? parseFloat(
                  ((weather.list[0].main.temp - 32) * 0.5556).toFixed()
                )
              : weather.list[0].main.temp.toFixed()}
            <span className="w-3 font-noto text-[3rem] font-medium text-app-gray-4">
              {symbol}
            </span>
          </p>
          <p className="mt-6 text-4xl font-semibold text-app-gray-4 md:mt-[5.5rem]">
            {weather.list[0].weather[0].main}
          </p>
          <p className="mt-12 text-[1.125rem] font-medium text-app-gray-5 md:mt-[5.5rem]">
            Today<span className="mx-4">•</span>
            {`${getDayName(date.getDay())}, ${date.getDate()} ${getMonthName(
              date.getMonth()
            )}`}
          </p>
          <p className="text[1.125rem] mt-8 font-semibold text-app-gray-5">
            <LocationOnRounded className="mr-2" />
            {weather?.city.name}
          </p>
        </>
      )}
    </div>
  );
}
