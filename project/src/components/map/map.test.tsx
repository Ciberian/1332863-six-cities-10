import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { store } from '../../store';
import Map from './map';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';
import { fakeOffer } from '../../utils/mocks';

const history = createMemoryHistory();

describe('Component: Map', () => {
  it('should render map component correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Map currentCity={fakeOffer.city} points={[fakeOffer.city.location]} />
        </HistoryRouter>
      </Provider>);
    expect(screen.getByText('OpenStreetMap')).toBeInTheDocument();
  });
});
