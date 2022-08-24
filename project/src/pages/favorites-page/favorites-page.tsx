import { useAppSelector } from '../../hooks';
import SiteHeader from '../../components/site-header/site-header';
import FavoriteList from '../../components/favorite-list/favorite-list';
import FavoriteListEmpty from '../../components/favorite-list-empty/favorite-list-empty';
import { getFavoriteOffersCount } from '../../store/offers-data/selectors';
import { Link } from 'react-router-dom';

function FavoritesPage(): JSX.Element {
  const favoriteOffersCount = useAppSelector(getFavoriteOffersCount);

  return (
    <div className={`page ${favoriteOffersCount ? '' : 'page--favorites-empty'}`}>
      <SiteHeader />

      <main className={`page__main page__main--favorites ${favoriteOffersCount ? '' : 'page__main--favorites-empty'}`}>
        <div className="page__favorites-container container">
          {favoriteOffersCount ?
            <FavoriteList /> :
            <FavoriteListEmpty />}
        </div>
      </main>

      <footer className="footer container">
        <Link className="footer__logo-link" to="/">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesPage;
