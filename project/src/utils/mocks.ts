import { datatype, name, internet, image} from 'faker';
import { Point, UserInfo } from '../types/types';

export const makeFakeUserInfo = (): UserInfo => ({
  avatarUrl: image.imageUrl(),
  email: internet.email(),
  id: datatype.number(),
  isPro: datatype.boolean(),
  name: name.firstName(),
  token: datatype.string()
});

export const makeFakePointData = (): Point => ({
  latitude: datatype.number(),
  longitude: datatype.number(),
  zoom: datatype.number()
});
