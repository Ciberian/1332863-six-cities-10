import '@testing-library/jest-dom/extend-expect';
import HistoryRouter from '../history-router/history-router';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from '../../store';
import LocationList from './location-list';

const history = createMemoryHistory();

describe('Component: LocationList', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <LocationList />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByRole('list')).toBeInTheDocument();
  });
});
