import { AppRoute } from '../../const';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutAction } from '../../store/api-actions';
import { UserInfo } from '../../types/types';
import { AppDispatch, State } from '../../types/state';

type SiteHeaderProps = {
	isActive: boolean;
  count: number;
};

function SiteHeader({isActive, count}: SiteHeaderProps) {

  const userInfo = useSelector<State, UserInfo | null>((store) => store.userInfo);
  const dispatch = useDispatch<AppDispatch>();

  const handleSignOut = (evt: { preventDefault: () => void; }) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className={`header__logo-link ${isActive ? 'header__logo-link--active' : ''}`} to="/">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {userInfo ? (
                <>
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                        <img src={userInfo.avatarUrl} alt="userAvatar" />
                      </div>
                      <span className="header__user-name user__name">{userInfo.name}</span>
                      <span className="header__favorite-count">{count}</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <a className="header__nav-link" onClick={handleSignOut} href="\#">
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </>
              ) : (
                <li className="header__nav-item">
                  <Link className="header__nav-link" to={AppRoute.Login}>
                    <span className="header__signout">Sign in</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;
