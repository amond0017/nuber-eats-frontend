describe("First Test", () => {
  it("should go to homapage", () => {
    cy.visit("http://localhost:3000")
      .title()
      .should("eq", "Loginnnnnn | Nuber Eats");
  });
});
