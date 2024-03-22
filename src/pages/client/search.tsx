import { gql, useLazyQuery } from "@apollo/client";
import {
  SearchRestaurantQuery,
  SearchRestaurantQueryVariables,
} from "@generated/graphql";
import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Restaurant } from "src/components/restaurant";
import { SearchForm } from "src/components/search-form";
import { RESTAURANT_FRAGMENT } from "src/fragments";
import { useRestaurants } from "src/hooks/useRestaurants";

const SEARCH_RESTAURANT = gql`
  query searchRestaurant($input: SearchRestaurantInput!) {
    searchRestaurant(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

export const Search = () => {
  const location = useLocation();
  const history = useHistory();

  const [page, setPage] = useState(1);

  const restaurantsQuery = useRestaurants({ page });
  const [callQuery, { loading, data, called }] = useLazyQuery<
    SearchRestaurantQuery,
    SearchRestaurantQueryVariables
  >(SEARCH_RESTAURANT);

  const query = useMemo(() => location.search.split("?term=")[1], [location]);

  useEffect(() => {
    if (!query) {
      return history.replace("/");
    }
    setPage(1);

    callQuery({
      variables: {
        input: {
          page: 1,
          query,
        },
      },
    });
  }, [history, query]);

  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);

  return (
    <div>
      <Helmet>
        <title>Search - {query} | Nuber Eats</title>
      </Helmet>

      <SearchForm />

      {!(loading || restaurantsQuery.loading) && (
        <div className="max-w-screen-2xl pb-20 mx-auto mt-8">
          <div className="flex justify-around max-w-sm mx-auto">
            {restaurantsQuery.data?.allCategories.categories?.map(
              (category) => (
                <Link to={`/category/${category.slug}`} key={category.slug}>
                  <div className="flex flex-col group items-center cursor-pointer">
                    <div
                      className="w-16 h-16 bg-cover group-hover:bg-gray-100 rounded-full"
                      style={{ backgroundImage: `url(${category.coverImg})` }}
                    ></div>
                    <span className="mt-1 text-sm font-medium">
                      {category.name}
                    </span>
                  </div>
                </Link>
              )
            )}
          </div>

          <div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
            {data?.searchRestaurant.restaurants?.map((restaurant) => (
              <Restaurant
                key={restaurant.id + ""}
                id={restaurant.id + ""}
                coverImg={restaurant.coverImg}
                name={restaurant.name}
                categoryName={restaurant.category?.name}
              />
            ))}
          </div>
          <div className="grid grid-cols-3 text-center max-w-md items-center mx-auto mt-10">
            {page > 1 ? (
              <button
                onClick={onPrevPageClick}
                className="focus:outline-none text-2xl font-medium"
              >
                &larr;
              </button>
            ) : (
              <div></div>
            )}
            <span>
              Page {page} of {data?.searchRestaurant.totalPages}
            </span>
            {page !== data?.searchRestaurant.totalPages ? (
              <button
                onClick={onNextPageClick}
                className="focus:outline-none text-2xl font-medium"
              >
                &rarr;
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
