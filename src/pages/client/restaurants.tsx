import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { CategoryImage } from "src/components/category-image";
import { Restaurant } from "src/components/restaurant";
import { SearchForm } from "src/components/search-form";
import { useRestaurants } from "src/hooks/useRestaurants";

export const Restaurants = () => {
  const [page, setPage] = useState(1);
  const { data, loading } = useRestaurants({ page });

  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);

  return (
    <div>
      <Helmet>
        <title>Home | Nuber Eats</title>
      </Helmet>

      <SearchForm />

      {!loading && (
        <div className="max-w-screen-2xl pb-20 mx-auto mt-8">
          <div className="flex justify-around max-w-sm mx-auto">
            <Link to="/">
              <div className="flex flex-col group items-center cursor-pointer">
                <CategoryImage />
                <span className="mt-1 text-sm font-medium">전체</span>
              </div>
            </Link>
            {data?.allCategories.categories?.map((category) => (
              <Link to={`/category/${category.slug}`} key={category.slug}>
                <div className="flex flex-col group items-center cursor-pointer">
                  <CategoryImage coverImg={category.coverImg} />
                  <span className="mt-1 text-sm font-medium">
                    {category.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
            {data?.restaurants.results?.map((restaurant) => (
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
              Page {page} of {data?.restaurants.totalPages}
            </span>
            {page !== data?.restaurants.totalPages ? (
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
