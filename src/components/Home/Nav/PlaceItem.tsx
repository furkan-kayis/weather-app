import { ChevronRightRounded } from '@mui/icons-material';
import { useContext } from 'react';
import { WeatherContext } from '../../../contexts/weatherContext';

type CityListItemProps = {
  clearStates: () => void;
  children: string;
};
export default function PlaceItem({
  children,
  clearStates,
}: CityListItemProps) {
  const { fetchWeather, error } = useContext(WeatherContext);

  function handleGetData() {
    if (fetchWeather) {
      fetchWeather(children.toLowerCase().replaceAll(' ', '-'));
      if (!error) {
        clearStates();
      }
    }
  }

  return (
    <li className="group flex h-16 cursor-pointer place-items-center justify-between px-3 font-medium leading-5 text-app-gray-2 outline-1 outline-app-gray-3 hover:outline">
      <button
        type="button"
        onClick={handleGetData}
        className="h-full w-full text-left"
      >
        {children}
      </button>
      <ChevronRightRounded className="invisible text-app-gray-3 group-hover:visible" />
    </li>
  );
}
