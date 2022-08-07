import ReviewItem from '../review-item/review-item';
import { Review } from '../../types/types';
import dayjs from 'dayjs';

type ReviewListProps = {
  reviews: Review[];
}

function ReviewList({ reviews }: ReviewListProps): JSX.Element {
  return (
    <>
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews
          .sort((reviewA, reviewB) => dayjs(reviewB.date).diff(dayjs(reviewA.date), 'second'))
          .map((review) => (
            <ReviewItem review={review} key={review.id} />
          ))}
      </ul>
    </>
  );
}

export default ReviewList;
