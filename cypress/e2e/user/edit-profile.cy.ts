describe("Edit Profile", () => {
  const user = cy;

  beforeEach(() => {
    user.login();
  });

  it("can go to /edit-profile using the header", () => {
    user.get('a[href="/edit-profile"]').click();
    user.title().should("eq", "Edit Profile | Nuber Eats");
  });

  it("can change email", () => {
    user.intercept("POST", "http://localhost:4000/graphql", (req) => {
      console.log(req.body);
      if (req.body?.operationName === "editProfile") {
        // @ts-ignore
        req.body?.variables?.input?.email = "user@user.com";
      }
    });
    user.visit("/edit-profile");
    user.findByPlaceholderText(/email/i).clear().type("new@nomadcoders.co");
    user.findByRole("button").click();
  });
});
