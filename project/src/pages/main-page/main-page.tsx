import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SiteHeader from '../../components/site-header/site-header';
import LocationList from '../../components/location-list/location-list';
import OfferListEmpty from '../../components/offer-list-empty/offer-list-empty';
import SortOffers from '../../components/sort-offers/sort-offers';
import OfferList from '../../components/offer-list/offer-list';
import Map from '../../components/map/map';
import { fetchOffersAction } from '../../store/api-actions';
import { AppDispatch, State } from '../../types/state';
import { Offer, Point } from '../../types/types';
import { SortType } from '../../const';

function MainPage(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchOffersAction());
  });

  const cityName = useSelector<State, string>((store) => store.city);
  const allOffers = useSelector<State, Offer[] | null>((store) => store.allOffers);
  const currentSortType = useSelector<State, string>((store) => store.sortType);

  const cityOffers = allOffers?.filter((offer) => offer.city.name === cityName);
  const currentCity = cityOffers ? cityOffers[0].city : null;
  const points = cityOffers?.map((offer) => offer.location);
  const [selectedPoint, setSelectedPoint] = useState<Point | undefined>(undefined);

  const sortOffers = (sortType: string, offers: Offer[]) => {
    switch (sortType) {
      case SortType.Popular:
        return offers;
      case SortType.PriceToHigh:
        return offers.slice().sort((offerA, offerB) => offerA.price - offerB.price);
      case SortType.PriceToLow:
        return offers.slice().sort((offerA, offerB) => offerB.price - offerA.price);
      case SortType.TopRated:
        return offers.slice().sort((offerA, offerB) => offerB.rating - offerA.rating);
      default:
        return offers;
    }
  };

  const handleOfferCardHover = (hoveredOffer: Offer | null) => {
    const currentOffer = cityOffers?.find((offer) =>
      offer.id === hoveredOffer?.id,
    );
    setSelectedPoint(currentOffer?.location);
  };

  const handleOfferCardLeave = () => {
    setSelectedPoint(undefined);
  };

  return (
    <div className="page page--gray page--main">
      <SiteHeader isActive count={4} />

      <main className={`page__main page__main--index ${cityOffers ? '' : 'page__main--index-empty'}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationList />
          </section>
        </div>
        <div className="cities">
          { cityOffers ?
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{`${cityOffers?.length} places to stay in ${cityName}`}</b>
                <SortOffers />
                <div className="cities__places-list places__list tabs__content">
                  <OfferList
                    offers={sortOffers(currentSortType, cityOffers)}
                    classPrefix={'cities'}
                    onOfferCardHover={handleOfferCardHover}
                    onOfferCardLeave={handleOfferCardLeave}
                  />
                </div>
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  {currentCity && points ?
                    <Map
                      currentCity={currentCity}
                      points={points}
                      selectedPoint={selectedPoint}
                    /> : ''}
                </section>
              </div>
            </div> :
            <OfferListEmpty cityName={cityName} />}
        </div>
      </main>
    </div>
  );
}

export default MainPage;
