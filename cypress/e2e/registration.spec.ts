describe('Registration Flow', () => {
  it('should complete step 1 and step 2 and redirect to home', () => {
    cy.visit('/cadastro');
    // Step 1
    cy.get('input[name="name"]').type('Test User');
    cy.get('input[name="email"]').type('user@example.com');
    cy.get('input[name="password"]').type('Password123');
    cy.contains('Próximo').click();
    // Step 2
    cy.get('input[name="phone"]').type('1234567890');
    cy.get('input[name="company"]').type('Test Company');
    cy.contains('Finalizar Cadastro').click();
    cy.url().should('include', '/home');
  });
});