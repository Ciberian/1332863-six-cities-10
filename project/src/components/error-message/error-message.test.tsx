import '@testing-library/jest-dom/extend-expect';
import HistoryRouter from '../history-router/history-router';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import ErrorMessage from './error-message';
import { NameSpace } from '../../const';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: ErrorMessage', () => {
  it('should be no error message on the screen by default', () => {
    const store = mockStore({
      [NameSpace.Error]: {error: null},
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ErrorMessage />
        </HistoryRouter>
      </Provider>);

    expect(screen.queryByText(/./gmui)).not.toBeInTheDocument();
  });

  it('should be error message on the screen', () => {
    const store = mockStore({
      [NameSpace.Error]: {error: 'ALARMAAAAAAA!!!'},
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ErrorMessage />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/ALARMAAAAAAA!!!/i)).toBeInTheDocument();
  });
});
