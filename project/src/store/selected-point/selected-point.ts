import { createSlice } from '@reduxjs/toolkit';
import { SelectedPoint } from '../../types/state';
import { NameSpace } from '../../const';

const initialState: SelectedPoint = {
  point: undefined
};

export const selectedPoint = createSlice({
  name: NameSpace.Point,
  initialState,
  reducers: {
    setPoint: (state, action) => {
      state.point = action.payload;
    }
  }
});

export const { setPoint } = selectedPoint.actions;
