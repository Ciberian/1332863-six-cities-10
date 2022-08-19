import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { OfferData } from '../../types/state';
import {
  fetchOfferAction,
  fetchOffersAction,
  fetchFavoriteOffersAction,
  fetchNearbyOffersAction,
  changeFavoriteOffersAction,
  fetchReviewsAction,
  fetchNewReviewAction} from '../api-actions';

const initialState: OfferData = {
  offers: [],
  offer: null,
  favoriteOffers: [],
  nearbyOffers: [],
  reviews: null,
  isDataLoaded: false,
};

export const offersData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isDataLoaded = false;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isDataLoaded = true;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offer = action.payload;
      })
      .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(fetchNewReviewAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
      })
      .addCase(changeFavoriteOffersAction.fulfilled, (state, action) => {
        const indexInAllOffers = state.offers.findIndex((offer) => offer.id === action.payload.id);
        state.offers = [
          ...state.offers.slice(0, indexInAllOffers),
          action.payload,
          ...state.offers.slice(indexInAllOffers + 1)
        ];

        if (action.payload.isFavorite) {
          state.favoriteOffers = [...state.favoriteOffers, action.payload];
        } else {
          state.favoriteOffers = state.favoriteOffers.filter((favoriteOffer) => favoriteOffer.id !== action.payload.id);
        }
      });
  }
});
