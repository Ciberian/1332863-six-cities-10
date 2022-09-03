import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AuthorizationStatus, NameSpace } from '../../const';
import HistoryRouter from '../../components/history-router/history-router';
import LoginPage from './login-page';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: LoginPage', () => {
  it('should render login page correctly', () => {
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth, userInfo: null
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <LoginPage />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });
});
