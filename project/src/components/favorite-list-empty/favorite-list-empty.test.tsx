import '@testing-library/jest-dom/extend-expect';
import HistoryRouter from '../history-router/history-router';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from '../../store';
import FavoriteListEmpty from './favorite-list-empty';

const history = createMemoryHistory();

describe('Component: FavoriteListEmpty', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoriteListEmpty />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
  });
});
