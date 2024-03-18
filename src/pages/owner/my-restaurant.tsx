import { gql, useQuery } from "@apollo/client";
import { myRestaurant, myRestaurantVariables } from "@generated/myRestaurant";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { VictoryAxis, VictoryBar, VictoryChart } from "victory";

import { Dish } from "src/components/dish";
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from "src/fragments";

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
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
`;

interface IParams {
  id: string;
}

export const MyRestaurant = () => {
  const { id } = useParams<IParams>();
  const { data } = useQuery<myRestaurant, myRestaurantVariables>(
    MY_RESTAURANT_QUERY,
    {
      variables: {
        input: {
          id: +id,
        },
      },
    }
  );

  console.log(data);

  return (
    <div>
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
        <Link to={``} className="text-white bg-lime-700 py-3 px-10">
          Buy Promotion &rarr;
        </Link>
        <div className="mt-10">
          {data?.myRestaurant.restaurant?.menu.length === 0 ? (
            <h4 className="text-xl mb-5">Please upload a dish</h4>
          ) : (
            <div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
              {data?.myRestaurant.restaurant?.menu.map((dish) => (
                <Dish
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
          <div className="max-w-lg w-full mx-auto">
            <VictoryChart domainPadding={20}>
              <VictoryAxis
                label="Amount of Money"
                dependentAxis
                tickValues={[20, 30, 40, 50, 60]}
              />
              <VictoryAxis label="Days of Life" />
              <VictoryBar
                data={[
                  { x: 10, y: 20 },
                  { x: 20, y: 50 },
                  { x: 35, y: 60 },
                  { x: 45, y: 99 },
                ]}
              />
            </VictoryChart>
          </div>
        </div>
      </div>
    </div>
  );
};
