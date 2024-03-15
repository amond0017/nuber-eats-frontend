import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { DISH_FRAGMENT } from "src/fragments";

const CREATE_DISH_MUTATION = gql`
  mutation createDish($input: CreateDishInput!) {
    createDish(input: $input) {
      ok
      error
    }
  }
`;

interface IParams {
  restaurantId: string;
}

export const AddDish = () => {
  const { restaurantId } = useParams<IParams>();
  const [createDishMutation, { loading }] = useMutation(CREATE_DISH_MUTATION);
  return <div>AddDish</div>;
};
