import { createReducer } from '@reduxjs/toolkit';
import { changeCity, changeSortType, loadOffers, setDataLoadedStatus, setError, setUserInfo } from './action';
import { SortType } from '../const';
import { InitialState } from '../types/types';


const initialState: InitialState = {
  city: 'Paris',
  allOffers: null,
  sortType: SortType.Popular,
  error: null,
  isDataLoaded: false,
  userInfo: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(changeSortType, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.allOffers = action.payload;
    })
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setUserInfo, (state, action) => {
      state.userInfo = action.payload;
    });
});

export { reducer };
