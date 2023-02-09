import { Place } from '../Nav';
import PlaceItem from './PlaceItem';

type PlaceListProps = {
  places?: Place[];
  clearStates: () => void;
};

export default function PlaceList({ places, clearStates }: PlaceListProps) {
  return (
    <ul className="mt-10 bg-app-dark-blue">
      {places?.map((p, i) => (
        <PlaceItem key={i} clearStates={clearStates}>
          {p.name}
        </PlaceItem>
      ))}
    </ul>
  );
}
