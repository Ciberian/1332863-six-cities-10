import { offersData } from './offers-data';
import { OfferData } from '../../types/state';
import { fetchOffersAction } from '../api-actions';
import { makeFakeOffer } from '../../utils/mocks';

const fakeOffers = new Array(10).fill(null).map(() => (makeFakeOffer()));

describe('Reducer: offersData', () => {
  let state: OfferData;

  beforeEach(() => {
    state = {
      offers: [],
      offer: null,
      favoriteOffers: [],
      nearbyOffers: [],
      reviews: null,
      isDataLoaded: false,
      isOfferLoaded: false,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(offersData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  describe('fetchOffersAction test', () => {
    it('should not update state if fetchOffersAction pending', () => {
      expect(offersData.reducer(state, {type: fetchOffersAction.pending.type}))
        .toEqual(state);
    });
    it('should update offers to "fakeOffers" and loading status to "true" if fetchOffersAction fullfilled', () => {
      expect(offersData.reducer(state, {type: fetchOffersAction.fulfilled.type, payload: fakeOffers}))
        .toEqual({...state, offers: fakeOffers, isDataLoaded: true});
    });
    it('should update loading status to "true" if fetchOffersAction rejected', () => {
      expect(offersData.reducer(state, {type: fetchOffersAction.rejected.type}))
        .toEqual({...state, isDataLoaded: true});
    });
  });

  // describe('loginAction test', () => {
  //   it('should update authorizationStatus to "AUTH" and userInfo if loginAction fulfilled', () => {
  //     expect(userProcess.reducer(state, { type: loginAction.fulfilled.type, payload: userInfo }))
  //       .toEqual({authorizationStatus: AuthorizationStatus.Auth, userInfo: userInfo});
  //   });
  //   it('should update authorizationStatus to "NO_AUTH" if loginAction rejected', () => {
  //     expect(userProcess.reducer(state, { type: loginAction.rejected.type}))
  //       .toEqual({authorizationStatus: AuthorizationStatus.NoAuth, userInfo: null});
  //   });
  // });

  // describe('logoutAction test', () => {
  //   it('should update authorizationStatus to "NO_AUTH" if logoutAction fulfilled', () => {
  //     expect(userProcess.reducer(state, { type: logoutAction.fulfilled.type }))
  //       .toEqual({authorizationStatus: AuthorizationStatus.NoAuth, userInfo: null});
  //   });
  // });
});
