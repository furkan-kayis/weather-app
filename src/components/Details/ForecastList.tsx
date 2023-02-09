import { useContext } from 'react';
import { WeatherContext } from '../../contexts/weatherContext';
import Card from './ForecastList/Card';

export default function ForecastList() {
  const { weather, loading } = useContext(WeatherContext);
  const data = [
    {
      date: weather?.list[7].dt,
      day: weather?.list[7].main.temp,
      night: weather?.list[11].main.temp,
      weatherCondition: weather?.list[11].weather[0].main,
    },
    {
      date: weather?.list[15].dt,
      day: weather?.list[15].main.temp,
      night: weather?.list[19].main.temp,
      weatherCondition: weather?.list[19].weather[0].main,
    },
    {
      date: weather?.list[23].dt,
      day: weather?.list[23].main.temp,
      night: weather?.list[27].main.temp,
      weatherCondition: weather?.list[27].weather[0].main,
    },
    {
      date: weather?.list[31].dt,
      day: weather?.list[31].main.temp,
      night: weather?.list[35].main.temp,
      weatherCondition: weather?.list[35].weather[0].main,
    },
    {
      date: weather?.list[39].dt,
      day: weather?.list[39].main.temp,
      night: weather?.list[39].main.temp,
      weatherCondition: weather?.list[39].weather[0].main,
    },
  ];
  return (
    <ul
      className={`${
        loading ? 'animate-pulse' : ''
      } mx-auto grid max-w-max grid-cols-2 gap-6 py-[3.25rem] md:grid-cols-5 lg:grid-cols-3 xl:grid-cols-5 xl:pt-[4.125rem] xl:pb-[4.5rem]`}
    >
      {data.map((d, i) => (
        <Card key={i} data={d} />
      ))}
    </ul>
  );
}
