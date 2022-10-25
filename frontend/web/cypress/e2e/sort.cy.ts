describe('sort', () => {
    beforeEach(() => {
      cy.visit('localhost:3000');
    })
  
    it('displays a options for sorting', () => {
      cy.get('#sort').should('contain.text','');
    })
  
    it('enables sorting', () => {
      //ACTION
      cy.get('#sort').click();
      cy.contains('Descending').click();
  
      //ASSERTION
      cy.get('body').should('contain.text','2018');
  
      //ACTION
      cy.get('#sort').click();
      cy.contains('Ascending').click();
  
      //ASSERTION
      cy.get('body').should('contain.text','1900');
  
    })
  })