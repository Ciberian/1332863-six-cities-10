import '@testing-library/jest-dom/extend-expect';
import HistoryRouter from '../history-router/history-router';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { fakeOffer } from '../../utils/mocks';
import { Provider } from 'react-redux';
import { store } from '../../store';
import OfferList from './offer-list';

const history = createMemoryHistory();

describe('Component: OfferList', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <OfferList offers={[fakeOffer]} classPrefix='cities' />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(fakeOffer.title)).toBeInTheDocument();
  });
});
