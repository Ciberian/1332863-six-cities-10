import '@testing-library/jest-dom/extend-expect';
import HistoryRouter from '../history-router/history-router';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { fakeReview } from '../../utils/mocks';
import { Provider } from 'react-redux';
import { store } from '../../store';
import ReviewItem from './review-item';

const history = createMemoryHistory();

describe('Component: ReviewItem', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewItem review={fakeReview} />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText('Rating')).toBeInTheDocument();
  });
});
