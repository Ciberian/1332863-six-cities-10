import { AuthorizationStatus, NameSpace } from '../../const';
import { State } from '../../types/state';
import { UserInfo } from '../../types/types';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getUserInfo = (state: State): UserInfo | null => state[NameSpace.User].userInfo;
