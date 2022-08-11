import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, SortType } from '../../const';
import { OfferData } from '../../types/state';
import { fetchOffersAction } from '../api-actions';
import { changeSortType } from '../actions';

const initialState: OfferData = {
  offers: [],
  city: 'Paris',
  sortType: SortType.Popular,
  isDataLoaded: false,
};

export const offersData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isDataLoaded = false;
      })
      .addCase(changeSortType, (state, action) => {
        state.sortType = action.payload;
      });
  }
});
