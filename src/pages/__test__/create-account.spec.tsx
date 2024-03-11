import { ApolloProvider } from "@apollo/client";
import { MockApolloClient, createMockClient } from "mock-apollo-client";
import { RenderResult, act, render, waitFor } from "src/test-utils";
import { CreateAccount } from "../create-account";

describe("<CreateAccount />", () => {
  let mockedClient: MockApolloClient;
  let renderResult: RenderResult;
  beforeEach(async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      mockedClient = createMockClient();
      // eslint-disable-next-line testing-library/no-render-in-setup
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <CreateAccount />
        </ApolloProvider>
      );
    });
  });

  it("renders OK", async () => {
    await waitFor(() => {
      expect(document.title).toBe("Create Account | Nuber Eats");
    });
  });
});
