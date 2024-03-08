import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { App } from "../app";
import { isLoggedInVar } from "src/apollo";

jest.mock("../../routers/logged-out-router", () => {
  return () => <span>logged-out</span>;
  // return {
  //   LoggedOutRouter: () => <span>logged-out</span>,
  // };
});
jest.mock("../../routers/logged-in-router", () => {
  return () => <span>logged-in</span>;
  // return {
  //   LoggedInRouter: () => <span>logged-in</span>,
  // };
});

describe("<App />", () => {
  it("renders LoggedOutRouter", () => {
    render(<App />);
    screen.getByText("logged-out");
  });
  it("renders LoggedInRouter", async () => {
    render(<App />);
    await waitFor(() => {
      isLoggedInVar(true);
    });
    screen.getByText("logged-in");
  });
});
