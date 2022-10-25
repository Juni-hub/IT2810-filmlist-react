describe('shows more information when clicking on a film', () => {
    beforeEach(() => {
      cy.visit('localhost:3000');
    })
  
    it('enables clicking', () => {
      cy.get('body').contains('After').click();
    })
  
    it('shows more information', () => {
      //ACTION
      cy.contains('After').click();
  
      //ASSERTION
      cy.contains('Genre').should('exist');
      cy.contains('Cast').should('exist');
    })
  
  })