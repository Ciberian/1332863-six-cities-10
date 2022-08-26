import { offersData } from './offers-data';
import { OfferData } from '../../types/state';
import { fetchOffersAction, fetchOfferAction } from '../api-actions';
import { makeFakeOffer } from '../../utils/mocks';

const fakeOffers = new Array(10).fill(null).map(() => (makeFakeOffer()));
const fakeOffer = makeFakeOffer();

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

  describe('fetchOfferAction test', () => {
    it('should not update state if fetchOfferAction pending', () => {
      expect(offersData.reducer(state, {type: fetchOfferAction.pending.type}))
        .toEqual(state);
    });
    it('should update offer to "fakeOffer" and loading status to "true" if fetchOfferAction fullfilled', () => {
      expect(offersData.reducer(state, {type: fetchOfferAction.fulfilled.type, payload: fakeOffer}))
        .toEqual({...state, offer: fakeOffer, isOfferLoaded: true});
    });
    it('should update loading status to "true" if fetchOfferAction rejected', () => {
      expect(offersData.reducer(state, {type: fetchOfferAction.rejected.type}))
        .toEqual({...state, isOfferLoaded: true});
    });
  });
});
