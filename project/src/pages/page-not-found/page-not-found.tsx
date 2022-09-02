import { Link } from 'react-router-dom';
import SiteHeader from '../../components/site-header/site-header';
import './page-not-found.css';

function PageNotFound(): JSX.Element {
  return (
    <div className="page page--favorites-empty">
      <SiteHeader />

      <main className="page__main page__main--favorites page__main--favorites-empty not-found-main">
        <div className="page__favorites-container container">
          <section className="favorites favorites--empty">
            <div className="cities__status-wrapper">
              <h1>404 Error</h1>
              <b className="favorites__status">This page does not exist.</b>
              <p className="favorites__status-description not-found-description">Would you like to back on the <Link to={'/'}>main page</Link>?</p>
            </div>
          </section>
        </div>
      </main>
      <footer className="footer not-found-footer">
        <Link className="footer__logo-link" to="/">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}

export default PageNotFound;
