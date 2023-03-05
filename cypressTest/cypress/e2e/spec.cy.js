/* describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
}) */

describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:5050') 
  })
})