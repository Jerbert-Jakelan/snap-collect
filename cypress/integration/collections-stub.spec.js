describe("Collections Stub Test", () => {
  it("Loads Collections", () => {
    cy.server();

    cy.route({
      method: "GET",
      url: "/api/getProfile",
      response: "fixture:user"
    });

    cy.route({
      method: "GET",
      url: "/api/collections",
      response: "fixture:collections"
    });

    cy.visit("/#/dashboard");

    cy.get("[data-cy-collections]")
      .should("exist")
      .should("have.length", 3);
  });

  it("Main Input Works", () => {
    cy.server();

    cy.route({
      method: "GET",
      url: "/api/getProfile",
      response: "fixture:user"
    });

    cy.route({
      method: "GET",
      url: "/api/collections",
      response: "fixture:collections"
    });

    cy.visit("/#/dashboard");

    cy.get(".collectionButton").click();
    cy.selectAndType("#itemName", "NEW COLLECTION");
  });
  it("Description Input Works", () => {
    cy.server();

    cy.route({
      method: "GET",
      url: "/api/getProfile",
      response: "fixture:user"
    });

    cy.route({
      method: "GET",
      url: "/api/collections",
      response: "fixture:collections"
    });

    cy.visit("/#/dashboard");

    cy.get(".collectionButton").click();
    cy.selectAndType("#description", "NEW DESCRIPTION");
  });
  it("Hockey selection has proper value", () => {
    cy.server();

    cy.route({
      method: "GET",
      url: "/api/getProfile",
      response: "fixture:user"
    });

    cy.route({
      method: "GET",
      url: "/api/collections",
      response: "fixture:collections"
    });

    cy.visit("/#/dashboard");

    cy.get(".collectionButton").click();
    cy.get("select")
      .select("Hockey")
      .should("have.value", "4");
  });
  it("Baseball selection has proper value", () => {
    cy.server();

    cy.route({
      method: "GET",
      url: "/api/getProfile",
      response: "fixture:user"
    });

    cy.route({
      method: "GET",
      url: "/api/collections",
      response: "fixture:collections"
    });

    cy.visit("/#/dashboard");

    cy.get(".collectionButton").click();
    cy.get("select")
      .select("Baseball")
      .should("have.value", "2");
  });
  it("Football selection has proper value", () => {
    cy.server();

    cy.route({
      method: "GET",
      url: "/api/getProfile",
      response: "fixture:user"
    });

    cy.route({
      method: "GET",
      url: "/api/collections",
      response: "fixture:collections"
    });

    cy.visit("/#/dashboard");

    cy.get(".collectionButton").click();
    cy.get("select")
      .select("Football")
      .should("have.value", "3");
  });
});
