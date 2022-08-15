import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, SortType } from '../../const';
import { SelectedSort } from '../../types/state';
import { changeSortType } from '../actions';

const initialState: SelectedSort = {
  sortType: SortType.Popular,
};

export const selectedSort = createSlice({
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
