import OfferCard from '../offer-card/offer-card';
import { Offer } from '../../types/types';

type OfferListProps = {
  offers: Offer[];
  classPrefix: string;
  onOfferCardHover?: (hoveredOffer: Offer | null) => void;
  onOfferCardLeave?: () => void;
}

function OfferList({ offers, classPrefix, onOfferCardHover, onOfferCardLeave }: OfferListProps): JSX.Element {
  return (
    <>
      {offers.map((offer) => (
        <OfferCard
          offer={offer}
          classPrefix={classPrefix}
          key={offer.id}
        />
      ))}
    </>
  );
}

export default OfferList;
