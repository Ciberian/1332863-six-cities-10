import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getCity = (state: State): string => state[NameSpace.City].city;
