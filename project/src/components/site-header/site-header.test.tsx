import '@testing-library/jest-dom/extend-expect';
import HistoryRouter from '../history-route/history-route';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from '../../store';
import SiteHeader from './site-header';

const history = createMemoryHistory();

describe('Component: SiteHeader', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SiteHeader />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/sign/i)).toBeInTheDocument();
  });
});
