import { createSlice } from '@reduxjs/toolkit';
import { SelectedCity } from '../../types/state';
import { NameSpace } from '../../const';

const initialState: SelectedCity = {
  city: 'Paris'
};

export const selectedCity = createSlice({
  name: NameSpace.City,
  initialState,
  reducers: {
    changeCity: (state, action) => {
      state.city = action.payload;
    }
  }
});

export const { changeCity } = selectedCity.actions;
