import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthorizationStatus, AppRoute, NameSpace, SortType } from '../../const';
import { fakeOffer, fakeOffers } from '../../utils/mocks';
import { api } from '../../store';
import thunk from 'redux-thunk';
import HistoryRouter from '../history-router/history-router';
import App from './app';

const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  [NameSpace.Data]: {
    offers: fakeOffers,
    offer: fakeOffer,
    favoriteOffers: fakeOffers,
    nearbyOffers: fakeOffers,
    reviews: null,
    isDataLoaded: true,
    isOfferLoaded: true,
  },
  [NameSpace.User]: {authorizationStatus: AuthorizationStatus.NoAuth, userInfo: null},
  [NameSpace.City]: {city: 'Paris'},
  [NameSpace.Sort]: {sortType: SortType.Popular},
  [NameSpace.Point]: {point: null},
  [NameSpace.Error]: {error: null},
});

const storeForFavorites = mockStore({
  [NameSpace.Data]: {
    offers: fakeOffers,
    offer: fakeOffer,
    favoriteOffers: fakeOffers,
    nearbyOffers: fakeOffers,
    reviews: null,
    isDataLoaded: true,
    isOfferLoaded: true,
  },
  [NameSpace.User]: {authorizationStatus: AuthorizationStatus.Auth, userInfo: null},
  [NameSpace.City]: {city: 'Paris'},
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

const fakeFavoritesApp = (
  <Provider store={storeForFavorites}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "MainPage" when user navigate to "/"', () => {
    history.push(AppRoute.Root);
    render(fakeApp);

    expect(screen.getByText(/[0-9]{2} places to stay in Paris/i)).toBeInTheDocument();
    expect(screen.getByText(/Dusseldorf/i)).toBeInTheDocument();
  });

  it('should render "LoginPage" when user navigate to "/login"', () => {
    history.push(AppRoute.Login);
    render(fakeApp);

    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  it('should render "FavoritesPage" when user navigate to "/favorites"', () => {
    history.push(AppRoute.Favorites);
    render(fakeFavoritesApp);

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });

  it('should render "OfferPage" when user navigate to "/offer"', () => {
    history.push(`/offer/${fakeOffer.id}`);
    render(fakeApp);

    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
  });

  it('should render "PageNotFound" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');
    render(fakeApp);

    expect(screen.getByText('404 Error')).toBeInTheDocument();
    expect(screen.getByText('This page does not exist.')).toBeInTheDocument();
  });
});
