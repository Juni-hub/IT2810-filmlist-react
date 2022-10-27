describe('filtering', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  it('displays filters', () => {
    cy.get('#search').should('contain.text','');
    cy.get('#genre').should('contain.text','');
    cy.get('#year').should('contain.text','');
  })

  it('filtering works', () => {
    //ACTION
    cy.get('#search').type('The {enter}');

    //ASSERTION
    cy.get('body').should('contain.text','The Enchanted Drawing');

    //ACTION
    cy.get('#year').click();
    cy.get('#year').type('2013{enter}');

    //ASSERTION
    cy.get('body').should('contain.text','2013');
    cy.get('body').should('not.contain.text','2012');

    //ACTION
    cy.get('#genre').click();
    cy.contains('Romance').click();

    //ASSERTION
    cy.get('body').should('contain.text','The Best Man Holiday');

  })
})
