import '@testing-library/jest-dom/extend-expect';
import HistoryRouter from '../history-route/history-route';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from '../../store';
import ReviewForm from './review-form';

const history = createMemoryHistory();

describe('Component: ReviewForm', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewForm id={0} />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText('Your review')).toBeInTheDocument();
  });
});
