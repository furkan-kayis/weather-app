import { createContext, useCallback, useMemo, useState } from 'react';
import axios from 'axios';

type WeatherData = {
  list: TimeStamp[];
  city: { name: string };
};

type TimeStamp = {
  dt: number;
  main: {
    temp: number;
    pressure: number;
    humidity: number;
  };
  weather: [
    {
      main: string;
    }
  ];
  wind: {
    speed: number;
    deg: number;
  };
  visibility: number;
};

type Context = {
  weather?: WeatherData;
  loading: boolean;
  error?: string;
  fetchWeather?: (
    value: string | { lat: number; lon: number }
  ) => Promise<void>;
  clearError?: () => void;
};

export const WeatherContext = createContext<Context>({
  loading: false,
});

export function WeatherProvider({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) {
  const [weather, setWeather] = useState<WeatherData>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function clearError() {
    setError('');
  }

  const fetchWeather = useCallback(
    async (value: string | { lat: number; lon: number }) => {
      const url = 'https://api.openweathermap.org/data/2.5/forecast';

      let params;

      if (typeof value === 'string') {
        params = {
          q: value,
          units: 'imperial',
          appid: '42ecb55425183b1faeda61a918c6b414',
        };
      } else {
        params = {
          lat: value.lat.toFixed(2),
          lon: value.lon.toFixed(2),
          units: 'imperial',
          appid: '42ecb55425183b1faeda61a918c6b414',
        };
      }

      function isWeatherData(val: unknown): val is WeatherData {
        return (val as WeatherData).city !== undefined;
      }

      try {
        setLoading(true);

        const response = await axios.request({
          url,
          params,
        });

        if (isWeatherData(response.data)) {
          setWeather(response.data);
        }
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else if (typeof e === 'string') {
          setError(e);
        }
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const value = useMemo(
    () =>
      ({
        weather,
        error,
        loading,
        fetchWeather,
        clearError,
      } satisfies Context),
    [weather, error, loading, fetchWeather]
  );

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
}
