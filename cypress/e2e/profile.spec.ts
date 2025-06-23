describe('Profile Flow', () => {
  beforeEach(() => {
    cy.visit('/perfil');
  });

  it('should load profile data and update user', () => {
    // Assuming profile fields are pre-filled
    cy.get('input[name="name"]').clear().type('Updated Name');
    cy.get('input[name="email"]').should('have.value', ''); // if empty, set value
    cy.get('input[name="email"]').clear().type('updated@example.com');
    cy.get('input[name="phone"]').clear().type('0987654321');
    cy.contains('Atualizar Perfil').click();
    cy.contains('Meu Perfil').should('be.visible');
  });
});