import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, SortType } from '../../const';
import { SelectedSort } from '../../types/state';

const initialState: SelectedSort = {
  sortType: SortType.Popular,
};

export const selectedSort = createSlice({
  name: NameSpace.Sort,
  initialState,
  reducers: {
    changeSortType: (state, action) => {
      state.sortType = action.payload;
    }
  }
});

export const { changeSortType } = selectedSort.actions;
