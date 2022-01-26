/// <reference types="cypress" />

describe('Repos Page tests', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Header is visible and contains its elements', () => {
        cy.get('.header').should('have.length', 1).should('be.visible');
    });

    it('Footer is visible and contains its elements', () => {
        cy.get('.footer').should('have.length', 1).should('be.visible');
    });
});
