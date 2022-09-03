import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AppRoute, NameSpace, MOCK_OFFERS_COUNT } from '../../const';
import { fakeOffer, fakeOffers, makeFakeUserInfo } from '../../utils/mocks';
import HistoryRouter from '../../components/history-router/history-router';
import FavoritesPage from './favorites-page';
import { Route, Routes } from 'react-router-dom';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const fakeUser = makeFakeUserInfo();

describe('Component: FavoritePage', () => {
  it('should render favorite list if user has it', () => {
    const store = mockStore({
      [NameSpace.Data]: {
        favoriteOffers: fakeOffers
      },
      [NameSpace.User]: {
        userInfo: fakeUser
      }
    });
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoritesPage />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/Sign/i)).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getAllByText(/\/ night/i)).toHaveLength(MOCK_OFFERS_COUNT);
  });

  it('should render empty list if user has not favorite list', () => {
    const store = mockStore({
      [NameSpace.Data]: {
        favoriteOffers: []
      },
      [NameSpace.User]: {
        userInfo: fakeUser
      }
    });
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoritesPage />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/Nothing yet saved/i)).toBeInTheDocument();
  });

  it('should redirect when user click on offer card', async () => {
    const store = mockStore({
      [NameSpace.Data]: {
        favoriteOffers: [fakeOffer]
      },
      [NameSpace.User]: {
        userInfo: fakeUser
      }
    });
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Root} element={<FavoritesPage />} />
            <Route path={AppRoute.Offer} element={<h1>Mock Offer Page</h1>} />
          </Routes>
        </HistoryRouter>
      </Provider>);

    await userEvent.click(screen.getByAltText('Place'));
    expect(screen.getByText(/Mock Offer Page/i)).toBeInTheDocument();
  });
});
