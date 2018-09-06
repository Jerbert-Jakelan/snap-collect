describe('Cards Stub Test', () => {
  //Jake
  it('Loads Cards', () => {
    cy.server();
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
    cy.visit('/#/collection/3');
    cy.selectAndType('[data-cy-card-name-input]', 'Jakey Wymes');
  });

  //Jake
  it('Allows Team Input', () => {
    cy.visit('/#/collection/3');
    cy.selectAndType('[data-cy-card-team-input]', 'Texas Rangers');
  });

  //Jake
  it('Allows Year Input', () => {
    cy.visit('/#/collection/3');
    cy.selectAndType('[data-cy-card-year-input]', '1994');
  });
});