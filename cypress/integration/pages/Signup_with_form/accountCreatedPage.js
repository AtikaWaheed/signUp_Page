/// <reference types="Cypress" />

export class AccountCreatedClass {

    // This class will cover Successfull Account creation page

    getTitleFormText() {
        return cy.get('.signup__title-form');
    };

    getSubTitleFormText() {
        return cy.get('.signup__subtitle-form');
    };

    getplaceholderText() {
        return cy.get('[placeholder="Enter 6-digit code"]');
    };

    getSignUpFooter() {
        return cy.get('.signup__footer');
    };
};