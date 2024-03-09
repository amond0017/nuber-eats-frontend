import { act, render, screen, waitFor } from "@testing-library/react";
import { Header } from "../header";
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter as Router } from "react-router-dom";
import { ME_QUERY } from "src/hooks/useMe";

describe("<Header />", () => {
  it("renders verify banner", async () => {
    const { debug } = render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: ME_QUERY,
            },
            result: {
              data: {
                me: {
                  id: 1,
                  email: "",
                  role: "",
                  verified: false,
                },
              },
            },
          },
        ]}
      >
        <Router>
          <Header />
        </Router>
      </MockedProvider>
    );

    await act(async () => {
      // 쿼리가 바로 실행되지 않으므로 async/await 를 걸어야 함
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // eslint-disable-next-line testing-library/no-debugging-utils
    // debug();

    screen.getByText("Please verify your email.");
  });

  it("renders without verify banner", async () => {
    const { debug } = render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: ME_QUERY,
            },
            result: {
              data: {
                me: {
                  id: 1,
                  email: "",
                  role: "",
                  verified: true,
                },
              },
            },
          },
        ]}
      >
        <Router>
          <Header />
        </Router>
      </MockedProvider>
    );

    await act(async () => {
      // 쿼리가 바로 실행되지 않으므로 async/await 를 걸어야 함
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // eslint-disable-next-line testing-library/no-debugging-utils
    // debug();

    // queryByText 는 찾는 텍스트가 없으면 null 을 반환함. 테스트가 실패하지 않음.
    expect(screen.queryByText("Please verify your email.")).toBeNull();
  });
});
