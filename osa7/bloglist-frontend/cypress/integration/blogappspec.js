describe('Blog ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test User 1',
      username: 'user1',
      password: 'user1'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened', function() {
    cy.contains('BlogApp')
  })
  it('user can login', function() {
    cy.get('#username')
      .type('user1')
    cy.get('#password')
      .type('user1')
    cy.contains('login')
      .click()
    cy.contains('Test User 1')
  })
  describe('when logged in', function() {
    beforeEach(function() {
      cy.get('#username')
        .type('user1')
      cy.get('#password')
        .type('user1')
      cy.contains('login')
        .click()
      cy.contains('Test User 1')
    })
    it('a new blog can be created', function() {
      cy.contains('new blog')
        .click()
      cy.get('#title')
        .type('Cypress title')
      cy.get('#author')
        .type('Cypress author')
      cy.get('#url')
        .type('Cypress url')
      cy.contains('submit')
        .click()
      cy.contains('a new blog Cypress title by Cypress author added')
    })
    describe('and a blog has been created', function() {
      beforeEach(function() {
        cy.contains('new blog')
          .click()
        cy.get('#title')
          .type('Cypress title')
        cy.get('#author')
          .type('Cypress author')
        cy.get('#url')
          .type('Cypress url')
        cy.contains('submit')
          .click()
        cy.contains('a new blog Cypress title by Cypress author added')
      })
      it('a blog can be liked', function() {
        cy.contains('Cypress title Cypress author')
          .click()
        cy.contains('like')
          .click()
        cy.contains('1 likes')
      })
      it('user view show added blog', function() {
        cy.contains('users')
          .click()
        cy.get('Table')
          .contains('Test User 1')
          .click()
        cy.contains('added blogs')
        cy.contains('Cypress title')
      })
    })
  })
})