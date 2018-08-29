describe('Cards Stub Test', () => {
  it('Loads Cards', () => {
    cy.server();
    cy.route({
      method: 'GET',
      url: '/api/cards',
      response: "fixture:cards"
    });
    cy.visit('/');
    cy.get('[data-cy-cards]')
      .should('exist')
      .should('have.length', 3);
  });
});