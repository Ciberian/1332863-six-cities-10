import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { changeCity } from '../actions';

const initialState = {
  city: 'Paris'
};

export const offersData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(changeCity, (state, action) => {
        state.city = action.payload;
      });
  }
});
