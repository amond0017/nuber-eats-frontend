import { gql, useMutation } from "@apollo/client";
import { verifyEmail, verifyEmailVariables } from "@generated/verifyEmail";
import { useEffect } from "react";
import { useGetQueryParam } from "src/hooks/useGetQueryParam";

const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      ok
      error
    }
  }
`;

export const ConfirmEmail = () => {
  const [verifyEmail, { data, loading: verifyingEmail, error }] = useMutation<
    verifyEmail,
    verifyEmailVariables
  >(VERIFY_EMAIL_MUTATION);

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
      <h2 className="text-lg mb-1 font-medium">Confirming email...</h2>
      <h4 className="text-gray-700 text-sm">
        Please wait, don't close this page...
      </h4>
    </div>
  );
};
