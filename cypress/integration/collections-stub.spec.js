describe('Collections Stub Test', () => {
  it('Loads Collections', () => {
    cy.server();

    cy.route({
      method: 'GET',
      url: '/api/getProfile',
      response: "fixture:user"
    });

    cy.route({
      method: 'GET',
      url: '/api/collections',
      response: 'fixture:collections'
    });

    cy.visit('/#/dashboard');

    cy.get('[data-cy-collections]')
      .should('exist')
      .should('have.length', 3);
  });
});