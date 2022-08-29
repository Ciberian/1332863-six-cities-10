import '@testing-library/jest-dom/extend-expect';
import HistoryRouter from '../history-route/history-route';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from '../../store';
import LocationItem from './location-item';

const history = createMemoryHistory();

describe('Component: LocationItem', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <LocationItem locationName={'Paris'} isActive />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText('Paris')).toBeInTheDocument();
  });
});
