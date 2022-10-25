describe('add new film', () => {
    beforeEach(() => {
      cy.visit('localhost:3000');
    })
  
    it('enables adding new film', () => {
      //setting up mock-request
      cy.intercept('../queries/filmQueries').as('mockQuery')
      
      //ACTION
      cy.get('#addFilm').click();
      cy.contains('Title').type('{moveToStart} {downArrow} Test');

      //ASSERTION
      cy.contains('Create').click();
      cy.contains('Please input the title of the film!').should('not.exist');
    })
  
    it('disables adding new film when values are not valid', () => {
      //ACTION
      cy.get('#addFilm').click();
      cy.contains('Create').click();
  
      //ASSERTION
      cy.contains('Please input the title of the film!').should('exist');
    })
  })