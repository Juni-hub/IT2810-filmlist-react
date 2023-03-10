describe('sorting', () => {
    beforeEach(() => {
      cy.visit('/');
    })
  
    it('displays sorting-option', () => {
      cy.get('#sort').should('contain.text','');
    })
  
    it('sorting works', () => {
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