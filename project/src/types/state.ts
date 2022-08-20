import { store } from '../store/index.js';
import { AuthorizationStatus } from '../const';
import { Offer, Point, Review, UserInfo } from './types';

export type SelectedCity = {
  city: string
};

export type SelectedSort = {
  sortType: string;
};

export type SelectedPoint = {
  point: undefined | Point;
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
  offer: null | Offer,
  favoriteOffers: Offer[],
  nearbyOffers: Offer[],
  reviews: null | Review[],
  isDataLoaded: boolean,
  isOfferLoaded: boolean,
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
