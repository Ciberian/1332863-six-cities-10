import '@testing-library/jest-dom/extend-expect';
import HistoryRouter from '../history-route/history-route';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { makeFakeReview } from '../../utils/mocks';
import { Provider } from 'react-redux';
import { store } from '../../store';
import ReviewItem from './review-item';

const fakeReview = makeFakeReview();
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
