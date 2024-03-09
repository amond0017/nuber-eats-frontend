import { render, screen } from "@testing-library/react";
import { Restaurant } from "../restaurant";
import { BrowserRouter as Router } from "react-router-dom";

describe("<Restaurant />", () => {
  it("renders OK with props", () => {
    const restaurantProps = {
      id: "1",
      coverImg: "x",
      name: "nameTest",
      categoryName: "catTest",
    };

    const { debug, container } = render(
      <Router>
        <Restaurant {...restaurantProps} />
      </Router>
    );

    // eslint-disable-next-line testing-library/no-debugging-utils
    // debug();

    screen.getByText(restaurantProps.name);
    screen.getByText(restaurantProps.categoryName);

    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toHaveAttribute(
      "href",
      `/restaurants/${restaurantProps.id}`
    );
  });
});
