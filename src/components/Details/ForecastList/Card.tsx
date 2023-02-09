import { useContext } from 'react';
import { ScaleContext } from '../../../contexts/scaleContext';
import { getDayName, getMonthName } from '../../../utils/dateConverter';

type CardProps = {
  data: Partial<{
    date: number;
    weatherCondition: string;
    day: number;
    night: number;
  }>;
};

export default function Card({
  data: { date, day, night, weatherCondition },
}: CardProps) {
  const { scale } = useContext(ScaleContext);
  const symbol = scale === 'fahrenheit' ? '℉' : '℃';
  const today = new Date();
  let dt;
  let dateFormat;
  let formattedDay;
  let formattedNight;

  if (scale === 'celsius' && day && night) {
    formattedDay = ((day - 32) * 0.5556).toFixed();
    formattedNight = ((night - 32) * 0.5556).toFixed();
  } else {
    formattedDay = day?.toFixed();
    formattedNight = night?.toFixed();
  }

  if (date !== undefined) {
    dt = new Date(date * 1000);

    if (dt.getDay() !== today.getDay() + 1) {
      dateFormat = `${getDayName(dt.getDay())}, ${dt.getDate()} ${getMonthName(
        dt.getMonth()
      )}`;
    }
  }

  return (
    <li className="bg-app-dark-blue min-w-[7.5rem] min-h-[11rem] px-5 py-[1.125rem] flex flex-col place-items-center">
      <p className="font-medium text-app-gray-2">
        {dateFormat ?? (dt?.getDate() === today.getDate() + 1 && 'Tomorrow')}
      </p>
      {weatherCondition && (
        <img
          src={
            new URL(
              `/src/assets/${weatherCondition.toLowerCase()}.png`,
              import.meta.url
            ).href
          }
          alt=""
          loading="lazy"
          className="max-h-[3.875rem] mt-3"
        />
      )}
      <div className="flex items-center gap-4 mt-8  min-w-[5.5rem]">
        <p className="font-medium text-center leading-[1.188rem] min-w-[2.125rem]  text-app-gray-2">
          {formattedDay}
          <span className="font-noto">{symbol}</span>
        </p>
        <p className="font-medium text-center leading-[1.188rem] min-w-[2.125rem] text-app-gray-4">
          {formattedNight}
          <span className="font-noto">{symbol}</span>
        </p>
      </div>
    </li>
  );
}
