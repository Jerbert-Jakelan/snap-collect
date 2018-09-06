describe('On Page Init', () => {
  //Jeremy
  it('Loads the page', () => {
    cy.visit('http://localhost:3000');
  });

  //Jeremy
  it('Can click public collections button', () => {
    cy.visit('http://localhost:3000/#/dashboard');
    cy.get('.pubColBtn')
      .click();

    cy.location().should((loc) => {
      expect(loc.hash).to.eq('#/PublicCollection')
    })
  });
});