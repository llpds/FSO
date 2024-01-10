describe('Blog app', function () {
  const user = {
    name: 'test name',
    username: 'test',
    password: 'salainen',
  }

  const second = {
    name: 'second name',
    username: 'second',
    password: 'salainen',
  }

  const makeBlog = (number) => {
    return {
      title: `test Title${number}`,
      author: `test Author${number}`,
      url: `testUrl${number}.aa`,
      likes: number,
    }
  }

  const blogArr = [makeBlog(2), makeBlog(3), makeBlog(4), makeBlog(6)]
  const baseBlog = blogArr[1]

  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.createUser(user)
    cy.visit('')
  })

  it('Login form is shown ex 5.17', function () {
    cy.get('html')
      .should('be.visible', 'Log in to application')
      .and('be.visible', 'login')

    cy.get('form#loginForm').should('be.visible')
    cy.get('input#userName').should('be.visible')
    cy.get('input#password').should('be.visible')
    cy.get('button#formSubmitButton').should('be.visible')
  })

  describe('Login ex 5.18', function () {
    it('succeeds with correct credentials', function () {
      cy.get('input#userName').type(user.username)
      cy.get('input#password').type(user.password)
      cy.get('button#formSubmitButton').click()

      cy.contains(`${user.name} logged in`).should('exist')
    })

    it('fails with wrong credentials', function () {
      cy.get('input#userName').type('wrong')
      cy.get('input#password').type('wrong')
      cy.get('button#formSubmitButton').click()

      cy.contains(`${user.name} logged in`).should('not.exist')
      cy.get('.err')
        .should('be.visible', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.loginBack(user)
      blogArr.forEach((b) => cy.createBlog(b))
    })

    it('A blog can be created ex 5.19', function () {
      cy.request(`${Cypress.env('BACKEND')}/blogs`)
        .its('body')
        .should((blogs) => {
          const savedBlog = blogs.find((b) => b.title === baseBlog.title)
          expect(savedBlog.url).to.contain(baseBlog.url)
          expect(savedBlog.author).to.contain(baseBlog.author)
        })
    })

    it('Users can like a blog ex 5.20', function () {
      //cy.likeBlog(baseBlog, 1)
      cy.get(`#${baseBlog.title.replaceAll(' ', '')}`, { timeout: 15000 }).as(
        'theBlog'
      )
      cy.get('@theBlog').find('.blogVisibility').click()
      cy.get('@theBlog').find('button.likeButton').click()
      cy.get('@theBlog').contains(`likes: ${baseBlog.likes + 1}`)
    })

    it('User who create blog can delete it front ex 5.21', function () {
      cy.get(`#${baseBlog.title.replaceAll(' ', '')}`, { timeout: 15000 }).as(
        'theBlog'
      )
      cy.get('@theBlog').find('.blogVisibility').click()
      cy.get('@theBlog').find('button.removeButton').click()
      cy.get('@theBlog').should('not.exist')

      cy.get('.msg')
        .contains(`Blog ${baseBlog.title} removed`)
        .should('be.visible')
        .and('have.css', 'color', 'rgb(0, 128, 0)')

      cy.request(`${Cypress.env('BACKEND')}/blogs`)
        .its('body')
        .should((blogs) => {
          const deletedBlog = blogs.find((b) => b.title === baseBlog.title)
          expect(deletedBlog).to.be.undefined
        })
    })

    it('User who create blog can delete it back ex 5.21', function () {
      cy.request(`${Cypress.env('BACKEND')}/blogs`)
        .its('body')
        .then((blogs) => {
          const blogToDelete = blogs.find((b) => b.title === baseBlog.title)
          cy.request({
            url: `${Cypress.env('BACKEND')}/blogs/${blogToDelete.id}`,
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem('loggedUser')).token
              }`,
            },
          })

          cy.request(`${Cypress.env('BACKEND')}/blogs`)
            .its('body')
            .should((blogs) => {
              const deletedBlog = blogs.find((b) => b.title === baseBlog.title)
              expect(deletedBlog).to.be.undefined
            })
        })
    })

    it('Only user who create blog can see the delete button ex 5.22', function () {
      cy.createUser(second)

      cy.get(`#${baseBlog.title.replaceAll(' ', '')}`, { timeout: 10000 }).as(
        'theBlog'
      )
      cy.get('@theBlog').find('.blogVisibility').click()
      cy.get('@theBlog').find('button.removeButton').should('be.visible')

      cy.contains('Logout').click

      cy.loginBack(second)

      cy.get(`#${baseBlog.title.replaceAll(' ', '')}`, { timeout: 10000 }).as(
        'theBlog'
      )
      cy.get('@theBlog').find('.blogVisibility').click()
      cy.get('@theBlog').find('button.removeButton').should('not.exist')
    })

    it('blogs in descending order of likes ex 5.23', function () {
      cy.get('.blog', { timeout: 10000 })
        .eq(0)
        .should('contain', blogArr[3].title)
      cy.get('.blog').eq(1).should('contain', blogArr[2].title)
      cy.get('.blog').eq(2).should('contain', blogArr[1].title)
      cy.get('.blog').eq(3).should('contain', blogArr[0].title)

      cy.likeBlog(blogArr[0], 1)
      cy.likeBlog(blogArr[1], 5)
      cy.likeBlog(blogArr[2], 7)
      cy.likeBlog(blogArr[3], 3)

      cy.get('.blog').eq(0).should('contain', 'test Title4')
      cy.get('.blog').eq(1).should('contain', 'test Title6')
      cy.get('.blog').eq(2).should('contain', 'test Title3')
      cy.get('.blog').eq(3).should('contain', 'test Title2')
    })
  })
})
