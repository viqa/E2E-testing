//those elements are suppose to have data-cy tags on them, so the test would be more assertive and the code cleaner

describe('E2E tests', () => {

    it('Home page', () => {
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

    it('Transactions', () => {
        cy.get('[ng-class="btnClass1"]').click()
        cy.get('[style="float:right;margin-top:-30px;"]').click()
        cy.get('.fixedTopBox > [style="float:left"]').click()
        cy.get('[ng-class="btnClass2"]').click()
        //first we deposit some money
        cy.get('label').should('have.text', 'Amount to be Deposited :')
        cy.get('.form-control').type('1000')
        cy.get('form.ng-dirty > .btn').click()
        cy.get('.error').should('have.text', 'Deposit Successful')//this element shoud not be an error class, but a success class
        cy.wait(1000) //ideally we should wait for a request or element, but this will work
        //now we confirm we have the right amount on account
        cy.get('[ng-class="btnClass1"]').click()
        cy.get("#anchor0 > :nth-child(2)").then(($el) => {
            const text = $el.text()

            expect(text).to.eq("1000")
          })
        cy.get('.fixedTopBox > [style="float:left"]').click()
        //now we withdraw some money 
        cy.get('[ng-class="btnClass3"]').click()
        cy.get('.form-control').type('500')
        cy.get('form.ng-dirty > .btn').click()
        cy.get('.error').should('have.text', 'Transaction successful')
        .wait(1000)
        cy.get('[ng-class="btnClass1"]').click()
        cy.get('#anchor1 > :nth-child(2)').then(($el) => {
            const text = $el.text(); 

            expect(text).to.eq("500");
          })
    
        cy.get('.logout').click()
        cy.get('.home').click()
    })


    it('Bank Manager Login', () => {
        cy.get(':nth-child(3) > .btn').click()
        cy.get('[ng-class="btnClass1"]').should('have.text', 'Add Customer\n\t\t').click()
        cy.get(':nth-child(1) > .form-control').type('Michael')
        cy.get(':nth-child(2) > .form-control').type('Scott')
        cy.get(':nth-child(3) > .form-control').type('18503')
        cy.get('form.ng-dirty > .btn').click()
        cy.get('[ng-class="btnClass3"]').should('have.text','Customers\n\t\t').click()
        cy.get(":nth-child(6) > :nth-child(1)").then(($el) => {
            const text = $el.text(); 

            expect(text).to.eq("Michael");
          })

    })

    it('Delete Customer', () => {
        cy.get(':nth-child(1) > :nth-child(5) > button').click()
        cy.get(':nth-child(1) > :nth-child(5) > button').click()
        cy.get(':nth-child(1) > :nth-child(5) > button').click()
        cy.get(':nth-child(1) > :nth-child(5) > button').click()
        cy.get(':nth-child(1) > :nth-child(5) > button').click() //a little dumb, but it works ^^ 
        cy.get("tbody > .ng-scope > :nth-child(1)").then(($el) => {
            const text = $el.text(); 

            expect(text).to.eq("Michael");
          })
    })
})