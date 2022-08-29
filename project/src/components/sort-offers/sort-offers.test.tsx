import '@testing-library/jest-dom/extend-expect';
import HistoryRouter from '../history-route/history-route';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from '../../store';
import SortOffers from './sort-offers';

const history = createMemoryHistory();

describe('Component: SortOffers', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SortOffers />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByRole('list')).toBeInTheDocument();
  });
});
