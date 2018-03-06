describe('SelectionSort', function() {
  const click = 50
  const rows = 10
  const cols = 10
  const numberOfWaits = 1
  // ====================================================
  context('Page', function() {
    beforeEach(function() {
      cy.visit(`http://localhost:3000?click=${click}&cols=${cols}&rows=${rows}`)
    })
    // ----------------------------------------------------
    it('The <title> is correct', function() {
      cy.title().should('include', 'SelectionSort')
    })
  })

  // ====================================================
  context('The Grid', function() {
    beforeEach(function() {
      cy.visit(`http://localhost:3000?click=${click}&cols=${cols}&rows=${rows}`)
    })

    // ----------------------------------------------------
    it('There are the right number of cells', function() {
      cy.get('#root ul li').should('have.length', rows * cols)
    })

    // ----------------------------------------------------
    it('The cells are in order...', function() {
      const bgCs = {}
      const someExtraTime = 1000
      let waitTime = click * numberOfWaits * (cols * rows) + someExtraTime
      if (click === 0) {
        waitTime = 10 * (cols * rows)
      }
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
