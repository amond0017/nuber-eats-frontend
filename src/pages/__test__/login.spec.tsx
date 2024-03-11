import { RenderResult, render, screen, waitFor } from "@testing-library/react";
import { LOGIN_MUTATION, Login } from "../login";
import { ApolloProvider } from "@apollo/client";
import { MockApolloClient, createMockClient } from "mock-apollo-client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

describe("<Login />", () => {
  let renderResult: RenderResult;
  let mockedClient: MockApolloClient;
  beforeEach(async () => {
    await waitFor(() => {
      mockedClient = createMockClient();
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
    // const { debug } = renderResult;
    const email = screen.getByPlaceholderText(/email/i);

    // waitFor 에서 userEvent.type() 이 안먹혀서 act 사용함
    // await waitFor(() => {
    //   // eslint-disable-next-line testing-library/no-wait-for-side-effects
    //   userEvent.type(email, "this@@");
    // });

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.type(email, "this@@");
    });

    let errorMessage = screen.getByRole("alert");
    expect(errorMessage).toHaveTextContent(/please enter a valid email/i);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.clear(email);
    });
    errorMessage = screen.getByRole("alert");
    expect(errorMessage).toHaveTextContent(/email is required/i);
  });

  it("displays password required errors", async () => {
    const { debug } = renderResult;
    const email = screen.getByPlaceholderText(/email/i);
    const submitBtn = screen.getByRole("button");

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      userEvent.type(email, "this@wont.com");
      userEvent.click(submitBtn);
    });
    // eslint-disable-next-line testing-library/no-debugging-utils
    debug();

    const errorMessage = screen.getByRole("alert");
    expect(errorMessage).toHaveTextContent(/password is required/i);
  });

  it("submits form and calls mutation", async () => {
    const { debug } = renderResult;
    const email = screen.getByPlaceholderText(/email/i);
    const password = screen.getByPlaceholderText(/password/i);
    const submitBtn = screen.getByRole("button");
    const formData = {
      email: "real@test.com",
      password: "123",
    };
    const mockedMutationResponse = jest.fn().mockResolvedValue({
      data: {
        login: {
          ok: true,
          token: "XXX",
          error: null,
        },
      },
    });
    mockedClient.setRequestHandler(LOGIN_MUTATION, mockedMutationResponse);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      userEvent.type(email, formData.email);
      userEvent.type(password, formData.password);
      userEvent.click(submitBtn);
    });

    expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
    expect(mockedMutationResponse).toHaveBeenCalledWith({
      loginInput: {
        email: formData.email,
        password: formData.password,
      },
    });
  });
});
