import { datatype, name, internet, image} from 'faker';
import { UserInfo } from '../types/types';

export const makeFakeUserInfo = (): UserInfo => ({
  avatarUrl: image.imageUrl(),
  email: internet.email(),
  id: datatype.number(),
  isPro: datatype.boolean(),
  name: name.firstName(),
  token: datatype.string()
});
