/// <reference types="Cypress" />

export class ValidateAllErrors {
    // This class contains all methods related Error validations

    checkFieldError(field) {
        return cy.get(`#${field}Error`);          
    };

    checkPassworErrors() {
        return cy.get('#signup-form-password[role="alert"]');
    };

    checkInvalidPassword() {
        return cy.get('[data-text-default="Please use 8+ characters for secure password"]');
    };
};