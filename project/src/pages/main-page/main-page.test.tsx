import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AuthorizationStatus, NameSpace, SortType } from '../../const';
import HistoryRouter from '../../components/history-router/history-router';
import MainPage from './main-page';
import { fakeOffer, fakeOffers, makeFakePointData, makeFakeUserInfo } from '../../utils/mocks';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const fakeUser = makeFakeUserInfo();
const fakePoint = makeFakePointData();

describe('Component: MainPage', () => {
  it('should render main page correctly', () => {
    const store = mockStore({
      [NameSpace.Data]: {
        offers: fakeOffers,
        offer: fakeOffer,
        favoriteOffers: fakeOffers
      },
      [NameSpace.City]: {
        city: fakeOffer.city.name
      },
      [NameSpace.Sort]: {
        sortType: SortType.Popular
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth, userInfo: fakeUser
      },
      [NameSpace.Point]: {
        point: fakePoint
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MainPage />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/sign/i)).toBeInTheDocument();
    expect(screen.getByText('Dusseldorf')).toBeInTheDocument();
    expect(screen.getAllByText('Popular')).toHaveLength(2);
    expect(screen.getByText('OpenStreetMap')).toBeInTheDocument();
  });
});
