import '@testing-library/jest-dom/extend-expect';
import HistoryRouter from '../history-router/history-router';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from '../../store';
import FavoriteList from './favorite-list';

const history = createMemoryHistory();

describe('Component: FavoriteList', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoriteList />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
  });
});
