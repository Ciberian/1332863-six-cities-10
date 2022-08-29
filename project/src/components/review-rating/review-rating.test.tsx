import '@testing-library/jest-dom/extend-expect';
import HistoryRouter from '../history-route/history-route';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from '../../store';
import ReviewRating from './review-rating';

const history = createMemoryHistory();

describe('Component: ReviewRating', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewRating starNumber={5} rating={'4'} ratingChangeHandler={() => undefined} />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByRole('radio')).toBeInTheDocument();
  });
});
