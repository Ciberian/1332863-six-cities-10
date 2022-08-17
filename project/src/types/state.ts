import { store } from '../store/index.js';
import { AuthorizationStatus } from '../const';
import { Offer, UserInfo } from './types';

export type SelectedCity = {
  city: string
};

export type SelectedSort = {
  sortType: string;
};

export type CurrentError = {
  error: null | string;
};

export type UserProcess = {
  authorizationStatus: AuthorizationStatus,
  userInfo: null | UserInfo,
};

export type OfferData = {
  offers: Offer[],
  isDataLoaded: boolean
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
