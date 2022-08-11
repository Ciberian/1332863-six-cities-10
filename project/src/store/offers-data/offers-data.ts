import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, SortType } from '../../const';
import { OfferData } from '../../types/state';
import { fetchOffersAction } from '../api-actions';
import { changeSortType, changeCity } from '../actions';

const initialState: OfferData = {
  offers: [],
  city: 'Paris',
  sortType: SortType.Popular,
  isDataLoaded: false,
  error: null,
};

export const offersData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isDataLoaded = true;
      })
      .addCase(changeSortType, (state, action) => {
        state.sortType = action.payload;
      })
      .addCase(changeCity, (state, action) => {
        state.sortType = action.payload;
      });
  }
});
