import { gql, useQuery } from "@apollo/client";
import { MeQueryQuery } from "@generated/graphql";

export const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      role
      verified
    }
  }
`;

export const useMe = () => {
  return useQuery<MeQueryQuery>(ME_QUERY);
};
