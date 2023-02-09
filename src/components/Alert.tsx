import { useContext, useEffect } from 'react';
import { WeatherContext } from '../contexts/weatherContext';

export default function Alert() {
  const { error, clearError } = useContext(WeatherContext);

  useEffect(() => {
    if (!clearError) return;

    const timeOut = setTimeout(clearError, 3000);

    return () => {
      clearTimeout(timeOut);
    };
  }, [clearError]);

  return error ? (
    <div
      className="absolute left-1/2 right-1/2 top-6 mb-4 w-full max-w-xs -translate-x-1/2 rounded-lg p-4 text-sm bg-gray-800 text-red-400"
      role="alert"
    >
      {error}
    </div>
  ) : null;
}
