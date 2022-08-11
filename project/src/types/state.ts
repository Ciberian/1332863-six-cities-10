import { store } from '../store/index.js';
import { AuthorizationStatus } from '../const';
import { Offer, UserInfo } from './types';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus,
  userInfo: null | UserInfo
};

export type OfferData = {
  offers: Offer[],
  city: string,
  sortType: string,
  isDataLoaded: boolean,
  error: string | null
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
