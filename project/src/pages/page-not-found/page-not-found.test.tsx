import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-router/history-router';
import PageNotFound from './page-not-found';
import { AuthorizationStatus, NameSpace } from '../../const';
import { fakeOffers } from '../../utils/mocks';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: PageNotFound', () => {
  it('should render PageNotFound correctly', () => {
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Unknown, userInfo: null
      },
      [NameSpace.Data]: {
        favoriteOffers: fakeOffers
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PageNotFound />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/Error/i)).toBeInTheDocument();
    expect(screen.getByText(/Would you like to back on the/i)).toBeInTheDocument();
  });
});
