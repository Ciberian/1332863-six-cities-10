import LocationItem from '../location-item/location-item';
import { getCity } from '../../store/selected-city/selectors';
import { useAppSelector } from '../../hooks';
import { CITIES } from '../../const';

function LocationList(): JSX.Element {
  const cityName = useAppSelector(getCity);

  return (
    <ul className="locations__list tabs__list">
      {CITIES.map((city) => (
        <LocationItem locationName={city} isActive={city === cityName} key={city} />
      ))}
    </ul>
  );
}

export default LocationList;
