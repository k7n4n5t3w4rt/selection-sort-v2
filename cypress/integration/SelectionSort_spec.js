describe('SelectionSort', function() {
  const click = 5
  const rows = 10
  const cols = 10
  it('.should() - assert that <title> is correct', function() {
    // https://on.cypress.io/visit
    cy.visit(`http://localhost:3000?click=${click}&cols=${cols}&rows=${rows}`)
    cy.title().should('include', 'SelectionSort')
  })

  context('Traversal', function() {
    beforeEach(function() {
      cy.visit(`http://localhost:3000?click=${click}&cols=${cols}&rows=${rows}`)
    })
    it('.find() - get descendant DOM elements of the selector', function() {
      // https://on.cypress.io/find
      cy.get('#root ul li').should('have.length', rows * cols)
    })
    it('The cells are in order...', function() {
      const bgCs = {}
      const someExtraTime = click * 2 * (cols * rows)
      cy
        .wait(click * (cols * rows) + someExtraTime)
        .get('#root ul li')
        .then($cells => {
          $cells.each(i => {
            const colourValue = $cells[i].style.backgroundColor.match(
              /rgb\((\d+), \d+, \d+\)/
            )[1]
            bgCs[$cells[i].id] = parseInt(colourValue, 10)
          })
          let lastKey = ''
          Object.keys(bgCs).forEach(key => {
            if (lastKey !== '') {
              expect(bgCs[key]).to.be.lte(bgCs[lastKey])
            }
            lastKey = key
          })
        })
    })
  })
})
