import '@testing-library/jest-dom/extend-expect';
import HistoryRouter from '../history-route/history-route';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from '../../store';
import OfferGallery from './offer-gallery';
import { image } from 'faker';

const history = createMemoryHistory();

describe('Component: OfferGallery', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <OfferGallery images={[image.imageUrl()]} />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByAltText('Photo_studio')).toBeInTheDocument();
  });
});
