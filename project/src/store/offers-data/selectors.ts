import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Offer, Review } from '../../types/types';

export const getOffers = (state: State): Offer[] => state[NameSpace.Data].offers;
export const getOffer = (state: State): Offer | null => state[NameSpace.Data].offer;
export const getFavoriteOffers = (state: State): Offer[] => state[NameSpace.Data].favoriteOffers;
export const getFavoriteOffersCount = (state: State): number => state[NameSpace.Data].favoriteOffers.length;
export const getReviews = (state: State): Review[] | null => state[NameSpace.Data].reviews;
export const getNearbyOffers = (state: State): Offer[] | null => state[NameSpace.Data].nearbyOffers;
export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.Data].isDataLoaded;
export const getLoadedOfferStatus = (state: State): boolean => state[NameSpace.Data].isOfferLoaded;
