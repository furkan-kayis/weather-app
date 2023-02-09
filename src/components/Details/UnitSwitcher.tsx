import { useContext } from 'react';
import { ScaleContext } from '../../contexts/scaleContext';

export default function UnitSwitcher() {
  const { scale, setScale } = useContext(ScaleContext);

  function changeScale(value: typeof scale) {
    if (setScale) {
      setScale(value);
    }
  }
  return (
    <div className="flex place-content-end gap-3 pt-[2.625rem]">
      <button
        type="button"
        onClick={() => changeScale('celsius')}
        className={`h-10 w-10 rounded-full font-noto font-bold transition-colors ${
          scale === 'celsius'
            ? 'bg-app-gray-2 text-app-dark-blue-3'
            : 'bg-app-gray-6 text-app-gray-2'
        }`}
      >
        ℃
      </button>
      <button
        type="button"
        onClick={() => changeScale('fahrenheit')}
        className={`h-10 w-10 rounded-full font-noto font-bold transition-colors ${
          scale === 'fahrenheit'
            ? 'bg-app-gray-2 text-app-dark-blue-3'
            : 'bg-app-gray-6 text-app-gray-2'
        }`}
      >
        ℉
      </button>
    </div>
  );
}
