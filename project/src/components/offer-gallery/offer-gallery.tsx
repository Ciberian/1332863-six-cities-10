function OfferGallery(props: {images: string[] | []}): JSX.Element {
  return (
    props.images?.map((img) => (
      <div className="property__image-wrapper" key={img}>
        <img className="property__image" src={img} alt="Photo_studio" />
      </div>
    ))
  );

}

export default OfferGallery;
