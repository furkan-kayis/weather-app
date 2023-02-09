import { NavigationRounded } from '@mui/icons-material';
import directionConverter from '../../../utils/directionConverter';
import ProgressBar from './ProgressBar';

type CardProps = {
  data: Partial<{
    pressure: number;
    visibility: number;
    humidity: number;
    wind: Partial<{
      deg: number;
      speed: number;
    }>;
  }>;
};

export default function Card({
  data: { humidity, pressure, visibility, wind },
}: CardProps) {
  let title = '';

  if (pressure) {
    title = 'Air Pressure';
  } else if (humidity) {
    title = 'Humidity';
  } else if (visibility) {
    title = 'Visibility';
  } else if (wind?.speed && wind.deg) {
    title = 'Wind Status';
  }

  return (
    <li className="flex flex-col place-items-center min-h-[10rem] bg-app-dark-blue pt-5 pb-9 sm:px-[3.125rem]">
      <p className="font-medium text-app-gray-2">{title}</p>
      <p className="text-[4rem] font-bold text-app-gray-2">
        {pressure !== undefined && (
          <>
            {pressure}
            <span className="ml-4 text-[2.25rem] font-medium">mb</span>
          </>
        )}
        {humidity !== undefined && (
          <>
            {humidity}
            <span className="text-[2.25rem] font-normal">%</span>
          </>
        )}
        {visibility !== undefined && (
          <>
            {parseFloat((visibility * 0.0006213712).toFixed(1))
              .toString()
              .replaceAll('.', ',')}
            <span className="ml-4 text-[2.25rem] font-medium">miles</span>
          </>
        )}
        {wind?.speed !== undefined && (
          <>
            {wind.speed.toFixed()}
            <span className="text-[2.25rem] font-medium">mph</span>
          </>
        )}
      </p>

      {wind?.deg !== undefined && (
        <p className="flex place-items-center text-app-gray-2 mt-4">
          <NavigationRounded
            style={{ rotate: `${wind.deg}deg` }}
            className="rounded-full bg-white bg-opacity-30 p-1 mr-2"
          />
          {directionConverter(wind.deg)}
        </p>
      )}
      {humidity !== undefined && <ProgressBar value={humidity} />}
    </li>
  );
}
