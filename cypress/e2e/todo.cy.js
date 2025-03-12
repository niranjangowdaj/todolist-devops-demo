describe('Todo list', () => {
  it('adds task', () => {
    cy.visit('https://niranjangowdaj.github.io/todolist-devops-demo/')
    cy.get('#todoInput').clear();
    cy.get('#todoInput').type('task 1');
    cy.get('#addBtn').click();
    cy.get('.text').should('contain.text', 'task 1');
  })

  it('completes tasks', () => {
    cy.visit('https://niranjangowdaj.github.io/todolist-devops-demo/')
    cy.get('#todoInput').clear();
    cy.get('#todoInput').type('task 1');
    cy.get('#addBtn').click();
    cy.get('#todoList > :nth-child(1)').click();
    cy.get('#todoList > :nth-child(1)').should('have.class', 'completed');
    cy.get('#todoInput').clear('t');
    cy.get('#todoInput').type('task 2');
    cy.get('#addBtn').click();
    cy.get('#todoInput').clear();
    cy.get('#todoInput').type('task 3');
    cy.get('#addBtn').click();
    cy.get('#todoList > :nth-child(3)').click();
    cy.get('#todoList > :nth-child(3)').should('have.class', 'completed');
  })

  it('deletes tasks', () => {
    cy.visit('https://niranjangowdaj.github.io/todolist-devops-demo/')
    cy.get('#todoInput').clear();
    cy.get('#todoInput').type('task 1');
    cy.get('#addBtn').click();
    cy.get('#todoInput').clear();
    cy.get('#todoInput').type('task 2');
    cy.get('#addBtn').click();
    cy.get('#todoInput').clear();
    cy.get('#todoInput').type('task 3');
    cy.get('#addBtn').click();
    cy.get(':nth-child(1) > .delete-btn').click();
    cy.get(':nth-child(1) > .delete-btn').click();
    cy.get('.text').should('contain.text', 'task 3');
  })
})