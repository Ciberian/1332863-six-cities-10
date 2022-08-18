import { useAppSelector } from '../../hooks';
import OfferList from '../../components/offer-list/offer-list';
import SiteHeader from '../../components/site-header/site-header';
import { getOffers } from '../../store/offers-data/selectors';

function FavoritesPage(): JSX.Element {
  const allOffers = useAppSelector(getOffers);
  const favoriteCities: string[] = [ ...new Set(allOffers?.map((item) => item.city.name))];

  return (
    <div className="page">
      <SiteHeader favorites={3} />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {favoriteCities.map((cityName) => (
                <li className="favorites__locations-items" key={cityName + Math.random()}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="\#">
                        <span>{cityName}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {allOffers ?
                      <OfferList
                        offers={allOffers}
                        classPrefix={'favorites'}
                      /> : ''}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
}

export default FavoritesPage;
