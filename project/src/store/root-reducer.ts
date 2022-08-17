import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { offersData } from './offers-data/offers-data';
import { selectedCity } from './selected-city/selected-city';
import { selectedSort } from './selected-sort/selected-sort';
import { userProcess } from './user-process/user-process';
import { errorProcess } from './error-process/error-process';
import { selectedPoint } from './selected-point/selected-point';

export const rootReducer = combineReducers({
  [NameSpace.Data]: offersData.reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.City]: selectedCity.reducer,
  [NameSpace.Sort]: selectedSort.reducer,
  [NameSpace.Point]: selectedPoint.reducer,
  [NameSpace.Error]: errorProcess.reducer,
});
