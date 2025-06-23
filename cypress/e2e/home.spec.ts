describe('Home Page Flow', () => {
  beforeEach(() => {
    cy.visit('/home');
  });

  it('should display main metrics and charts', () => {
    cy.contains('Total de vendas no mês').should('be.visible');
    cy.contains('Meta do mês').should('be.visible');
    cy.contains('Leads contactados').should('be.visible');
    cy.contains('Valor de vendas no mês').should('be.visible');
  });
});