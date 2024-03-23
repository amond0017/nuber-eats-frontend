import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryTheme,
  VictoryVoronoiContainer,
} from "victory";

import {
  CreatePaymentMutation,
  CreatePaymentMutationVariables,
  MyRestaurantQuery,
  MyRestaurantQueryVariables,
  PendingOrdersSubscription,
} from "@generated/graphql";
import { initializePaddle, Paddle } from "@paddle/paddle-js";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Dish } from "src/components/dish";
import {
  DISH_FRAGMENT,
  FULL_ORDER_FRAGMENT,
  ORDERS_FRAGMENT,
  RESTAURANT_FRAGMENT,
} from "src/fragments";
import { useMe } from "src/hooks/useMe";

export const MY_RESTAURANT_QUERY = gql`
  query myRestaurant($input: MyRestaurantInput!) {
    myRestaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
        menu {
          ...DishParts
        }
        orders {
          ...OrderParts
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
  ${ORDERS_FRAGMENT}
`;

const CREATE_PAYMENT_MUTATION = gql`
  mutation createPayment($input: CreatePaymentInput!) {
    createPayment(input: $input) {
      ok
      error
    }
  }
`;

const PENDING_ORDERS_SUBSCRIPTION = gql`
  subscription pendingOrders {
    pendingOrders {
      ...FullOrderParts
    }
  }
  ${FULL_ORDER_FRAGMENT}
`;

interface IParams {
  id: string;
}

export const MyRestaurant = () => {
  const { id } = useParams<IParams>();
  const history = useHistory();
  const [paddle, setPaddle] = useState<Paddle>();

  const { data: userData } = useMe();

  const onCompleted = (data: CreatePaymentMutation) => {
    if (data.createPayment.ok) {
      alert("Your restaurant is being promoted!");
    }
  };
  const [createPaymentMutation, { loading }] = useMutation<
    CreatePaymentMutation,
    CreatePaymentMutationVariables
  >(CREATE_PAYMENT_MUTATION, {
    onCompleted,
  });

  const { data } = useQuery<MyRestaurantQuery, MyRestaurantQueryVariables>(
    MY_RESTAURANT_QUERY,
    {
      variables: {
        input: {
          id: +id,
        },
      },
    }
  );

  const { data: subscriptionData } = useSubscription<PendingOrdersSubscription>(
    PENDING_ORDERS_SUBSCRIPTION
  );

  useEffect(() => {
    // subscriptionData 를 바로 받을 수 없다. data 가 없을 수도 있고, 약간의 지연이 필요.
    if (subscriptionData?.pendingOrders.id) {
      const orderId = subscriptionData.pendingOrders.id;
      history.push(`/orders/${orderId}`);
    }
  }, [subscriptionData]);

  // Download and initialize Paddle instance from CDN
  useEffect(() => {
    initializePaddle({
      environment: "sandbox",
      token: "live_e3ad860b1786168d72e1973582b",
    }).then((paddleInstance: Paddle | undefined) => {
      if (paddleInstance) {
        setPaddle(paddleInstance);
      }
    });
  }, []);

  // Callback to open a checkout
  const triggerPaddle = () => {
    if (userData?.me.email) {
      paddle?.Checkout.open({
        items: [{ priceId: "pri_01hsb7vm5d7502t9n72fm4fpb6", quantity: 1 }],
      });

      // 성공 시 콜백 로직
      /* createPaymentMutation({
        variables: {
          input: {
            transactionId: "transactionId from paddle...",
            restaurantId: +id,
          },
        },
      }); */
    }
  };

  return (
    <div>
      <Helmet>
        <title>{data?.myRestaurant.restaurant?.name || "Loading..."}</title>
      </Helmet>
      <div className="checkout-container"></div>
      <div
        className="bg-gray-700 py-28 bg-center bg-cover"
        style={{
          backgroundImage: `url:(${data?.myRestaurant.restaurant?.coverImg})`,
        }}
      ></div>
      <div className="container mt-10">
        <h2 className="text-4xl font-medium mb-10">
          {data?.myRestaurant.restaurant?.name || "Loading..."}
        </h2>
        <Link
          to={`/restaurants/${id}/add-dish`}
          className="mr-8 text-white bg-gray-800 py-3 px-10"
        >
          Add Dish &rarr;
        </Link>
        <span
          onClick={triggerPaddle}
          className="cursor-pointer text-white bg-lime-700 py-3 px-10"
        >
          Buy Promotion &rarr;
        </span>
        <div className="mt-10">
          {data?.myRestaurant.restaurant?.menu.length === 0 ? (
            <h4 className="text-xl mb-5">Please upload a dish</h4>
          ) : (
            <div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
              {data?.myRestaurant.restaurant?.menu.map((dish) => (
                <Dish
                  key={dish.id}
                  name={dish.name}
                  description={dish.description}
                  price={dish.price}
                />
              ))}
            </div>
          )}
        </div>
        <div className="mt-20 mb-10">
          <h4 className="text-center text-2xl font-medium">Sales</h4>
          <div className="mx-auto">
            <VictoryChart
              theme={VictoryTheme.material}
              height={500}
              width={window.innerWidth}
              domainPadding={50}
              containerComponent={<VictoryVoronoiContainer />}
            >
              <VictoryLine
                labels={({ datum }) => `$${datum.y}`}
                labelComponent={
                  <VictoryLabel
                    style={{ fontSize: 18 }}
                    renderInPortal
                    dy={-20}
                  />
                }
                data={data?.myRestaurant.restaurant?.orders?.map((order) => ({
                  x: order.createdAt,
                  y: order.total,
                }))}
                interpolation="natural"
                style={{
                  data: {
                    strokeWidth: 5,
                  },
                }}
              />
              <VictoryAxis
                tickLabelComponent={<VictoryLabel renderInPortal />}
                style={{ tickLabels: { fontSize: 20 } }}
                tickFormat={(tick: any) =>
                  new Date(tick).toLocaleDateString("ko")
                }
              />
            </VictoryChart>
          </div>
        </div>
      </div>
    </div>
  );
};
