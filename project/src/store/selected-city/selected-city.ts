import { createSlice } from '@reduxjs/toolkit';
import { SelectedCity } from '../../types/state';
import { NameSpace } from '../../const';
import { changeCity } from '../actions';

const initialState: SelectedCity = {
  city: 'Paris'
};

export const selectedCity = createSlice({
  name: NameSpace.City,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(changeCity, (state, action) => {
        state.city = action.payload;
      });
  }
});
