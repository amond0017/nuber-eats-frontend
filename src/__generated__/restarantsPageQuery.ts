/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RestaurantsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: restarantsPageQuery
// ====================================================

export interface restarantsPageQuery_allCategories_categories {
  __typename: "Category";
  id: number;
  name: string;
  coverImg: string | null;
  slug: string;
  restaurantCount: number;
}

export interface restarantsPageQuery_allCategories {
  __typename: "AllCategoriesOutput";
  ok: boolean;
  error: string | null;
  categories: restarantsPageQuery_allCategories_categories[] | null;
}

export interface restarantsPageQuery_restaurants_results_category {
  __typename: "Category";
  name: string;
}

export interface restarantsPageQuery_restaurants_results {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  category: restarantsPageQuery_restaurants_results_category | null;
  address: string;
  isPromoted: boolean;
}

export interface restarantsPageQuery_restaurants {
  __typename: "RestaurantsOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  results: restarantsPageQuery_restaurants_results[] | null;
}

export interface restarantsPageQuery {
  allCategories: restarantsPageQuery_allCategories;
  restaurants: restarantsPageQuery_restaurants;
}

export interface restarantsPageQueryVariables {
  input: RestaurantsInput;
}
