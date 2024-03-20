import { gql, useQuery } from "@apollo/client";
import { CreateOrderItemInput } from "@generated/globalTypes";
import { restaurant, restaurantVariables } from "@generated/restaurant";
import React, { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { Dish } from "src/components/dish";
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from "src/fragments";

const RESTAURANT_QUERY = gql`
  query restaurant($input: RestaurantInput!) {
    restaurant(input: $input) {
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

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      ok
      error
    }
  }
`;

interface IRestaurantParams {
  id: string;
}

export const Restaurant = () => {
  const params = useParams<IRestaurantParams>();
  const [orderStarted, setOrderStarted] = useState(false);
  const [orderItems, setOrderItems] = useState<CreateOrderItemInput[]>([]);

  const { loading, data } = useQuery<restaurant, restaurantVariables>(
    RESTAURANT_QUERY,
    {
      variables: {
        input: {
          restaurantId: +params.id,
        },
      },
    }
  );

  const triggerStartOrder = () => {
    setOrderStarted(true);
  };

  const getItem = useCallback(
    (dishId: number) => orderItems.find((order) => order.dishId === dishId),
    [orderItems]
  );

  const isSelected = useCallback(
    (dishId: number) => Boolean(getItem(dishId)),
    [getItem]
  );

  const addItemToOrder = (dishId: number) => {
    if (isSelected(dishId)) {
      return;
    }
    setOrderItems((current) => [{ dishId }, ...current]);
  };

  const removeFromOrder = (dishId: number) => {
    setOrderItems((current) =>
      current.filter((order) => order.dishId !== dishId)
    );
  };

  const addOptionToItem = (dishId: number, option: any) => {
    if (!isSelected(dishId)) {
      return;
    }
    // 기존 item 삭제 후 option 적용된 새 아이템 추가. (state 를 mutate 하지 않기 위해)
    const oldItem = getItem(dishId);
    removeFromOrder(dishId);
    setOrderItems((current) => [
      { dishId, options: [...(oldItem?.options || []), option] },
      ...current,
    ]);
  };

  console.log(orderItems);

  return (
    <div>
      <div
        className="bg-gray-800 bg-center bg-cover py-48"
        style={{
          backgroundImage: `url(${data?.restaurant.restaurant?.coverImg})`,
        }}
      >
        <div className="bg-white w-3/12 py-8 pl-48">
          <h4 className="text-4xl mb-3">{data?.restaurant.restaurant?.name}</h4>
          <h5 className="text-sm font-light mb-2">
            {data?.restaurant.restaurant?.category?.name}
          </h5>
          <h6 className="text-sm font-light">
            {data?.restaurant.restaurant?.address}
          </h6>
        </div>
      </div>

      <div className="container pb-32 flex flex-col items-end mt-20">
        <button onClick={triggerStartOrder} className="btn px-10">
          {orderStarted ? "Ordering" : "Start Order"}
        </button>
        <div className="w-full grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
          {data?.restaurant.restaurant?.menu.map((dish) => (
            <Dish
              isSelected={isSelected(dish.id)}
              id={dish.id}
              orderStarted={orderStarted}
              key={dish.id}
              name={dish.name}
              description={dish.description}
              price={dish.price}
              isCustomer
              options={dish.options}
              addItemToOrder={addItemToOrder}
              removeFromOrder={removeFromOrder}
              addOptionToItem={addOptionToItem}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
