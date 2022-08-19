import 'leaflet/dist/leaflet.css';
import { Icon, Marker, LayerGroup } from 'leaflet';
import { useRef, useEffect } from 'react';
import { City, Offer, Point } from '../../types/types';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';
import useMap from '../../hooks/use-map';

type OfferPageMapProps = {
  currentOfferLocation: Point;
  currentCity: City;
  nearbyOffers: Offer[];
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [27, 39]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [27, 39],
  iconAnchor: [27, 39]
});

function OfferPageMap({currentOfferLocation, currentCity, nearbyOffers}: OfferPageMapProps): JSX.Element {
  const {location: {latitude, longitude, zoom}} = currentCity;
  const mapRef = useRef(null);
  const map = useMap(mapRef, currentCity);

  const currentSelectedPoint = currentOfferLocation;
  const prevSelectedPoint = useRef<Point>();
  const markerGroup = useRef(new LayerGroup());

  useEffect(() => {
    if (map) {
      markerGroup.current.addTo(map);

      if (prevSelectedPoint.current !== currentSelectedPoint) {
        markerGroup.current.clearLayers();
        prevSelectedPoint.current = currentSelectedPoint;
        map.setView({lat: latitude, lng: longitude}, zoom);

        const nearbyPoints = nearbyOffers?.map((nearbyOffer) => nearbyOffer.location);

        nearbyPoints.forEach((point) => {
          const marker = new Marker({
            lat: point.latitude,
            lng: point.longitude
          });

          marker.setIcon(defaultCustomIcon).addTo(markerGroup.current);
        });

        const currentMarker = new Marker({
          lat: currentSelectedPoint.latitude,
          lng: currentSelectedPoint.longitude
        });

        currentMarker.setIcon(currentCustomIcon).addTo(markerGroup.current);
      }
    }
  }, [latitude, longitude, map, nearbyOffers, currentSelectedPoint, zoom]);

  return <div style={{height: '100%'}} ref={mapRef}></div>;
}

export default OfferPageMap;
