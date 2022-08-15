import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Offer } from '../../types/types';

export const getOffers = (state: State): Offer[] => state[NameSpace.Data].offers;
export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.Data].isDataLoaded;
export const getErrorStatus = (state: State): boolean => state[NameSpace.Data].error;
