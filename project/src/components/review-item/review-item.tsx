import { Review } from '../../types/types';
import dayjs from 'dayjs';


function ReviewItem ({ review }: { review: Review }): JSX.Element {
  const { user, rating, comment, date } = review;
  const formattedDate = dayjs(date).format('MMMM YYYY');

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src="img/avatar-max.jpg" width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">{user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${rating * 20}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment}</p>
        <time className="reviews__time" dateTime={date}>{formattedDate}</time>
      </div>
    </li>
  );
}

export default ReviewItem;
