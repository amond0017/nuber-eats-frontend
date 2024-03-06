import { gql, useQuery } from "@apollo/client";
import { category, categoryVariables } from "@generated/category";
import { useParams } from "react-router-dom";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "src/fragments";

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
  const params = useParams<ICategoryParams>();
  const { loading, data } = useQuery<category, categoryVariables>(
    CATEGORY_QUERY,
    {
      variables: {
        input: {
          page: 1,
          slug: params.slug,
        },
      },
    }
  );

  console.log(data);

  return <div>Category</div>;
};
