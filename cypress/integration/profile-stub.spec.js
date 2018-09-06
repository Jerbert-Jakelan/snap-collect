describe("Collections Stub Test", () => {
  //Rob
  it('Can type name in edit profile', () => {
    cy.server();

    cy.route({
      method: "GET",
      url: "/api/getProfile",
      response: "fixture:user"
    });

    cy.visit("/#/dashboard");

    cy.get(".fa-pencil-alt").click();
    cy.selectAndType("#profileName", "Rob");
  });

  //Rob
  it('Can type city in edit profile', () => {
    cy.server();

    cy.route({
      method: "GET",
      url: "/api/getProfile",
      response: "fixture:user"
    });

    cy.visit("/#/dashboard");

    cy.get(".fa-pencil-alt").click();
    cy.selectAndType("#cityName", "Dallas");
  })

  //Jake
  it('Can type state in edit profile', () => {
    cy.server();

    cy.route({
      method: "GET",
      url: "/api/getProfile",
      response: "fixture:user"
    });

    cy.visit("/#/dashboard");

    cy.get(".fa-pencil-alt").click();
    cy.selectAndType("#stateName", "Texas");
  })
});
