/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MyRestaurantsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: myRestaurantsPageQuery
// ====================================================

export interface myRestaurantsPageQuery_myRestaurants_results_category {
  __typename: "Category";
  name: string;
}

export interface myRestaurantsPageQuery_myRestaurants_results {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  category: myRestaurantsPageQuery_myRestaurants_results_category | null;
  address: string;
  isPromoted: boolean;
}

export interface myRestaurantsPageQuery_myRestaurants {
  __typename: "MyRestaurantsOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  results: myRestaurantsPageQuery_myRestaurants_results[] | null;
}

export interface myRestaurantsPageQuery {
  myRestaurants: myRestaurantsPageQuery_myRestaurants;
}

export interface myRestaurantsPageQueryVariables {
  input: MyRestaurantsInput;
}
