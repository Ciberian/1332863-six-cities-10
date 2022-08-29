import '@testing-library/jest-dom/extend-expect';
import HistoryRouter from '../history-router/history-router';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from '../../store';
import OfferListEmpty from './offer-list-empty';

const history = createMemoryHistory();

describe('Component: OfferListEmpty', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <OfferListEmpty cityName={'Paris'} />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/Paris/i)).toBeInTheDocument();
  });
});
