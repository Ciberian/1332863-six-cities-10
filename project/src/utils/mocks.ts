import { datatype, name, internet, image, address, random, date } from 'faker';
import { Offer, Point, Review, UserInfo } from '../types/types';
import { DEFAULT_OFFER_ID, MOCK_OFFERS_COUNT, MOCK_REVIEWS_COUNT } from '../const';

export const makeFakeUserInfo = (): UserInfo => ({
  avatarUrl: image.imageUrl(),
  email: internet.email(),
  id: datatype.number(),
  isPro: datatype.boolean(),
  name: name.firstName(),
  token: datatype.string()
});

export const makeFakePointData = (): Point => ({
  latitude: Number(address.latitude()),
  longitude: Number(address.longitude()),
  zoom: datatype.number({ min: 10, max: 13})
});

export const makeFakeOffer = (id: number): Offer => (
  {
    city: {
      name: 'Paris',
      location: makeFakePointData()
    },
    previewImage: image.imageUrl(),
    images: new Array(3).fill(null).map(() => (image.image())),
    title: random.word(),
    isFavorite: datatype.boolean(),
    isPremium: datatype.boolean(),
    rating: datatype.number({ min: 0, max: 5, precision: 0.1}),
    type: random.word(),
    bedrooms: datatype.number({min: 1, max: 5}),
    maxAdults: datatype.number({min: 1, max: 5}),
    price: datatype.number({min: 100, max: 1000}),
    goods: new Array(3).fill(null).map(() => (random.words())),
    host: {
      id: datatype.number(),
      name: name.firstName(),
      isPro: datatype.boolean(),
      avatarUrl: image.imageUrl()
    },
    description: random.words(15),
    location: {
      latitude: Number(address.latitude()),
      longitude: Number(address.longitude()),
      zoom: datatype.number({ min: 10, max: 13})
    },
    id: id
  }
);

export const makeFakeReview = (): Review => ({
  comment: random.words(22),
  date: String(date.recent()),
  id: datatype.number(),
  rating: datatype.number({ min: 0, max: 5, precision: 0.1}),
  user: {
    avatarUrl: image.imageUrl(),
    id: datatype.number(),
    isPro: datatype.boolean(),
    name: name.firstName(),
  }
});

export const fakeReview = makeFakeReview();

export const fakeOffer = makeFakeOffer(DEFAULT_OFFER_ID);

export const fakeOffers = new Array(MOCK_OFFERS_COUNT).fill(null).map((offer, index) => (makeFakeOffer(index)));

export const fakeReviews = new Array(MOCK_REVIEWS_COUNT).fill(null).map(() => (makeFakeReview()));
