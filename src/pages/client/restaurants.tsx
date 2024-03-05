import { gql, useQuery } from "@apollo/client";
import {
  restarantsPageQuery,
  restarantsPageQueryVariables,
} from "@generated/restarantsPageQuery";
import React from "react";

const RESTAURANTS_QUERY = gql`
  query restarantsPageQuery($input: RestaurantsInput!) {
    allCategories {
      ok
      error
      categories {
        id
        name
        coverImg
        slug
        restaurantCount
      }
    }
    restaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        id
        name
        coverImg
        category {
          name
        }
        address
        isPromoted
      }
    }
  }
`;

export const Restaurants = () => {
  const { data, loading, error } = useQuery<
    restarantsPageQuery,
    restarantsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page: 1,
      },
    },
  });

  return <h1>Restaurants</h1>;
};
