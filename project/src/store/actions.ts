import { createAction } from '@reduxjs/toolkit';

export const changeSortType = createAction('changeSortType', (sortType) => ({
  payload: sortType
}));
