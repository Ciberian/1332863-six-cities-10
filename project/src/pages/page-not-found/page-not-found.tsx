import { Link } from 'react-router-dom';
import SiteHeader from '../../components/site-header/site-header';

function PageNotFound(): JSX.Element {
  return (
    <div className="page page--favorites-empty">
      <SiteHeader />

      <main style={{backgroundColor: '#f5f5f5'}} className="page__main page__main--favorites page__main--favorites-empty">
        <div className="page__favorites-container container">
          <section className="favorites favorites--empty">
            <div className="cities__status-wrapper">
              <h1 style={{fontSize: `${80}px`}}>404 Error</h1>
              <b className="favorites__status">This page does not exist.</b>
              <p className="favorites__status-description">Would you like to back on the <Link to={'/'} style={{textDecoration: 'underline', color: '#4481c3'}} >main page</Link>?</p>
            </div>
          </section>
        </div>
      </main>
      <footer style={{backgroundColor: '#f5f5f5'}} className="footer">
        <Link className="footer__logo-link" to="/">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}

export default PageNotFound;
