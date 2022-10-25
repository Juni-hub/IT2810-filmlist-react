describe('shows more information when clicking on a film', () => {
  
    it('shows more information', () => {
      cy.visit('/');

      //ACTION
      cy.contains('After').click();
  
      //ASSERTION
      cy.contains('Genre').should('exist');
      cy.contains('Cast').should('exist');
    })
  
  })