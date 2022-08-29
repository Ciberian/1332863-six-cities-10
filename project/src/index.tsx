import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { checkAuthAction, fetchOffersAction } from './store/api-actions';
import { store } from './store';
import HistoryRouter from './components/history-route/history-route';
import ErrorMessage from './components/error-message/error-message';
import browserHistory from './browser-history';
import App from './components/app/app';

store.dispatch(checkAuthAction());
store.dispatch(fetchOffersAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <HistoryRouter history={browserHistory}>
        <ErrorMessage />
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
