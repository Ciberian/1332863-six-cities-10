import '@testing-library/jest-dom/extend-expect';
import HistoryRouter from '../history-route/history-route';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { fakeOffer } from '../../utils/mocks';
import { Provider } from 'react-redux';
import { store } from '../../store';
import OfferCard from './offer-card';

const history = createMemoryHistory();

describe('Component: OfferCard', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <OfferCard offer={fakeOffer} classPrefix='cities' />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(fakeOffer.title)).toBeInTheDocument();
  });
});
