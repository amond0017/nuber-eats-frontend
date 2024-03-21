import { gql, useQuery } from "@apollo/client";
import { getOrder, getOrderVariables } from "@generated/getOrder";
import React from "react";
import { useParams } from "react-router-dom";

const GET_ORDER = gql`
  query getOrder($input: GetOrderInput!) {
    getOrder(input: $input) {
      ok
      error
      order {
        id
        status
        total
        driver {
          email
        }
        customer {
          email
        }
        restaurant {
          name
        }
      }
    }
  }
`;

interface IParams {
  id: string;
}

export const Order = () => {
  const params = useParams<IParams>();
  const { data } = useQuery<getOrder, getOrderVariables>(GET_ORDER, {
    variables: {
      input: {
        id: +params.id,
      },
    },
  });

  console.log(data);

  return <div>Order {params.id}</div>;
};
