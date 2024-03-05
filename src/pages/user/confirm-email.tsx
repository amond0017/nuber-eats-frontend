import { gql, useApolloClient, useMutation } from "@apollo/client";
import { verifyEmail, verifyEmailVariables } from "@generated/verifyEmail";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory } from "react-router-dom";
import { useGetQueryParam } from "src/hooks/useGetQueryParam";
import { useMe } from "src/hooks/useMe";

const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      ok
      error
    }
  }
`;

export const ConfirmEmail = () => {
  const { data: userData } = useMe();
  const client = useApolloClient(); // apollo client 불러오기
  const history = useHistory();
  const onCompleted = (data: verifyEmail) => {
    const {
      verifyEmail: { ok },
    } = data;
    if (ok && userData?.me.id) {
      client.writeFragment({
        // writeFragment
        id: `User:${userData.me.id}`,
        fragment: gql`
          fragment VerifiedUser on User {
            ## fragment <fragmentName(아무거나)> on <Type(graphQL 의 타입과 같아야 됨!)>
            verified ## 수정할 필드(fragment) 선언
          }
        `,
        data: {
          verified: true, // 수정할 데이터
        },
      });
      history.push("/");
    }
  };
  const [verifyEmail] = useMutation<verifyEmail, verifyEmailVariables>(
    VERIFY_EMAIL_MUTATION,
    {
      onCompleted,
    }
  );

  const query = useGetQueryParam();
  const code = query.get("code") || "";

  useEffect(() => {
    // const [_, code] = window.location.href.split("code="); // 이 방법도 있고 reac-router-dom hook 을 써도 됨.
    verifyEmail({
      variables: {
        input: {
          code,
        },
      },
    });
  }, []);

  return (
    <div className="mt-52 flex flex-col items-center justify-center">
      <Helmet>
        <title>Verify Email | Nuber Eats</title>
      </Helmet>
      <h2 className="text-lg mb-1 font-medium">Confirming email...</h2>
      <h4 className="text-gray-700 text-sm">
        Please wait, don't close this page...
      </h4>
    </div>
  );
};
