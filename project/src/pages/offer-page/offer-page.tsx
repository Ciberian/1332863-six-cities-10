import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SiteHeader from '../../components/site-header/site-header';
import OfferGallery from '../../components/offer-gallery/offer-gallery';
import OfferItems from '../../components/offer-items/offer-items';
import ReviewList from '../../components/review-list/review-list';
import ReviewForm from '../../components/review-form/review-form';
import OfferList from '../../components/offer-list/offer-list';
import Map from '../../components/map/map';
import { Offer, Review } from '../../types/types';
import { State } from '../../types/state';
import { AppRoute } from '../../const';
import { api } from '../../store';

function OfferPage(): JSX.Element {

  const { id } = useParams();
  const navigate = useNavigate();

  const allOffers = useSelector<State, Offer[] | null>((store) => store.allOffers);
  const currentOffer: Offer | undefined = (allOffers?.find((offer) => String(offer.id) === id));
  const [offer, setOffer] = useState<Offer | undefined>(currentOffer);

  const loadOffer = async() => {
    try {
      const { data } = await api.get<Offer>(`offer/${id}`);
      setOffer(data);
    } catch (error) {
      navigate(AppRoute.PageNotFound);
    }
  };

  if (!offer) {
    loadOffer();
  }

  const [reviews, setReviews] = useState<Review[] | null>(null);
  const loadReviews = async() => {
    const { data } = await api.get<Review[]>(`/comments/${id}`);
    setReviews(data);
  };

  if (!reviews) {
    loadReviews();
  }

  const [nearbyOffers, setNearbyOffers] = useState<Offer[] | null>(null);
  const loadNearbyOffers = async() => {
    const { data } = await api.get<Offer[]>(`/hotels/${id}/nearby`);
    setNearbyOffers(data);
  };

  if (!nearbyOffers) {
    loadNearbyOffers();
  }

  const nearbyPoints = nearbyOffers?.map((nearbyOffer) => nearbyOffer.location);
  const currentPoint = offer?.location;
  if (currentPoint) {
    nearbyPoints?.push(currentPoint);
  }

  return (
    <div className="page">
      <SiteHeader isActive count={3} />

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {currentOffer ? <OfferGallery images={currentOffer.images} /> : <p>There are no pictures of this property</p>}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {currentOffer?.isPremium ?
                <div className="property__mark">
                  <span>Premium</span>
                </div> : ''}

              <div className="property__name-wrapper">
                <h1 className="property__name">{currentOffer?.title}</h1>
                <button className={`property__bookmark-button ${currentOffer && currentOffer.isFavorite ? 'property__bookmark-button--active' : ''} button`} type="button">
                  <svg className="place-card__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${currentOffer?.rating ? Math.round(currentOffer?.rating) * 20 : 0}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{currentOffer?.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">{currentOffer?.type ? currentOffer?.type[0].toUpperCase() + currentOffer?.type.substring(1) : ''}</li>
                <li className="property__feature property__feature--bedrooms">{currentOffer?.bedrooms} Bedrooms</li>
                <li className="property__feature property__feature--adults">Max {currentOffer?.maxAdults} adults</li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{currentOffer?.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                {currentOffer ? <OfferItems items={currentOffer.goods} /> : <p>There are no special items for this property</p>}
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={currentOffer?.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">{currentOffer?.host.name}</span>
                  {currentOffer?.host.isPro ? <span className="property__user-status">Pro</span> : ''}
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {`${currentOffer?.description.split('.')[0]}.`}
                  </p>
                  {currentOffer && currentOffer?.description.split('.').length >= 2 ? (
                    <p className="property__text">
                      {`${currentOffer?.description.split('.')[1]}.`}
                    </p>
                  ) : ''}
                </div>
              </div>
              <section className="property__reviews reviews">
                {reviews ? (
                  <ReviewList reviews={reviews} />) :
                  null}
                <ReviewForm />
              </section>
            </div>
          </div>
          <section className="property__map map">
            {offer?.city && nearbyPoints ?
              <Map
                currentCity={offer.city}
                points={nearbyPoints}
                selectedPoint={currentPoint}
              /> : ''}
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {nearbyOffers ?
                <OfferList
                  offers={nearbyOffers}
                  classPrefix={'near-places'}
                /> : ''}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
