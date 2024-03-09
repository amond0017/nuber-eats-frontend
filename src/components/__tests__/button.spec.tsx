import React from "react";
import { render, screen } from "@testing-library/react";
import { Button } from "../button";

describe("<Button />", () => {
  it("should render OK with props", () => {
    render(<Button canClick={true} loading={false} actionText={`test`} />);

    screen.getByText("test");
  });
  it("should display loading", () => {
    const { debug, container } = render(
      <Button canClick={false} loading={true} actionText={`test`} />
    );

    // debug();
    screen.getByText("Loading...");

    // jest
    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toHaveClass("pointer-events-none");
  });
});
