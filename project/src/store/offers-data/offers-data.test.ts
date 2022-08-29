import { offersData } from './offers-data';
import { OfferData } from '../../types/state';
import { fakeOffer, fakeOffers, fakeReviews } from '../../utils/mocks';
import {
  fetchOffersAction,
  fetchOfferAction,
  fetchNearbyOffersAction,
  fetchReviewsAction,
  fetchNewReviewAction,
  fetchFavoriteOffersAction,
  changeFavoriteOffersAction,
} from '../api-actions';

const changedOffer = {...fakeOffer, isFavorite: !fakeOffer.isFavorite};
const changedState: OfferData = {
  offers: [changedOffer, ...fakeOffers.slice(1)],
  offer: changedOffer,
  favoriteOffers: [],
  nearbyOffers: [changedOffer],
  reviews: null,
  isDataLoaded: false,
  isOfferLoaded: false
};

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

  it('should update nearbyOffers to "fakeOffers" if fetchNearbyOffersAction pending', () => {
    expect(offersData.reducer(state, {type: fetchNearbyOffersAction.fulfilled.type, payload: fakeOffers}))
      .toEqual({...state, nearbyOffers: fakeOffers});
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

  describe('reviewsAction test', () => {
    it('should update reviews to "fakeReviews" if fetchReviewsAction fulfilled', () => {
      expect(offersData.reducer(state, {type: fetchReviewsAction.fulfilled.type, payload: fakeReviews}))
        .toEqual({...state, reviews: fakeReviews});
    });
    it('should update reviews to "fakeReviews" if fetchNewReviewAction fullfilled', () => {
      expect(offersData.reducer(state, {type: fetchNewReviewAction.fulfilled.type, payload: fakeReviews}))
        .toEqual({...state, reviews: fakeReviews});
    });
  });

  describe('fetchFavoriteOffersAction test', () => {
    it('should update favoriteOffers to "fakeOffers" if fetchFavoriteOffersAction fulfilled', () => {
      expect(offersData.reducer(state, {type: fetchFavoriteOffersAction.fulfilled.type, payload: fakeOffers}))
        .toEqual({...state, favoriteOffers: fakeOffers});
    });
  });

  describe('changeFavoriteOffersAction test', () => {
    it('should update all types of offers if changeFavoriteOffersAction fullfilled', () => {
      expect(offersData.reducer(
        {...state,
          offers: fakeOffers,
          offer: fakeOffer,
          favoriteOffers: [fakeOffer],
          nearbyOffers: [fakeOffer]},
        {type: changeFavoriteOffersAction.fulfilled.type, payload: changedOffer}))
        .toEqual(changedState);
    });
  });
});
