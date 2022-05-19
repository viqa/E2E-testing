describe('E2E tests', () => {
    it('Home page', () => {
        //those elements are suppose to have data-cy tags on them, so the test would be more assertive
        cy.visit('/');
        cy.get('.home').should('be.visible')
            .should('contain', 'Home')
        cy.get('.mainHeading').should('contain', 'XYZ Bank');
        cy.get('.borderM > :nth-child(1) > .btn').should('contain', 'Customer Login')
        cy.get(':nth-child(3) > .btn').should('contain', 'Bank Manager Login')
    })

    it('Customer Login', () => {
        cy.visit('/')
        cy.get('.borderM > :nth-child(1) > .btn').click()
        cy.url().should('contain', '/customer')
        cy.get('#userSelect').select(1)
        cy.get('form.ng-valid > .btn').click()
        cy.get('.fontBig').should('have.text', 'Hermoine Granger')
        cy.get('.borderM > :nth-child(3)').should('have.text','Account Number : 1001 , \n\tBalance : 5096 , \n\tCurrency : Dollar')
    })
})