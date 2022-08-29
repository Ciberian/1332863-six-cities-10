import '@testing-library/jest-dom/extend-expect';
import HistoryRouter from '../history-route/history-route';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { makeFakeReview } from '../../utils/mocks';
import { Provider } from 'react-redux';
import { store } from '../../store';
import ReviewList from './review-list';

const fakeReview = makeFakeReview();
const history = createMemoryHistory();

describe('Component: ReviewList', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewList reviews={[fakeReview]} />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByRole('list')).toBeInTheDocument();
  });
});
