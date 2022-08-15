import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, TIMEOUT_SHOW_ERROR } from '../const';
import { Offer, UserData, AuthData } from '../types/types';
import { setUserInfo, setError } from './actions';

export const clearErrorAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>('clearError',
  (_arg, { dispatch }) => {
    setTimeout(
      () => dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const fetchOffersAction = createAsyncThunk<Offer[], undefined, {
		dispatch: AppDispatch;
		state: State;
		extra: AxiosInstance;
	}
>('loadOffers', async (_arg, { extra: api }) => {
  const { data } = await api.get<Offer[]>(APIRoute.Offers);
  return data;
});

export const checkAuthAction = createAsyncThunk<void, undefined, {
		dispatch: AppDispatch;
		state: State;
		extra: AxiosInstance;
	}
>('checkAuth', async (_arg, { dispatch, extra: api }) => {
  await api.get(APIRoute.Login);
});

export const loginAction = createAsyncThunk<
	void,
	AuthData,
	{
		dispatch: AppDispatch;
		state: State;
		extra: AxiosInstance;
	}
>('user/login', async ({ login: email, password }, { dispatch, extra: api }) => {
  const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
  saveToken(data.token);
  dispatch(setUserInfo(data));
});

export const logoutAction = createAsyncThunk<
	void,
	undefined,
	{
		dispatch: AppDispatch;
		state: State;
		extra: AxiosInstance;
	}
>('user/logout', async (_arg, { dispatch, extra: api }) => {
  await api.delete(APIRoute.Logout);
  dropToken();
  dispatch(setUserInfo(null));
});
