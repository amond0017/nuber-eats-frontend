import { RenderResult, render, screen, waitFor } from "@testing-library/react";
import { Login } from "../login";
import { ApolloProvider } from "@apollo/client";
import { createMockClient } from "mock-apollo-client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

describe("<Login />", () => {
  let renderResult: RenderResult;
  beforeEach(async () => {
    await waitFor(() => {
      const mockedClient = createMockClient();
      // eslint-disable-next-line testing-library/no-wait-for-side-effects, testing-library/no-render-in-setup
      renderResult = render(
        <HelmetProvider>
          <Router>
            <ApolloProvider client={mockedClient}>
              <Login />
            </ApolloProvider>
          </Router>
        </HelmetProvider>
      );
    });
  });

  it("should render OK", async () => {
    await waitFor(() => {
      expect(document.title).toBe("Login | Nuber Eats");
    });
  });
  it("displays email validation error", async () => {
    const { debug } = renderResult;
    const email = screen.getByPlaceholderText(/email/i);

    // waitFor 에서 userEvent.type() 이 안먹혀서 act 사용함
    await waitFor(() => {
      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      userEvent.type(email, "this@@");
    });

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.type(email, "this@@");
    });

    // eslint-disable-next-line testing-library/no-debugging-utils
    // debug();

    // screen.getByText("Please enter a valid email");
    let errorMessage = screen.getByRole("alert");
    expect(errorMessage).toHaveTextContent(/please enter a valid email/i);

    await waitFor(() => {
      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      userEvent.clear(email);
    });
    // eslint-disable-next-line testing-library/no-debugging-utils
    debug();
  });
});
