import { gql, useQuery } from "@apollo/client";
import {
  MyRestaurantsPageQueryQuery,
  MyRestaurantsPageQueryQueryVariables,
} from "@generated/graphql";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Restaurant } from "src/components/restaurant";
import { RESTAURANT_FRAGMENT } from "src/fragments";

export const MY_RESTAURANTS_QUERY = gql`
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
    MyRestaurantsPageQueryQuery,
    MyRestaurantsPageQueryQueryVariables
  >(MY_RESTAURANTS_QUERY, {
    variables: {
      input: {
        page,
      },
    },
  });

  return (
    <div>
      <Helmet>
        <title>My restaurants | Nuber Eats</title>
      </Helmet>
      <div className="max-w-screen-2xl mx-auto mt-32">
        <h2 className="text-4xl font-medium mb-10">My restaurants</h2>

        {data?.myRestaurants.ok && data.myRestaurants.results?.length === 0 ? (
          <>
            <h4 className="text-xl mb-5">You have no restaurants.</h4>
            <Link
              className="text-lime-600 hover:underline"
              to="/add-restaurant"
            >
              Create one &rarr;
            </Link>
          </>
        ) : (
          <>
            <div className="flex justify-end">
              <Link className="btn px-4" to="/add-restaurant">
                Create
              </Link>
            </div>
            <div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
              {data?.myRestaurants.results?.map((restaurant) => (
                <Restaurant
                  key={restaurant.id + ""}
                  id={restaurant.id + ""}
                  coverImg={restaurant.coverImg}
                  name={restaurant.name}
                  categoryName={restaurant.category?.name}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
