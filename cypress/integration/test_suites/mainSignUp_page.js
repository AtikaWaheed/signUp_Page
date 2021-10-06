/// <reference types="Cypress" />

import { getRegistrationFields } from "..//utils/helper_func";
import { ValidateAllErrors } from "..//pages/Errors_check";
import { ValidateLandiongMiroPage } from "../pages/Signup_with_form/MainSignUpPage";
import { AccountCreatedClass } from "../pages/Signup_with_form/accountCreatedPage";
import {
  baseUrl,
  pageTitle,
  brandTitle,
  emptyNameError,
  emptyEmailError,
  incprrectEmailError,
  emptyPasswrdError,
  invalidPassError,
  checkEmailTitle,
  alreadyRegisterAccountError,
  checkFooterText,
  invalidEmailError,
  emptyTermsError,
} from "..//utils/variables";

describe("Validate Sign Up Miro Page", () => {
  const SignUp_LandingPage = new ValidateLandiongMiroPage();
  const ErrorChecks = new ValidateAllErrors();
  const AccountCreated = new AccountCreatedClass();

  beforeEach(() => {
    SignUp_LandingPage.navigate(baseUrl);
    SignUp_LandingPage.getURL().should("include", "/signup/");
    SignUp_LandingPage.getPageSourceTitle().should("eq", pageTitle);

    SignUp_LandingPage.getBrandogo()
      .should("have.attr", "href", "/index/")
      .and("have.attr", "title", brandTitle);

    SignUp_LandingPage.checkGetStartedText().should("be.visible");

    SignUp_LandingPage.checkCreditInfo().should("be.visible");

    SignUp_LandingPage.termsCheckboxesDisabled().should("not.be.checked");
  });

  it("Validate error message on empty Name field", () => {
    SignUp_LandingPage.fillSignUpForm(getRegistrationFields(["name"]));
    SignUp_LandingPage.clickSubmitButton();

    ErrorChecks.checkFieldError("name").then(($input) => {
      const txt = $input.text();
      expect(txt).to.be.equal(emptyNameError);
    });
  });

  it("Validate error message on empty Email field", () => {
    SignUp_LandingPage.fillSignUpForm(getRegistrationFields(["email"]));
    SignUp_LandingPage.clickSubmitButton();

    ErrorChecks.checkFieldError("email").then(($input) => {
      const txt = $input.text();
      expect(txt).to.be.equal(emptyEmailError);
    });
  });

  it("Validate error message on invalid Email field", () => {
    SignUp_LandingPage.fillSignUpForm(
      getRegistrationFields({ email: "abc@gmail" })
    );
    SignUp_LandingPage.clickSubmitButton();

    ErrorChecks.checkFieldError("email").then(($input) => {
      const txt = $input.text();
      expect(txt).to.be.equal(invalidEmailError);
    });
  });

  it("Validate error message on incorrect Email field", () => {
    SignUp_LandingPage.fillSignUpForm(
      getRegistrationFields({ email: "abcdef" })
    );
    SignUp_LandingPage.clickSubmitButton();

    ErrorChecks.checkFieldError("email").then(($input) => {
      const txt = $input.text();
      expect(txt).to.be.equal(incprrectEmailError);
    });
  });

  it("Validate error message on already created email field", () => {
    SignUp_LandingPage.fillSignUpForm(
      getRegistrationFields({ email: "testuser+7@gmail.com" })
    );
    SignUp_LandingPage.clickSubmitButton();

    ErrorChecks.checkFieldError("email").then(($input) => {
      const txt = $input.text();
      expect(txt).to.be.equal(alreadyRegisterAccountError);
    });
  });

  it("Validate error message on empty Password field", () => {
    SignUp_LandingPage.fillSignUpForm(getRegistrationFields(["passwrd"]));
    SignUp_LandingPage.clickSubmitButton();

    ErrorChecks.checkPassworErrors().then(($input) => {
      const txt = $input.text().trim();
      expect(txt).to.be.equal(emptyPasswrdError);
    });
  });

  it("Validate error message on less than 8 digit Password field", () => {
    SignUp_LandingPage.fillSignUpForm(getRegistrationFields({ passwrd: "2" }));
    SignUp_LandingPage.clickSubmitButton();

    ErrorChecks.checkInvalidPassword().then(($input) => {
      const txt = $input.text().trim();
      expect(txt).to.be.equal(invalidPassError);
    });
  });

  it("Validate error message on empty SignUp Terms", () => {
    SignUp_LandingPage.fillSignUpForm(getRegistrationFields(["termsText"]));
    SignUp_LandingPage.clickSubmitButton();

    ErrorChecks.checkFieldError("terms").then(($input) => {
      const txt = $input.text().trim();
      expect(txt).to.be.equal(emptyTermsError);
    });
  });

  it("Validate Social Media icons length and Google button text on SignUp page", () => {
    SignUp_LandingPage.getSocialMediaIconsLength().should("have.length", 5);
    SignUp_LandingPage.getGoogleButtonText()
      .contains("Sign up with Google")
      .should("be.visible");
  });

  it("Validate Social Media icons Slack/Office/Apple/Facebook on SignUp page", () => {
    SignUp_LandingPage.getSocialContainerButtons().then((value) => {
      expect(value[0]).to.have.attr("alt", "Sign up with Slack");
      expect(value[1]).to.have.attr("alt", "Sign up with Office 365");
      expect(value[2]).to.have.attr("alt", "Sign up with Apple");
      expect(value[3]).to.have.attr("alt", "Sign up with Facebook");
    });
  });

  it("Validate Account has created successfully and user is on confirmation page", () => {
    const email = SignUp_LandingPage.fillSignUpForm(
      getRegistrationFields(["keysToBeRemoved"])
    );

    SignUp_LandingPage.clickSubmitButton();
    SignUp_LandingPage.getURL().should("include", "/email-confirm/");

    AccountCreated.getTitleFormText()
      .invoke("text")
      .should("eq", checkEmailTitle);

    AccountCreated.getSubTitleFormText().contains(email).should("be.visible");

    AccountCreated.getplaceholderText().should("be.visible");

    AccountCreated.getSignUpFooter().then(($input) => {
      const txt = $input.text().trim();
      expect(txt).to.be.equal(checkFooterText);
    });
  });
});
