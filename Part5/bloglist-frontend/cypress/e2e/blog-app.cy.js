describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'test user name',
      username: 'testUser',
      password: 'salainen'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('Login form is shown ex 5.17', function() {
    cy.get('html')
      .should('be.visible', 'Log in to application')
      .and('be.visible', 'login')

    cy.get('form#loginForm').should('be.visible')
    cy.get('input#userName').should('be.visible')
    cy.get('input#password').should('be.visible')
    cy.get('button#formSubmitButton').should('be.visible')
  })

  describe('Login ex 5.18', function() {
    it('succeeds with correct credentials', function(){
      cy.get('input#userName').type('testUser')
      cy.get('input#password').type('salainen')
      cy.get('button#formSubmitButton').click()

      cy.contains('test user name logged in').should('exist')
    })

    it('fails with wrong credentials', function(){
      cy.get('input#userName').type('wrong')
      cy.get('input#password').type('wrong')
      cy.get('button#formSubmitButton').click()

      cy.contains('test user name logged in').should('not.exist')
      cy.get('.err', { timeout: 2500 })
        .should('be.visible', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})