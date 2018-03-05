//
// **** Kitchen Sink Tests ****
//
// This app was developed to demonstrate
// how to write tests in Cypress utilizing
// all of the available commands
//
// Feel free to modify this spec in your
// own application as a jumping off point

// Please read our "Introduction to Cypress"
// https://on.cypress.io/introduction-to-cypress

describe('Kitchen Sink', function() {
  it('.should() - assert that <title> is correct', function() {
    // https://on.cypress.io/visit
    cy.visit('http://localhost:3000?click=5&cols=4&rows=4')

    // Here we've made our first assertion using a '.should()' command.
    // An assertion is comprised of a chainer, subject, and optional value.

    // https://on.cypress.io/should
    // https://on.cypress.io/and

    // https://on.cypress.io/title
    cy.title().should('include', 'SelectionSort')
    //   ↲               ↲            ↲
    // subject        chainer      value
  })

  context('Traversal', function() {
    beforeEach(function() {
      cy.visit('http://localhost:3000?click=5&cols=4&rows=4')
    })

    // Let's query for some DOM elements and make assertions

    it('.find() - get descendant DOM elements of the selector', function() {
      // https://on.cypress.io/find
      cy.get('#root ul li').should('have.length', 16)
    })

    it('.first() - get first DOM element', function() {
      // https://on.cypress.io/first
      cy
        .get('#root ul li')
        .first()
        .should('contain', '1')
    })

    it('.last() - get last DOM element', function() {
      // https://on.cypress.io/last
      cy
        .get('.traversal-buttons .btn')
        .last()
        .should('contain', 'Submit')
    })
  })
})
