/// <reference types="Cypress" />

export class MiroLandingPage {
  navigate(url) {
    cy.visit(url);
  }

  getBrandLogo() {
    return cy.get(".overlay-signup__logo");
  }

  getPageSourceTitle() {
    return cy.title();
  }

  getURL() {
    return cy.url();
  }

  checkGetStartedText() {
    return cy.contains("Get started free today");
  }

  checkCreditInfo() {
    return cy.contains("No credit card required");
  }

  termsCheckbox() {
    return cy.get('.mr-checkbox-1 [for="signup-terms"]');
  }

  clickSubmitButton() {
    cy.get(".signup__submit").click();
  }

  fillSignUpForm(signUpFields) {
    if ("name" in signUpFields) {
      const enterName = cy.get('[name="signup[name]"]');
      enterName.clear().type(signUpFields["name"]);
    }

    if ("email" in signUpFields) {
      const enterEmail = cy.get('[name="signup[email]"]');
      enterEmail.clear().type(signUpFields["email"]);
    }

    if ("passwrd" in signUpFields) {
      const enterPassw = cy.get('[name="signup[password]"]');
      enterPassw.clear().type(signUpFields["passwrd"]);
    }

    if ("termsText" in signUpFields) {
      cy.get('.mr-checkbox-1 [for="signup-terms"]').click();
    }

    return signUpFields["email"];
  }

  getSocialMediaIconsLength() {
    return cy.get(".signup__social button");
  }

  getGoogleButtonText() {
    return cy.get("#a11y-signup-with-google");
  }

  getSocialContainerButtons() {
    return cy.get(".signup__social-container img");
  }
}
