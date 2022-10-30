describe('add new film', () => {
  
    it('can add a new film', () => {
      //setting up interception to database
      const staticResponse = {
        "data": {
          "createPost": {
            "title": "Test",
            "year": null,
            "cast": [],
            "genres": []
          }
        }
      };
        
      cy.intercept('POST','http://localhost:4000/graphql', staticResponse)
    
      cy.visit('/');
      //ACTION
      cy.get('#addFilm').click();
      cy.contains('Title').type('{moveToStart} {downArrow} Test');

      //ASSERTION
      cy.contains('Create').click();
      cy.contains('Please input the title of the film!').should('not.exist');
    })
  
    it('disables adding new film when values are not valid', () => {
      cy.visit('/');

      //ACTION
      cy.get('#addFilm').click();
      cy.contains('Create').click();
  
      //ASSERTION
      cy.contains('Please input the title of the film!').should('exist');
    })
  })