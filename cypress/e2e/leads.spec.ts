describe('Leads Flow', () => {
  beforeEach(() => {
    cy.visit('/leads');
  });

  it('should add and remove a lead', () => {
    // Add
    cy.get('input[name="name"]').type('Lead Test');
    cy.get('input[name="email"]').type('lead@test.com');
    cy.contains('Add Lead').click();
    cy.contains('Lead Test').should('be.visible');

    // Remove
    cy.get('button').contains('Delete').click();
    cy.contains('Lead Test').should('not.exist');
  });
});