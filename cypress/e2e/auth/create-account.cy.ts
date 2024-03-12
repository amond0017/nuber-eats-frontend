describe("Create Account", () => {
  const user = cy;
  it("should see email / password validation error", () => {
    user.visit("/");
    user.findByText(/create an account/i).click();
    user.findByPlaceholderText(/email/i).type("non@good");
    user.findByRole("alert").should("have.text", "Please enter a valid email");
    user.findByPlaceholderText(/email/i).clear();
    user.findByRole("alert").should("have.text", "Email is required");
    user.findByPlaceholderText(/email/i).type("real@email.com");
    user
      .findByPlaceholderText(/password/i)
      .type("a")
      .clear();
  });

  it("should be able to create account and login", () => {
    user.visit("/create-account");
    user.findByPlaceholderText(/email/i).type("333333@mail.com");
    user.findByPlaceholderText(/password/i).type("real@mail.com");
    user.findByRole("button").click();
    // cypress 속도가 너무 빠름. DB 작업 필요하므로 1000ms delay 를 줌.
    user.wait(1000);
    user.findByPlaceholderText(/email/i).type("333333@mail.com");
    user.findByPlaceholderText(/password/i).type("real@mail.com");
    user.findByRole("button").click();
    user.window().its("localStorage.nuber-token").should("be.a", "string");
  });
});
