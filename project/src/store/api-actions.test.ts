import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import { APIRoute } from '../const';
import { State } from '../types/state';
import { AuthData } from '../types/types';
import { makeFakeOffer, makeFakeReview } from '../utils/mocks';
import {
  fetchOffersAction,
  fetchOfferAction,
  fetchNearbyOffersAction,
  fetchReviewsAction,
  fetchNewReviewAction,
  fetchFavoriteOffersAction,
  changeFavoriteOffersAction,
  checkAuthAction,
  loginAction,
  logoutAction
} from './api-actions';

const DEFAULT_ID = 0;
const OFFERS_COUNT = 10;
const REVIEWS_COUNT = 10;

const fakeOffers = new Array(OFFERS_COUNT).fill(null).map((offer, index) => (makeFakeOffer(index)));
const fakeOffer = makeFakeOffer(DEFAULT_ID);
const fakeReviews = new Array(REVIEWS_COUNT).fill(null).map(() => (makeFakeReview()));

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should dispatch fetchOffersAction when GET/offers', async () => {
    mockAPI
      .onGet(APIRoute.Offers)
      .reply(200, fakeOffers);

    const store = mockStore();
    await store.dispatch(fetchOffersAction());
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchOffersAction.pending.type,
      fetchOffersAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchOfferAction when GET/offer', async () => {
    mockAPI
      .onGet(`${APIRoute.Offers}/${fakeOffer.id}`)
      .reply(200, fakeOffer);

    const store = mockStore();
    await store.dispatch(fetchOfferAction(fakeOffer.id));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchOfferAction.pending.type,
      fetchOfferAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchNearbyOffersAction when GET/nearby', async () => {
    mockAPI
      .onGet(`${APIRoute.Offers}/${fakeOffer.id}/nearby`)
      .reply(200, fakeOffers);

    const store = mockStore();
    await store.dispatch(fetchNearbyOffersAction(fakeOffer.id));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchNearbyOffersAction.pending.type,
      fetchNearbyOffersAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchReviewsAction when GET/comments', async () => {
    mockAPI
      .onGet(`${APIRoute.Reviews}/${fakeOffer.id}`)
      .reply(200, fakeReviews);

    const store = mockStore();
    await store.dispatch(fetchReviewsAction(fakeOffer.id));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchReviewsAction.pending.type,
      fetchReviewsAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchNewReviewAction when POST/comments/id', async () => {
    mockAPI
      .onPost(`${APIRoute.Reviews}/${fakeOffer.id}`)
      .reply(200, fakeReviews);

    const store = mockStore();
    await store.dispatch(fetchNewReviewAction({rating: 4, review: 'review text', id: fakeOffer.id}));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchNewReviewAction.pending.type,
      fetchNewReviewAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchFavoriteOffersAction when GET/favorites', async () => {
    mockAPI
      .onGet(APIRoute.Favorites)
      .reply(200, fakeOffers);

    const store = mockStore();
    await store.dispatch(fetchFavoriteOffersAction());
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFavoriteOffersAction.pending.type,
      fetchFavoriteOffersAction.fulfilled.type
    ]);
  });

  it('should dispatch changeFavouriteOffersAction when POST /favorite/id/status', async () => {
    mockAPI
      .onPost(`${APIRoute.Favorites}/${fakeOffer.id}/${Number(!fakeOffer.isFavorite)}`)
      .reply(200, {...fakeOffer, isFavorite: !fakeOffer.isFavorite});

    const store = mockStore();
    await store.dispatch(changeFavoriteOffersAction({...fakeOffer, isFavorite: !fakeOffer.isFavorite}));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      changeFavoriteOffersAction.pending.type,
      changeFavoriteOffersAction.fulfilled.type
    ]);
  });

  it('should authorization status is "AUTH" when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);
    await store.dispatch(checkAuthAction());
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type
    ]);
  });

  it('should dispatch RequriedAuthorization when POST /login', async () => {
    const fakeUser: AuthData = {login: 'test@test.ru', password: 'abc123'};

    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, {token: 'secret'});


    const store = mockStore();
    Storage.prototype.setItem = jest.fn();
    await store.dispatch(loginAction(fakeUser));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      loginAction.fulfilled.type
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('six-cities-token', 'secret');
  });

  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();
    await store.dispatch(logoutAction());
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.fulfilled.type
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('six-cities-token');
  });
});
