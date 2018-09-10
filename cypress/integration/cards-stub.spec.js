describe('Cards Stub Test', () => {
  //Jake
  it('Loads Cards', () => {
    cy.server();
    cy.route({
      method: "GET",
      url: "/api/getProfile",
      response: "fixure:user"
    });
    cy.route({
      method: 'GET',
      url: '/api/cards/3',
      response: "fixture:cards"
    });
    cy.visit('/#/collection/3');
    cy.get('[data-cy-cards]')
    .should('exist')
    .should('have.length', 3);
  });
  
  //Jake
  it('Allows Name Input', () => {
    cy.server();
    cy.route({
      method: "GET",
      url: "/api/collections/3",
      response: "fixture:collections"
    });
    cy.route({
      method: "GET",
      url: "/api/getProfile",
      response: "fixture:user"
    });
    cy.visit('/#/collection/3');
    cy.get('.collectionButton').click();
    cy.selectAndType('#itemName', 'Jakey Wymes');
  });

  //Jake
  it('Allows Team Input', () => {
    cy.server();
    cy.route({
      method: "GET",
      url: "/api/collections/3",
      response: "fixture:collections"
    });
    cy.route({
      method: "GET",
      url: "/api/getProfile",
      response: "fixture:user"
    });
    cy.visit('/#/collection/3');
    cy.get('.collectionButton').click();
    cy.selectAndType('#itemTeam', 'Texas Rangers');
  });

  //Jake
  it('Allows Year Input', () => {
    cy.server();
    cy.route({
      method: "GET",
      url: "/api/collections/3",
      response: "fixture:collections"
    });
    cy.route({
      method: "GET",
      url: "/api/getProfile",
      response: "fixture:user"
    });
    cy.visit('/#/collection/3');
    cy.get('.collectionButton').click();
    cy.selectAndType('#year', '1994');
  });
});