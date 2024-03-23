/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  fragment RestaurantParts on Restaurant {\n    id\n    name\n    coverImg\n    category {\n      name\n    }\n    address\n    isPromoted\n  }\n": types.RestaurantPartsFragmentDoc,
    "\n  fragment CategoryParts on Category {\n    id\n    name\n    coverImg\n    slug\n    restaurantCount\n  }\n": types.CategoryPartsFragmentDoc,
    "\n  fragment DishParts on Dish {\n    id\n    name\n    price\n    photo\n    description\n    options {\n      name\n      extra\n      choices {\n        name\n        extra\n      }\n    }\n  }\n": types.DishPartsFragmentDoc,
    "\n  fragment OrderParts on Order {\n    id\n    createdAt\n    total\n  }\n": types.OrderPartsFragmentDoc,
    "\n  fragment FullOrderParts on Order {\n    id\n    status\n    total\n    driver {\n      email\n    }\n    customer {\n      email\n    }\n    restaurant {\n      name\n    }\n  }\n": types.FullOrderPartsFragmentDoc,
    "\n  query meQuery {\n    me {\n      id\n      email\n      role\n      verified\n    }\n  }\n": types.MeQueryDocument,
    "\n  query restarantsPageQuery($input: RestaurantsInput!) {\n    allCategories {\n      ok\n      error\n      categories {\n        ...CategoryParts\n      }\n    }\n    restaurants(input: $input) {\n      ok\n      error\n      totalPages\n      totalResults\n      results {\n        ...RestaurantParts\n      }\n    }\n  }\n  \n  \n": types.RestarantsPageQueryDocument,
    "\n  query category($input: CategoryInput!) {\n    category(input: $input) {\n      ok\n      error\n      totalPages\n      totalResults\n      restaurants {\n        ...RestaurantParts\n      }\n      category {\n        ...CategoryParts\n      }\n    }\n  }\n  \n  \n": types.CategoryDocument,
    "\n  \n  \n  query restaurant($input: RestaurantInput!) {\n    restaurant(input: $input) {\n      ok\n      error\n      restaurant {\n        ...RestaurantParts\n        menu {\n          ...DishParts\n        }\n      }\n    }\n  }\n": types.RestaurantDocument,
    "\n  mutation createOrder($input: CreateOrderInput!) {\n    createOrder(input: $input) {\n      ok\n      orderId\n      error\n    }\n  }\n": types.CreateOrderDocument,
    "\n  query searchRestaurant($input: SearchRestaurantInput!) {\n    searchRestaurant(input: $input) {\n      ok\n      error\n      totalPages\n      totalResults\n      restaurants {\n        ...RestaurantParts\n      }\n    }\n  }\n  \n": types.SearchRestaurantDocument,
    "\n  mutation createAccountMutation($createAccountInput: CreateAccountInput!) {\n    createAccount(input: $createAccountInput) {\n      ok\n      error\n    }\n  }\n": types.CreateAccountMutationDocument,
    "\n  mutation loginMutation($loginInput: LoginInput!) {\n    login(input: $loginInput) {\n      ok\n      token\n      error\n    }\n  }\n": types.LoginMutationDocument,
    "\n  query getOrder($input: GetOrderInput!) {\n    getOrder(input: $input) {\n      ok\n      error\n      order {\n        ...FullOrderParts\n      }\n    }\n  }\n  \n": types.GetOrderDocument,
    "\n  subscription orderUpdates($input: OrderUpdatesInput!) {\n    orderUpdates(input: $input) {\n      ...FullOrderParts\n    }\n  }\n  \n": types.OrderUpdatesDocument,
    "\n  mutation editOrder($input: EditOrderInput!) {\n    editOrder(input: $input) {\n      ok\n      error\n    }\n  }\n": types.EditOrderDocument,
    "\n  mutation createDish($input: CreateDishInput!) {\n    createDish(input: $input) {\n      ok\n      error\n    }\n  }\n": types.CreateDishDocument,
    "\n  mutation createRestaurant($input: CreateRestaurantInput!) {\n    createRestaurant(input: $input) {\n      error\n      ok\n      restaurantId\n    }\n  }\n": types.CreateRestaurantDocument,
    "\n  query myRestaurant($input: MyRestaurantInput!) {\n    myRestaurant(input: $input) {\n      ok\n      error\n      restaurant {\n        ...RestaurantParts\n        menu {\n          ...DishParts\n        }\n        orders {\n          ...OrderParts\n        }\n      }\n    }\n  }\n  \n  \n  \n": types.MyRestaurantDocument,
    "\n  mutation createPayment($input: CreatePaymentInput!) {\n    createPayment(input: $input) {\n      ok\n      error\n    }\n  }\n": types.CreatePaymentDocument,
    "\n  subscription pendingOrders {\n    pendingOrders {\n      ...FullOrderParts\n    }\n  }\n  \n": types.PendingOrdersDocument,
    "\n  query myRestaurantsPageQuery($input: MyRestaurantsInput!) {\n    myRestaurants(input: $input) {\n      ok\n      error\n      totalPages\n      totalResults\n      results {\n        ...RestaurantParts\n      }\n    }\n  }\n  \n": types.MyRestaurantsPageQueryDocument,
    "\n  mutation verifyEmail($input: VerifyEmailInput!) {\n    verifyEmail(input: $input) {\n      ok\n      error\n    }\n  }\n": types.VerifyEmailDocument,
    "\n          fragment VerifiedUser on User {\n            ## fragment <fragmentName(아무거나)> on <Type(graphQL 의 타입과 같아야 됨!)>\n            verified ## 수정할 필드(fragment) 선언\n          }\n        ": types.VerifiedUserFragmentDoc,
    "\n  mutation editProfile($input: EditProfileInput!) {\n    editProfile(input: $input) {\n      ok\n      error\n    }\n  }\n": types.EditProfileDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment RestaurantParts on Restaurant {\n    id\n    name\n    coverImg\n    category {\n      name\n    }\n    address\n    isPromoted\n  }\n"): (typeof documents)["\n  fragment RestaurantParts on Restaurant {\n    id\n    name\n    coverImg\n    category {\n      name\n    }\n    address\n    isPromoted\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment CategoryParts on Category {\n    id\n    name\n    coverImg\n    slug\n    restaurantCount\n  }\n"): (typeof documents)["\n  fragment CategoryParts on Category {\n    id\n    name\n    coverImg\n    slug\n    restaurantCount\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment DishParts on Dish {\n    id\n    name\n    price\n    photo\n    description\n    options {\n      name\n      extra\n      choices {\n        name\n        extra\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment DishParts on Dish {\n    id\n    name\n    price\n    photo\n    description\n    options {\n      name\n      extra\n      choices {\n        name\n        extra\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment OrderParts on Order {\n    id\n    createdAt\n    total\n  }\n"): (typeof documents)["\n  fragment OrderParts on Order {\n    id\n    createdAt\n    total\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment FullOrderParts on Order {\n    id\n    status\n    total\n    driver {\n      email\n    }\n    customer {\n      email\n    }\n    restaurant {\n      name\n    }\n  }\n"): (typeof documents)["\n  fragment FullOrderParts on Order {\n    id\n    status\n    total\n    driver {\n      email\n    }\n    customer {\n      email\n    }\n    restaurant {\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query meQuery {\n    me {\n      id\n      email\n      role\n      verified\n    }\n  }\n"): (typeof documents)["\n  query meQuery {\n    me {\n      id\n      email\n      role\n      verified\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query restarantsPageQuery($input: RestaurantsInput!) {\n    allCategories {\n      ok\n      error\n      categories {\n        ...CategoryParts\n      }\n    }\n    restaurants(input: $input) {\n      ok\n      error\n      totalPages\n      totalResults\n      results {\n        ...RestaurantParts\n      }\n    }\n  }\n  \n  \n"): (typeof documents)["\n  query restarantsPageQuery($input: RestaurantsInput!) {\n    allCategories {\n      ok\n      error\n      categories {\n        ...CategoryParts\n      }\n    }\n    restaurants(input: $input) {\n      ok\n      error\n      totalPages\n      totalResults\n      results {\n        ...RestaurantParts\n      }\n    }\n  }\n  \n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query category($input: CategoryInput!) {\n    category(input: $input) {\n      ok\n      error\n      totalPages\n      totalResults\n      restaurants {\n        ...RestaurantParts\n      }\n      category {\n        ...CategoryParts\n      }\n    }\n  }\n  \n  \n"): (typeof documents)["\n  query category($input: CategoryInput!) {\n    category(input: $input) {\n      ok\n      error\n      totalPages\n      totalResults\n      restaurants {\n        ...RestaurantParts\n      }\n      category {\n        ...CategoryParts\n      }\n    }\n  }\n  \n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  \n  \n  query restaurant($input: RestaurantInput!) {\n    restaurant(input: $input) {\n      ok\n      error\n      restaurant {\n        ...RestaurantParts\n        menu {\n          ...DishParts\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  \n  \n  query restaurant($input: RestaurantInput!) {\n    restaurant(input: $input) {\n      ok\n      error\n      restaurant {\n        ...RestaurantParts\n        menu {\n          ...DishParts\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createOrder($input: CreateOrderInput!) {\n    createOrder(input: $input) {\n      ok\n      orderId\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation createOrder($input: CreateOrderInput!) {\n    createOrder(input: $input) {\n      ok\n      orderId\n      error\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query searchRestaurant($input: SearchRestaurantInput!) {\n    searchRestaurant(input: $input) {\n      ok\n      error\n      totalPages\n      totalResults\n      restaurants {\n        ...RestaurantParts\n      }\n    }\n  }\n  \n"): (typeof documents)["\n  query searchRestaurant($input: SearchRestaurantInput!) {\n    searchRestaurant(input: $input) {\n      ok\n      error\n      totalPages\n      totalResults\n      restaurants {\n        ...RestaurantParts\n      }\n    }\n  }\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createAccountMutation($createAccountInput: CreateAccountInput!) {\n    createAccount(input: $createAccountInput) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation createAccountMutation($createAccountInput: CreateAccountInput!) {\n    createAccount(input: $createAccountInput) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation loginMutation($loginInput: LoginInput!) {\n    login(input: $loginInput) {\n      ok\n      token\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation loginMutation($loginInput: LoginInput!) {\n    login(input: $loginInput) {\n      ok\n      token\n      error\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getOrder($input: GetOrderInput!) {\n    getOrder(input: $input) {\n      ok\n      error\n      order {\n        ...FullOrderParts\n      }\n    }\n  }\n  \n"): (typeof documents)["\n  query getOrder($input: GetOrderInput!) {\n    getOrder(input: $input) {\n      ok\n      error\n      order {\n        ...FullOrderParts\n      }\n    }\n  }\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription orderUpdates($input: OrderUpdatesInput!) {\n    orderUpdates(input: $input) {\n      ...FullOrderParts\n    }\n  }\n  \n"): (typeof documents)["\n  subscription orderUpdates($input: OrderUpdatesInput!) {\n    orderUpdates(input: $input) {\n      ...FullOrderParts\n    }\n  }\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation editOrder($input: EditOrderInput!) {\n    editOrder(input: $input) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation editOrder($input: EditOrderInput!) {\n    editOrder(input: $input) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createDish($input: CreateDishInput!) {\n    createDish(input: $input) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation createDish($input: CreateDishInput!) {\n    createDish(input: $input) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createRestaurant($input: CreateRestaurantInput!) {\n    createRestaurant(input: $input) {\n      error\n      ok\n      restaurantId\n    }\n  }\n"): (typeof documents)["\n  mutation createRestaurant($input: CreateRestaurantInput!) {\n    createRestaurant(input: $input) {\n      error\n      ok\n      restaurantId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query myRestaurant($input: MyRestaurantInput!) {\n    myRestaurant(input: $input) {\n      ok\n      error\n      restaurant {\n        ...RestaurantParts\n        menu {\n          ...DishParts\n        }\n        orders {\n          ...OrderParts\n        }\n      }\n    }\n  }\n  \n  \n  \n"): (typeof documents)["\n  query myRestaurant($input: MyRestaurantInput!) {\n    myRestaurant(input: $input) {\n      ok\n      error\n      restaurant {\n        ...RestaurantParts\n        menu {\n          ...DishParts\n        }\n        orders {\n          ...OrderParts\n        }\n      }\n    }\n  }\n  \n  \n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createPayment($input: CreatePaymentInput!) {\n    createPayment(input: $input) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation createPayment($input: CreatePaymentInput!) {\n    createPayment(input: $input) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription pendingOrders {\n    pendingOrders {\n      ...FullOrderParts\n    }\n  }\n  \n"): (typeof documents)["\n  subscription pendingOrders {\n    pendingOrders {\n      ...FullOrderParts\n    }\n  }\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query myRestaurantsPageQuery($input: MyRestaurantsInput!) {\n    myRestaurants(input: $input) {\n      ok\n      error\n      totalPages\n      totalResults\n      results {\n        ...RestaurantParts\n      }\n    }\n  }\n  \n"): (typeof documents)["\n  query myRestaurantsPageQuery($input: MyRestaurantsInput!) {\n    myRestaurants(input: $input) {\n      ok\n      error\n      totalPages\n      totalResults\n      results {\n        ...RestaurantParts\n      }\n    }\n  }\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation verifyEmail($input: VerifyEmailInput!) {\n    verifyEmail(input: $input) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation verifyEmail($input: VerifyEmailInput!) {\n    verifyEmail(input: $input) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n          fragment VerifiedUser on User {\n            ## fragment <fragmentName(아무거나)> on <Type(graphQL 의 타입과 같아야 됨!)>\n            verified ## 수정할 필드(fragment) 선언\n          }\n        "): (typeof documents)["\n          fragment VerifiedUser on User {\n            ## fragment <fragmentName(아무거나)> on <Type(graphQL 의 타입과 같아야 됨!)>\n            verified ## 수정할 필드(fragment) 선언\n          }\n        "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation editProfile($input: EditProfileInput!) {\n    editProfile(input: $input) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation editProfile($input: EditProfileInput!) {\n    editProfile(input: $input) {\n      ok\n      error\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;