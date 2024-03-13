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
    // req intercept
    user.intercept("http://localhost:4000/graphql", (req) => {
      // console.log(req.body);
      const { operationName } = req.body;
      if (operationName && operationName === "createAccountMutation") {
        req.reply((res) => {
          res.send({
            data: {
              createAccount: {
                ok: true,
                error: null,
                __typename: "CreateAccountOutput",
              },
            },
          });
        });
      }
    });
    user.visit("/create-account");
    user.findByPlaceholderText(/email/i).type("user@user.com");
    user.findByPlaceholderText(/password/i).type("12345");
    user.findByRole("button").click();
    // cypress 속도가 너무 빠름. DB 작업 필요하므로 1000ms delay 를 줌.
    user.wait(1000);

    user.login();
  });
});
