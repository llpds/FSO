describe('Blog app', function() {

  const user = {
    name: 'test name',
    username: 'test',
    password: 'salainen'
  }

  const blog = {
    title:  'test Title1',
    author: 'test Author1',
    url:'testUrl1.aa',
    likes:34
  }

  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.createUser(user)
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
      cy.get('input#userName').type(user.username)
      cy.get('input#password').type(user.password)
      cy.get('button#formSubmitButton').click()

      cy.contains(`${user.name} logged in`).should('exist')
    })

    it('fails with wrong credentials', function(){
      cy.get('input#userName').type('wrong')
      cy.get('input#password').type('wrong')
      cy.get('button#formSubmitButton').click()

      cy.contains(`${user.name} logged in`).should('not.exist')
      cy.get('.err', { timeout: 2500 })
        .should('be.visible', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.loginBack(user)
    })

    it('A blog can be created ex 5.19', function() {
      cy.createBlog(blog)

      cy.request(`${Cypress.env('BACKEND')}/blogs`)
        .its('body').should((blogs) => {
          const savedBlog = blogs.find( b => b.title === blog.title)
          expect(savedBlog.url).to.contain(blog.url)
          expect(savedBlog.author).to.contain(blog.author)
        })
    })
  })
})