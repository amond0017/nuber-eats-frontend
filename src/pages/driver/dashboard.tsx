import { gql, useMutation, useSubscription } from "@apollo/client";
import {
  CookedOrdersSubscription,
  TakeOrderMutation,
  TakeOrderMutationVariables,
} from "@generated/graphql";
import GoogleMapReact from "google-map-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FULL_ORDER_FRAGMENT } from "src/fragments";

const COOKED_ORDERS_SUBSCRIPTION = gql`
  subscription cookedOrders {
    cookedOrders {
      ...FullOrderParts
    }
  }
  ${FULL_ORDER_FRAGMENT}
`;

const TAKE_ORDER_MUTATION = gql`
  mutation takeOrder($input: TakeOrderInput!) {
    takeOrder(input: $input) {
      ok
      error
    }
  }
`;

interface ICoords {
  lat: number;
  lng: number;
}

const defaultProps = {
  center: {
    lat: 35.22766130662256,
    lng: 128.88035452609756,
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
  const navigate = useNavigate();

  const [driverCoords, setDriverCoords] = useState<ICoords>({ lat: 0, lng: 0 });
  const [map, setMap] = useState<google.maps.Map>();
  const [maps, setMaps] = useState<typeof google.maps>();

  const { data: cookedOrdersData } = useSubscription<CookedOrdersSubscription>(
    COOKED_ORDERS_SUBSCRIPTION
  );

  const [takeOrderMutation] = useMutation<
    TakeOrderMutation,
    TakeOrderMutationVariables
  >(TAKE_ORDER_MUTATION);

  useEffect(() => {
    navigator.geolocation.watchPosition(onSuccess, onError, {
      enableHighAccuracy: true,
    });
  }, []);

  useEffect(() => {
    if (cookedOrdersData?.cookedOrders.id) {
      makeRoute();
    }
  }, [cookedOrdersData]);

  useEffect(() => {
    if (map && maps) {
      //map.panTo(new google.maps.LatLng(driverCoords.lat, driverCoords.lng));
      // const geocoder = new google.maps.Geocoder();
      // geocoder.geocode(
      //   {
      //     location: new google.maps.LatLng(driverCoords.lat, driverCoords.lng),
      //   },
      //   (result, status) => {
      //     console.log(status, result);
      //   }
      // );
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

  const makeRoute = () => {
    if (map) {
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer({
        polylineOptions: {
          strokeColor: "#000",
          strokeOpacity: 1,
          strokeWeight: 5,
        },
      });

      directionsRenderer.setMap(map);
      directionsService.route(
        {
          travelMode: google.maps.TravelMode.DRIVING,
          origin: {
            location: new google.maps.LatLng(
              driverCoords.lat,
              driverCoords.lng
            ),
          },
          destination: {
            location: new google.maps.LatLng(
              driverCoords.lat + 0.008,
              driverCoords.lng + 0.008
            ),
          },
        },
        (result, status) => {
          console.log(status, result);
          directionsRenderer.setDirections(result);
        }
      );
    }
  };

  const onGetCenterClick = () => {
    if (map) {
      console.log(
        "getCenter === ",
        map.getCenter()?.lat(),
        map.getCenter()?.lng()
      );
    }
  };

  const onAcceptChallengeClick = (id: number) => {
    takeOrderMutation({
      variables: {
        input: {
          id,
        },
      },
      onCompleted: (data: TakeOrderMutation) => {
        if (data.takeOrder.ok) {
          navigate(`/orders/${id}`);
        }
      },
    });
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
        ></GoogleMapReact>
      </div>
      <div className="max-w-screen-sm mx-auto bg-white relative -top-10 shadow-lg py-8 px-5">
        {cookedOrdersData?.cookedOrders.restaurant ? (
          <>
            <h1 className="text-center text-3xl font-medium">
              New Cooked Order
            </h1>
            <h1 className="text-center my-3 text-2xl font-medium">
              Pick it up soon @ {cookedOrdersData.cookedOrders.restaurant.name}
            </h1>
            <button
              onClick={() =>
                onAcceptChallengeClick(cookedOrdersData.cookedOrders.id)
              }
              className="btn w-full mt-5"
            >
              Accept Challenge &rarr;
            </button>
          </>
        ) : (
          <h1 className="text-center text-3xl font-medium">No orders yet...</h1>
        )}
      </div>
      <div className="" style={{ display: "none" }}>
        <button
          className="bg-blue-700 mx-3 p-2 border-2 border-black text-white"
          onClick={makeRoute}
        >
          Get route
        </button>
        <button
          className="bg-blue-700 mx-3 p-2 border-2 border-black text-white"
          onClick={onGetCenterClick}
        >
          Get center
        </button>
      </div>
    </div>
  );
};
