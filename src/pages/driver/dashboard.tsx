import GoogleMapReact from "google-map-react";
import React, { useEffect, useState } from "react";

interface ICoords {
  lat: number;
  lng: number;
}

const defaultProps = {
  center: {
    lat: 35.22,
    lng: 128.87,
  },
  zoom: 16,
};

interface IDriverProps extends React.HTMLAttributes<HTMLElement> {
  lat: number;
  lng: number;
  $hover?: any;
}

const Driver: React.FC<IDriverProps> = ({ id }) => (
  <div id={id} className="text-lg">
    🛵
  </div>
);

export const Dashboard = () => {
  const [driverCoords, setDriverCoords] = useState<ICoords>({ lat: 0, lng: 0 });
  const [map, setMap] = useState<google.maps.Map>();
  const [maps, setMaps] = useState<typeof google.maps>();

  useEffect(() => {
    navigator.geolocation.watchPosition(onSuccess, onError, {
      enableHighAccuracy: true,
    });
  }, []);

  useEffect(() => {
    if (map && maps) {
      map.panTo(new google.maps.LatLng(driverCoords.lat, driverCoords.lng));
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode(
        {
          location: new google.maps.LatLng(driverCoords.lat, driverCoords.lng),
        },
        (result, status) => {
          console.log(status, result);
        }
      );
    }
  }, [map, maps, driverCoords.lat, driverCoords.lng]);

  const onSuccess = ({
    coords: { latitude, longitude },
  }: GeolocationPosition) => {
    setDriverCoords({ lat: latitude, lng: longitude });
  };

  const onError = (error: GeolocationPositionError) => {
    console.log(error);
  };

  const onApiLoaded = (map: any, maps: any) => {
    map.panTo(new google.maps.LatLng(driverCoords.lat, driverCoords.lng));
    setMap(map);
    setMaps(maps);
  };

  return (
    <div>
      <div
        id="d"
        className="overflow-hidden"
        style={{ width: window.innerWidth, height: "50vh" }}
      >
        <GoogleMapReact
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_API_KEY || "" }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => onApiLoaded(map, maps)}
        >
          <Driver
            id="nuber-driver"
            lat={driverCoords.lat}
            lng={driverCoords.lng}
          />
        </GoogleMapReact>
      </div>
    </div>
  );
};
