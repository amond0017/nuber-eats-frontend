import { gql, useQuery } from "@apollo/client";
import { CategoryQuery, CategoryQueryVariables } from "@generated/graphql";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { Restaurant } from "src/components/restaurant";
import { SearchForm } from "src/components/search-form";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "src/fragments";
import { useRestaurants } from "src/hooks/useRestaurants";
import { toPascalCase } from "src/lib/common";

const CATEGORY_QUERY = gql`
  query category($input: CategoryInput!) {
    category(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
      category {
        ...CategoryParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

interface ICategoryParams {
  slug: string;
}

export const Category = () => {
  const [page, setPage] = useState(1);

  const restaurantsQuery = useRestaurants({ page });

  console.log("resQeury === ", restaurantsQuery);

  const { slug = "" } = useParams<ICategoryParams["slug"]>();
  const categoryQuery = useQuery<CategoryQuery, CategoryQueryVariables>(
    CATEGORY_QUERY,
    {
      variables: {
        input: {
          page,
          slug,
        },
      },
    }
  );

  useEffect(() => {
    setPage(1);
  }, [slug]);

  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);

  return (
    <div>
      <Helmet>
        <title>{toPascalCase(slug)} | Nuber Eats</title>
      </Helmet>

      <SearchForm />

      {!(categoryQuery.loading || restaurantsQuery.loading) && (
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
            {categoryQuery.data?.category.restaurants?.map((restaurant) => (
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
              Page {page} of {categoryQuery.data?.category?.totalPages}
            </span>
            {page !== categoryQuery.data?.category?.totalPages ? (
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
