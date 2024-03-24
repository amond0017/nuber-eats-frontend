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

interface IDriverIcon extends React.HTMLAttributes<HTMLElement> {
  // lat?: number;
  // lng?: number;
}

const DriverIcon: React.FC<IDriverIcon> = ({ ...props }) => (
  <div {...props}>🛵</div>
);

export const Dashboard = () => {
  const [driverCoords, setDriverCoords] = useState<ICoords>({ lat: 0, lng: 0 });
  const [map, setMap] = useState<any>();
  const [maps, setMaps] = useState<any>();

  useEffect(() => {
    navigator.geolocation.watchPosition(onSuccess, onError, {
      enableHighAccuracy: true,
    });
  }, []);

  useEffect(() => {
    if (map && maps) {
      map.panTo(new maps.LatLng(driverCoords.lat, driverCoords.lng));
    }
  }, [map, maps, driverCoords.lat, driverCoords.lng]);

  const onSuccess = ({
    coords: { latitude, longitude },
  }: GeolocationPosition) => {
    // console.log("onSuccess callback ::: ", latitude, longitude);
    setDriverCoords({ lat: latitude, lng: longitude });
  };

  const onError = (error: GeolocationPositionError) => {
    console.log("error!!!", error);
  };

  const onApiLoaded = (map: any, maps: any) => {
    map.panTo(new maps.LatLng(driverCoords.lat, driverCoords.lng));
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
          <DriverIcon
            id="nuber-driver"
            className="text-lg"
            // @ts-ignore // 35.2260042 128.8669308
            lat={35.22}
            lng={128.87}
          />
        </GoogleMapReact>
      </div>
    </div>
  );
};
