import { gql, useQuery } from "@apollo/client";
import {
  RestarantsPageQueryQuery,
  RestarantsPageQueryQueryVariables,
  RestaurantsInput,
} from "@generated/graphql";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "src/fragments";

interface IUseRestaurantsProps extends RestaurantsInput {}

const RESTAURANTS_QUERY = gql`
  query restarantsPageQuery($input: RestaurantsInput!) {
    allCategories {
      ok
      error
      categories {
        ...CategoryParts
      }
    }
    restaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

export const useRestaurants = ({ page }: IUseRestaurantsProps) => {
  return useQuery<RestarantsPageQueryQuery, RestarantsPageQueryQueryVariables>(
    RESTAURANTS_QUERY,
    {
      variables: {
        input: {
          page,
        },
      },
    }
  );
};
