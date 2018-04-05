describe('SelectionSort', function() {
  const click = 1
  const rows = 5
  const cols = 5
  const numberOfWaits = 1
  // ====================================
  context('Page', function() {
    beforeEach(function() {
      cy.visit(`http://localhost:3000?click=${click}&cols=${cols}&rows=${rows}`)
    })
    // ----------------------------------------------
    it('The <title> is correct', function() {
      cy.title().should('include', 'SelectionSort')
    })
  })

  // ====================================
  context('The Grid', function() {
    beforeEach(function() {
      cy.visit(`http://localhost:3000?click=${click}&cols=${cols}&rows=${rows}`)
    })

    // ----------------------------------------------
    it('There are the right number of cells', function() {
      cy.get('#root ul li').should('have.length', rows * cols)
    })

    // ----------------------------------------------
    it('The cells are in order...', function() {
      const bgCs = {}
      const someExtraTime = 7000
      const waitTime = click * numberOfWaits * (cols * rows) + someExtraTime
      cy
        .wait(waitTime)
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
