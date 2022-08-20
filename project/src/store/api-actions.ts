import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { saveToken, dropToken } from '../services/token';
import { Offer, favoriteOffer, Review, NewReview, UserData, AuthData } from '../types/types';
import { APIRoute } from '../const';

export const fetchOffersAction = createAsyncThunk<Offer[], undefined, {
		dispatch: AppDispatch;
		state: State;
		extra: AxiosInstance;
	}
>('loadOffers', async (_arg, { extra: api }) => {
  const { data } = await api.get<Offer[]>(APIRoute.Offers);
  return data;
});

export const fetchOfferAction = createAsyncThunk<Offer, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/offer',
  async (id, {extra: api}) => {
    const { data } = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
    return data;
  },
);

export const fetchNearbyOffersAction = createAsyncThunk<Offer[], number, {
		dispatch: AppDispatch;
		state: State;
		extra: AxiosInstance;
	}
>('loadNearbyOffers', async (id, { extra: api }) => {
  const { data } = await api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`);
  return data;
});

export const fetchReviewsAction = createAsyncThunk<Review[], number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'loadReviews',
  async (id, {extra: api}) => {
    const { data } = await api.get<Review[]>(`${APIRoute.Reviews}/${id}`);
    return data;
  },
);

export const fetchNewReviewAction = createAsyncThunk<Review[], NewReview, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'addReview',
  async ({rating, review, id}, {extra: api}) => {
    const {data} = await api.post<Review[]>(`${APIRoute.Reviews}/${id}`, {rating, comment: review});
    return data;
  },
);

export const fetchFavoriteOffersAction = createAsyncThunk<Offer[], undefined, {
		dispatch: AppDispatch;
		state: State;
		extra: AxiosInstance;
	}
>('loadFavoriteOffers', async (_arg, { extra: api }) => {
  const { data } = await api.get<Offer[]>(APIRoute.Favorites);
  return data;
});

export const changeFavoriteOffersAction = createAsyncThunk<Offer, favoriteOffer, {
		dispatch: AppDispatch;
		state: State;
		extra: AxiosInstance;
	}
>('changeFavoriteOffers', async (offer, { extra: api }) => {
  const { data } = await api.post<Offer>(`${APIRoute.Favorites}/${offer.id}/${Number(offer.isFavorite)}`);
  return data;
});

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
		dispatch: AppDispatch;
		state: State;
		extra: AxiosInstance;
	}
>('user/checkAuth', async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get(APIRoute.Login);
  if (data) {
    dispatch(fetchFavoriteOffersAction());
  }
  return data;
});

export const loginAction = createAsyncThunk<
	UserData,
	AuthData,
	{
		dispatch: AppDispatch;
		state: State;
		extra: AxiosInstance;
	}
>('user/login', async ({ login: email, password }, { extra: api }) => {
  const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
  saveToken(data.token);
  return data;
});

export const logoutAction = createAsyncThunk<
	void,
	undefined,
	{
		dispatch: AppDispatch;
		state: State;
		extra: AxiosInstance;
	}
>('user/logout', async (_arg, { extra: api }) => {
  await api.delete(APIRoute.Logout);
  dropToken();
});
