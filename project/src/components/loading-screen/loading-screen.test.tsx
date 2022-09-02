import '@testing-library/jest-dom/extend-expect';
import HistoryRouter from '../history-router/history-router';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from '../../store';
import LoadingScreen from './loading-screen';

const history = createMemoryHistory();

describe('Component: LoadingScreen', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <LoadingScreen />
        </HistoryRouter>
      </Provider>);

    expect(screen.queryByText(/./gmui)).not.toBeInTheDocument();
  });
});
