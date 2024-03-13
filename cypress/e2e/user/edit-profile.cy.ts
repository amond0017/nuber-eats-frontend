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
    user.visit("/edit-profile");
    user.findByPlaceholderText(/email/i).clear().type("new@nomadcoders.co");
    user.findByRole("button").click();
  });
});
