import { useDispatch } from 'react-redux';
import { changeCity } from '../../store/selected-city/selected-city';
import { AppDispatch } from '../../types/state';

type LocationProps = {
  locationName: string;
  isActive: boolean;
}

function LocationItem({locationName, isActive}: LocationProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <li className="locations__item">
      <a
        className={`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`}
        onClick={(evt) => dispatch(changeCity(evt.currentTarget.textContent))}
        href="/#"
      >
        <span>{locationName}</span>
      </a>
    </li>
  );
}

export default LocationItem;
