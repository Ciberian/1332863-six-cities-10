import ReviewItem from '../review-item/review-item';
import { Review } from '../../types/types';
import dayjs from 'dayjs';

type ReviewListProps = {
  reviews: Review[];
}

function ReviewList({ reviews }: ReviewListProps): JSX.Element {
  const offerReviews = [...reviews];
  return (
    <>
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {offerReviews
          .sort((reviewA, reviewB) => dayjs(reviewB.date).diff(dayjs(reviewA.date), 'second'))
          .slice(0, 10)
          .map((review) => (
            <ReviewItem review={review} key={review.id} />
          ))}
      </ul>
    </>
  );
}

export default ReviewList;
