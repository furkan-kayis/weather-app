import { useContext } from 'react';
import { WeatherContext } from '../../contexts/weatherContext';
import Card from './Highlights/Card';

export default function Highlights() {
  const { weather, loading } = useContext(WeatherContext);
  const data = [
    { wind: weather?.list[0].wind },
    { humidity: weather?.list[0].main.humidity },
    { visibility: weather?.list[0].visibility },
    { pressure: weather?.list[0].main.pressure },
  ];

  return (
    <>
      <p className="mb-8 text-2xl font-bold text-app-gray-2">
        Today's Highlights
      </p>
      <ul
        className={`${
          loading ? 'animate-pulse' : ''
        } grid gap-7 md:max-lg:grid-cols-2 xl:grid-cols-2 xl:gap-12`}
      >
        {data.map((d, i) => (
          <Card key={i} data={d} />
        ))}
      </ul>
    </>
  );
}
