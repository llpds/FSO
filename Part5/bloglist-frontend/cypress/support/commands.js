Cypress.Commands.add('loginBack', ({ username, password }) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedUser', JSON.stringify(body))
    localStorage.setItem('sessionExpired', JSON.stringify({ 'date': Date.now() + 60*60*1000 }))
    cy.visit('')
  })
})

Cypress.Commands.add('createUser', (user) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
})

Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
  cy.request({
    url: `${Cypress.env('BACKEND')}/blogs`,
    method: 'POST',
    body: { title, author, url, likes },
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`
    }
  })

  cy.visit('')
})

Cypress.Commands.add('likeBlog', (blog, likes) => {
  cy.get(`#${blog.title.replaceAll(' ','')}`).as('theBlog')
  cy.get('@theBlog').find('.blogVisibility').click()
  for (let i= 1; i<=likes; i++){
    cy.get('@theBlog').find('button.likeButton').click()
    cy.get('@theBlog').contains(`likes: ${blog.likes + i}`)
  }
})