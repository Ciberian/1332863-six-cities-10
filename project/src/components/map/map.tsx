import 'leaflet/dist/leaflet.css';
import { Icon, Marker, LayerGroup } from 'leaflet';
import { useRef, useEffect } from 'react';
import { City, Point } from '../../types/types';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT, NameSpace } from '../../const';
import useMap from '../../hooks/use-map';
import { useAppSelector } from '../../hooks';
import './map.css';

type MapProps = {
  currentCity: City;
  points: Point[];
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

function Map(props: MapProps): JSX.Element {
  const {currentCity: {name, location}, points} = props;
  const selectedPoint = useAppSelector((state) => state[NameSpace.Point].point);
  const mapRef = useRef(null);
  const map = useMap(mapRef, props.currentCity);
  const currentCityName = name;
  const prevCityName = useRef<string>();
  const markerGroup = useRef(new LayerGroup());

  useEffect(() => {
    if (map) {
      markerGroup.current.addTo(map);
      if (prevCityName.current !== currentCityName) {
        map.setView({lat: location.latitude, lng: location.longitude}, location.zoom);
        markerGroup.current.clearLayers();
        prevCityName.current = currentCityName;
      }

      points.forEach((point) => {
        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude
        });

        marker
          .setIcon(
            selectedPoint !== null &&
            point.latitude === selectedPoint?.latitude &&
            point.longitude === selectedPoint?.longitude
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerGroup.current);
      });
    }
  }, [currentCityName, location.latitude, location.longitude, location.zoom, map, points, selectedPoint]);

  return <div className="map-container" ref={mapRef}></div>;
}

export default Map;
