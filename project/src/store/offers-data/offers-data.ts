import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { OfferData } from '../../types/state';
import { fetchOffersAction } from '../api-actions';

const initialState: OfferData = {
  offers: [],
  isDataLoaded: false,
  error: null,
};

const OFFERS_ERROR_MESSAGE = 'Offers cannot be downloaded at the moment, or you have made an incorrect request';

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
        state.error = OFFERS_ERROR_MESSAGE;
        state.isDataLoaded = true;
      });
  }
});
