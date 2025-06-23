describe('Login Flow', () => {
  it('should login and redirect to home', () => {
    cy.visit('/');
    cy.get('input[placeholder="Email"]').type('test@example.com');
    cy.get('input[placeholder="Senha"]').type('password123');
    cy.get('.login-btn').click();
    cy.url().should('include', '/home');
    cy.contains('Total de vendas no mês').should('be.visible');
  });
});