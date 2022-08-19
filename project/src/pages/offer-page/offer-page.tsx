import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SiteHeader from '../../components/site-header/site-header';
import OfferGallery from '../../components/offer-gallery/offer-gallery';
import OfferItems from '../../components/offer-items/offer-items';
import ReviewList from '../../components/review-list/review-list';
import ReviewForm from '../../components/review-form/review-form';
import OfferList from '../../components/offer-list/offer-list';
import OfferPageMap from '../../components/offer-page-map/offer-page-map';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AuthorizationStatus } from '../../const';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { fetchNearbyOffersAction, fetchOfferAction, fetchReviewsAction, changeFavoriteOffersAction } from '../../store/api-actions';
import { getNearbyOffers, getOffer, getReviews } from '../../store/offers-data/selectors';

function OfferPage(): JSX.Element {

  const { id } = useParams();
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;
  const offer = useAppSelector(getOffer);
  const reviews = useAppSelector(getReviews);
  const nearbyOffers = useAppSelector(getNearbyOffers);

  useEffect(() => {
    dispatch(fetchOfferAction(Number(id)));
    dispatch(fetchNearbyOffersAction(Number(id)));
    dispatch(fetchReviewsAction(Number(id)));
  }, [id, dispatch]);

  return (
    <div className="page">
      <SiteHeader />

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {offer ? <OfferGallery images={offer.images} /> : <p>There are no pictures of this property</p>}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {offer?.isPremium ?
                <div className="property__mark">
                  <span>Premium</span>
                </div> : ''}

              <div className="property__name-wrapper">
                <h1 className="property__name">{offer?.title}</h1>
                <button
                  onClick={() => {
                    if (offer) {
                      dispatch(changeFavoriteOffersAction({id: offer.id, isFavorite: !offer.isFavorite}));
                    }
                  }}
                  className={`property__bookmark-button
                    ${offer && offer.isFavorite ? 'property__bookmark-button--active' : ''} button`}
                  type="button"
                >
                  <svg className="place-card__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${offer?.rating ? Math.round(offer?.rating) * 20 : 0}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{offer?.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">{offer?.type ? offer?.type[0].toUpperCase() + offer?.type.substring(1) : ''}</li>
                <li className="property__feature property__feature--bedrooms">{offer?.bedrooms} Bedrooms</li>
                <li className="property__feature property__feature--adults">Max {offer?.maxAdults} adults</li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{offer?.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                {offer ? <OfferItems items={offer.goods} /> : <p>There are no special items for this property</p>}
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={offer?.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">{offer?.host.name}</span>
                  {offer?.host.isPro ? <span className="property__user-status">Pro</span> : ''}
                </div>
                <div className="property__description">
                  {offer?.description
                    .split('.')
                    .filter((sentence) => sentence !== '')
                    .map((sentence) => sentence.replace(/^ +/, ''))
                    .map((sentence) => (
                      <p className="property__text" key={sentence}>
                        {`${sentence}.`}
                      </p>
                    ))}
                </div>
              </div>
              <section className="property__reviews reviews">
                {reviews ? <ReviewList reviews={reviews} /> : null}
                {isAuthorized ? <ReviewForm id={ Number(id) } /> : null}
              </section>
            </div>
          </div>
          <section className="property__map map">
            {offer?.city && nearbyOffers ?
              <OfferPageMap
                currentOfferLocation={offer.location}
                currentCity={offer.city}
                nearbyOffers={nearbyOffers}
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
