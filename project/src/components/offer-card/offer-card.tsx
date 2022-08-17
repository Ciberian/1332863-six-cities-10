import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { Offer } from '../../types/types';
import { setPoint } from '../../store/selected-point/selected-point';

type OfferCardProps = {
  offer: Offer;
  classPrefix: string;
}

function OfferCard({ offer, classPrefix }: OfferCardProps): JSX.Element {
  const { isFavorite, isPremium, previewImage, price, rating, title, type, location, id } = offer;
  const dispatch = useAppDispatch();

  return (
    <article
      onMouseEnter={() => dispatch(setPoint(location))}
      onMouseLeave={() => dispatch(setPoint(null))}
      className={`${classPrefix}__card place-card`}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${classPrefix}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${String(id)}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width={classPrefix === 'favorites' ? '150' : '260'}
            height={classPrefix === 'favorites' ? '110' : '200'}
            alt="Place"
          />
        </Link>
      </div>
      <div className={`${classPrefix === 'favorites' ? 'favorites__card-info' : ''} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button ${isFavorite ? 'place-card__bookmark-button--active' : ''} button`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${Math.round(rating) * 20}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${String(id)}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type[0].toUpperCase() + type.substring(1)}</p>
      </div>
    </article>
  );
}

export default OfferCard;
