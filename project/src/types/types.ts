export type Point = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type City = {
  name: string;
  location: Point;
};

type OfferHost = {
  id: number;
  name: string;
  isPro: boolean;
  avatarUrl: string;
};

export type Offer = {
  city: City;
  previewImage: string;
  images: string[];
  title: string;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  type: string;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: string[];
  host: OfferHost;
  description: string;
  location: Point;
  id: number;
};

export type favoriteOffer = {
  id: number;
  isFavorite: boolean;
};

export type Review = {
  comment: string
  date: string
  id: number
  rating: number
  user: {
    avatarUrl: string
    id: number
    isPro: boolean
    name: string
  }
}

export type NewReview = {
  rating: number;
  review: string;
  id: number;
}

export type UserInfo = {
  avatarUrl: string
  email: string
  id: number
  isPro: boolean
  name: string
  token: string
};

export type AuthData = {
  login: string;
  password: string;
};

export type UserData = {
  avatarUrl: string
  email: string
  id: number
  isPro: boolean
  name: string
  token: string
}
