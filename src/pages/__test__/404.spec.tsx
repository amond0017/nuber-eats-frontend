import { render, waitFor } from "src/test-utils";
import { NotFound } from "../404";

describe("Not Found", () => {
  it("renders OK", async () => {
    render(<NotFound />);

    await waitFor(() => {
      expect(document.title).toBe("Not Found | Nuber Eats");
    });
  });
});
