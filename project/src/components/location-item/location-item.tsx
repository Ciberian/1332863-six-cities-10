import { useAppDispatch } from '../../hooks';
import { changeCity } from '../../store/selected-city/selected-city';

type LocationProps = {
  locationName: string;
  isActive: boolean;
}

function LocationItem({locationName, isActive}: LocationProps): JSX.Element {
  const dispatch = useAppDispatch();

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
