import { useAppSelector } from '../../hooks';
import { getFavoriteOffers } from '../../store/offers-data/selectors';
import OfferList from '../offer-list/offer-list';

function FavoriteList(): JSX.Element {
  const favoriteOffers = useAppSelector(getFavoriteOffers);
  const favoriteCities: string[] = [ ...new Set(favoriteOffers?.map((item) => item.city.name))];

  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {favoriteCities.map((cityName) => (
          <li className="favorites__locations-items" key={cityName}>
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="\#">
                  <span>{cityName}</span>
                </a>
              </div>
            </div>
            <div className="favorites__places">
              {favoriteOffers ?
                <OfferList
                  offers={favoriteOffers.filter((offer) => offer.city.name === cityName)}
                  classPrefix={'favorites'}
                /> : ''}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default FavoriteList;
