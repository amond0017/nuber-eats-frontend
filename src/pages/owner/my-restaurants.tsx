import { gql, useQuery } from "@apollo/client";
import {
  myRestaurantsPageQuery,
  myRestaurantsPageQueryVariables,
} from "@generated/myRestaurantsPageQuery";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { RESTAURANT_FRAGMENT } from "src/fragments";

const MY_RESTAURANTS_QUERY = gql`
  query myRestaurantsPageQuery($input: MyRestaurantsInput!) {
    myRestaurants(input: $input) {
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
`;

export const MyRestaurants = () => {
  const [page, setPage] = useState(1);

  const { data } = useQuery<
    myRestaurantsPageQuery,
    myRestaurantsPageQueryVariables
  >(MY_RESTAURANTS_QUERY, {
    variables: {
      input: {
        page,
      },
    },
  });

  console.log(data);

  return (
    <div>
      <Helmet>
        <title>My restaurants | Nuber Eats</title>
      </Helmet>
      <div className="max-w-screen-2xl mx-auto mt-32">
        <h2 className="text-4xl font-medium mb-10">My restaurants</h2>

        {data?.myRestaurants.ok && data.myRestaurants.results?.length === 0 && (
          <>
            <h4 className="">You have no restaurants.</h4>
            <Link
              className="text-lime-600 hover:underline"
              to="/add-restaurant"
            >
              Create one &rarr;
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
