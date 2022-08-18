import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Offer } from '../../types/types';

export const getOffers = (state: State): Offer[] => state[NameSpace.Data].offers;
export const getFavoriteOffers = (state: State): Offer[] => state[NameSpace.Data].favoriteOffers;
export const getFavoriteOffersCount = (state: State): number => state[NameSpace.Data].favoriteOffers.length;
export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.Data].isDataLoaded;
