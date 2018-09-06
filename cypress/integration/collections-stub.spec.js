describe("Collections Stub Test", () => {
  //Harlan
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

  //Harlan
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

  //Harlan
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

  //Harlan
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

  //Harlan
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

  //Jeremy
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

  //Jeremy
  it("Soccer selection has proper value", () => {
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
      .select("Soccer")
      .should("have.value", "6");
  });

  //Jeremy
  it('Can input into public collections search', () => {
    cy.server();

    cy.route({
      method: "GET",
      url: "/api/getAllPublicCollections",
      response: "fixture:public-collections"
    });

    cy.visit("/#/PublicCollection");

    cy.selectAndType(".inputSearch", "SEARCHING");
  });

  //Rob
  it('Filters public collections correctly', () => {
    cy.server();

    cy.route({
      method: "GET",
      url: "/api/getAllPublicCollections",
      response: "fixture:public-collections"
    });

    cy.visit("/#/PublicCollection");

    cy.selectAndType(".inputSearch", "jakey");

    cy.get(".public-collection-wrap")
      .should("exist")
      .should("have.length", 1);
  });

  //Rob
  it('Can input into private collections search', () => {
    cy.server();

    cy.route({
      method: "GET",
      url: "/api/collections/1",
      response: "fixture:collections"
    });

    cy.route({
      method: "GET",
      url: "/api/getProfile",
      response: "fixure:user"
    });

    cy.route({
      method: "GET",
      url: "/api/cards/1",
      response: "fixture:cards"
    });

    cy.visit("/#/collection/1");

    cy.selectAndType(".inputSearch", "SEARCHING");
  });

  //Rob
  it('Filters private collections correctly', () => {
    cy.server();

    cy.route({
      method: "GET",
      url: "/api/collections/1",
      response: "fixture:collections"
    });

    cy.route({
      method: "GET",
      url: "/api/getProfile",
      response: "fixure:user"
    });

    cy.route({
      method: "GET",
      url: "/api/cards/1",
      response: "fixture:cards"
    });

    cy.visit("/#/collection/1");

    cy.selectAndType(".inputSearch", "bub");

    cy.get(".card-wrapper")
      .should("exist")
      .should("have.length", 1);
  });

});
