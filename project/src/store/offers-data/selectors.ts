import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Offer } from '../../types/types';

export const getCity = (state: State): string | null => state[NameSpace.Data].city;
export const getSortType = (state: State): string | null => state[NameSpace.Data].sortType;
export const getOffers = (state: State): Offer[] => state[NameSpace.Data].offers;
export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.Data].isDataLoaded;
