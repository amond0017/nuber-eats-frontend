import { ApolloProvider } from "@apollo/client";
import { MockApolloClient, createMockClient } from "mock-apollo-client";
import { RenderResult, act, render, screen, waitFor } from "src/test-utils";
import { CREATE_ACCOUNT_MUTATION, CreateAccount } from "../create-account";
import userEvent from "@testing-library/user-event";
import { UserRole } from "src/__generated__/graphql";

// expect 해야하므로 밖으로 뻈음. jest.fn() 을 mock 밖에서 호출하려면 이것을 담고 있는 변수명의 접두어가 mock 이어야 한다.
const mockPush = jest.fn();

jest.mock("react-router-dom", () => {
  const realModule = jest.requireActual("react-router-dom");
  return {
    ...realModule,
    useNavigate: () => {
      return {
        push: mockPush,
      };
    },
  };
});

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

  it("renders validation errors", async () => {
    const email = screen.getByPlaceholderText(/email/i);
    const password = screen.getByPlaceholderText(/password/i);
    const button = screen.getByRole("button");

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.type(email, "wont@work");
    });
    let errorMessage = screen.getByRole("alert");
    expect(errorMessage).toHaveTextContent(/please enter a valid email/i);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.clear(email);
    });
    errorMessage = screen.getByRole("alert");
    expect(errorMessage).toHaveTextContent(/email is required/i);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.type(email, "working@email.com");
      await userEvent.click(button);
    });
    errorMessage = screen.getByRole("alert");
    expect(errorMessage).toHaveTextContent(/password is required/i);
  });

  it("submits mutation with form values", async () => {
    const email = screen.getByPlaceholderText(/email/i);
    const password = screen.getByPlaceholderText(/password/i);
    const button = screen.getByRole("button");
    const formData = {
      email: "working@email.com",
      password: "12",
      role: UserRole.Client,
    };

    const mockedLoginMutationResponse = jest.fn().mockResolvedValue({
      data: {
        createAccount: {
          ok: true,
          error: "mutation-error",
        },
      },
    });

    mockedClient.setRequestHandler(
      CREATE_ACCOUNT_MUTATION,
      mockedLoginMutationResponse
    );

    jest.spyOn(window, "alert").mockImplementation(() => null);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(() => {
      userEvent.type(email, formData.email);
      userEvent.type(password, formData.password);
      userEvent.click(button);
    });

    expect(mockedLoginMutationResponse).toHaveBeenCalledTimes(1);
    expect(mockedLoginMutationResponse).toHaveBeenCalledWith({
      createAccountInput: {
        email: formData.email,
        password: formData.password,
        role: formData.role,
      },
    });
    expect(window.alert).toHaveBeenCalledWith("Account Created! Log in now!");
    expect(mockPush).toHaveBeenCalledWith("/");
    const mutationError = screen.getByRole("alert");
    expect(mutationError).toHaveTextContent("mutation-error");
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
