import { CloseRounded, SearchRounded } from '@mui/icons-material';
import axios from 'axios';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import PlaceList from './Nav/PlaceList';

export type Place = {
  name: string;
};
type PlaceData = {
  data: Place[];
};

type NavProps = {
  nav: boolean;
  toggleNav: () => void;
};

export default function Nav({ nav, toggleNav }: NavProps) {
  const [search, setSearch] = useState('');
  const [places, setPlaces] = useState<Place[]>();
  const clearStates = () => {
    setSearch('');
    setPlaces(undefined);
    toggleNav();
  };

  const fetchPlaces = useCallback(async (value: string) => {
    const placeRes = await axios.request({
      url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
      params: {
        minPopulation: '300000',
        namePrefix: value,
        namePrefixDefaultLangResults: 'true',
      },
      headers: {
        'X-RapidAPI-Key': '6acedb9edemshf7760bdbd776db3p1902b9jsn3a29c08002c8',
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
      },
    });

    function isPlaceData(val: unknown): val is PlaceData {
      return (val as PlaceData).data !== undefined;
    }

    if (isPlaceData(placeRes.data)) {
      setPlaces(placeRes.data.data);
    }
  }, []);
  const handleFetch = useCallback(() => {
    if (search !== '' && fetchPlaces) {
      fetchPlaces(search.toLowerCase());
    }
  }, [fetchPlaces, search]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  useEffect(() => {
    const timeOut = setTimeout(handleFetch, 600);
    return () => {
      clearTimeout(timeOut);
    };
  }, [handleFetch]);
  return (
    <div
      className={`absolute left-0 top-0 m-auto flex h-full w-full flex-col bg-app-dark-blue p-10 ${
        nav ? '' : 'hidden'
      }`}
    >
      <button
        type="button"
        onClick={toggleNav}
        className="mb-6 w-6 place-self-end text-app-gray-2"
      >
        <CloseRounded />
      </button>
      <form className="flex w-full max-w-[27.25rem] place-items-center gap-2 place-self-center mb-5">
        <div className="flex w-full place-items-center border border-[#E7E7EB]">
          <label htmlFor="search">
            <SearchRounded className="mx-3 text-app-gray-3" />
          </label>
          <input
            id="search"
            autoComplete="off"
            onChange={handleChange}
            value={search}
            type="text"
            placeholder="search location"
            className="h-12 w-full bg-app-dark-blue font-medium leading-5 text-app-gray-2 placeholder:font-medium placeholder:text-app-gray-3 focus:outline-none"
          />
        </div>
      </form>
      <PlaceList clearStates={clearStates} places={places} />
    </div>
  );
}
