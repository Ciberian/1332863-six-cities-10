import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from './history-router';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: HistoryRouter', () => {

  it('should render some text if everything OK with HistoryRouter', () => {
    const store = mockStore();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <h1>HistoryRouterTest</h1>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/HistoryRouterTest/i)).toBeInTheDocument();
  });
});
