import { store } from '../store/index.js';
import { AuthorizationStatus } from '../const';
import { Offer } from './types.js';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus
};

export type OfferData = {
  offers: Offer[],
  isDataLoaded: boolean,
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
