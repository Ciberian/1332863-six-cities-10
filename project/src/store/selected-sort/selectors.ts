import { NameSpace } from '../../const';
import { State } from '../../types/state';


export const getSortType = (state: State): string => state[NameSpace.Sort].sortType;
