import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, SortType } from '../../const';
import { changeSortType } from '../actions';

const initialState = {
  sortType: SortType.Popular,
};

export const offersData = createSlice({
  name: NameSpace.Sort,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(changeSortType, (state, action) => {
        state.sortType = action.payload;
      });
  }
});
