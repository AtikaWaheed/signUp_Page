/// <reference types="Cypress" />

import { getRegistrationFields } from '..//utils/helper_func';
import  {  ValidateAllErrors } from '..//pages/Errors_check';
import { ValidateLandiongMiroPage } from '../pages/Signup_with_form/MainSignUpPage';
import { AccountCreatedClass } from '../pages/Signup_with_form/accountCreatedPage';
import { baseUrl, pageTitle, brandTitle,
         emptyNameError,
         emptyEmailError,
         incprrectEmailError,
         emptyPasswrdError,
         invalidPassError,
         checkEmailTitle,
         alreadyRegisterAccountError,
         checkFooterText,
         invalidEmailError,
         emptyTermsError} from '..//utils/variables';

describe('Validate Sign Up Miro Page', ()=> {
    const SignUp_LandingPage = new ValidateLandiongMiroPage;
    const ErrorChecks = new ValidateAllErrors;
    const AccountCreated = new AccountCreatedClass;
    
    beforeEach(() => {
        SignUp_LandingPage.navigate(baseUrl); //Navigate to SignUp Page
        // URL
        SignUp_LandingPage.getURL().should('include', '/signup/');
        // Validate Source Page Title 
        SignUp_LandingPage.getPageSourceTitle().should('eq', pageTitle);
        
        // Validate Brand Logo and Brand Title
        SignUp_LandingPage.getBrandogo().
        should('have.attr', 'href', '/index/').
        and('have.attr', 'title', brandTitle); // Validate if terms/policy checkbox is unchecked
        
        // Validate SignUp Form Title Text
        SignUp_LandingPage.checkGetStartedText().should('be.visible'); 
        
        //Validate CreditCard Text in SignUp Form
        SignUp_LandingPage.checkCreditInfo().should('be.visible');

        // Validate Terms and Policy Checkpox is Unchecked
        SignUp_LandingPage.termsCheckboxesDisabled().should('not.be.checked')});

    it('Validate error message on empty Name field', () => {
        SignUp_LandingPage.fillSignUpForm(getRegistrationFields(['name'])); //Fill form  with empty name field
        SignUp_LandingPage.clickSubmitButton();

        ErrorChecks.checkFieldError('name').then(($input)=> {  // Error text message validation
            const txt = $input.text();
            expect(txt).to.be.equal(emptyNameError);
        });
    });

    it('Validate error message on empty Email field', () => {
        SignUp_LandingPage.fillSignUpForm(getRegistrationFields(['email'])); //Empty register field
        SignUp_LandingPage.clickSubmitButton();

        ErrorChecks.checkFieldError('email').then(($input)=> {  // Error text message validation
            const txt = $input.text();
            expect(txt).to.be.equal(emptyEmailError);
        });
    });

    it('Validate error message on invalid Email field', () => {
        SignUp_LandingPage.fillSignUpForm(getRegistrationFields({"email":"abc@gmail"})); //Fill form  with invalid email
        SignUp_LandingPage.clickSubmitButton();

        ErrorChecks.checkFieldError('email').then(($input)=> {  // Error text message validation
            const txt = $input.text();
            expect(txt).to.be.equal(invalidEmailError);
        });
    });

    it('Validate error message on incorrect Email field', () => {
        SignUp_LandingPage.fillSignUpForm(getRegistrationFields({"email":"abcdef"})); //Fill form  with incorrect email
        SignUp_LandingPage.clickSubmitButton();

        ErrorChecks.checkFieldError('email').then(($input)=> {  // Error text message validation
            const txt = $input.text();
            expect(txt).to.be.equal(incprrectEmailError);
        });
    });

    it('Validate error message on already created email field', () => {
        SignUp_LandingPage.fillSignUpForm(getRegistrationFields({"email":"testuser+7@gmail.com"})); //Fill form  with already created email
        SignUp_LandingPage.clickSubmitButton();

        ErrorChecks.checkFieldError('email').then(($input)=> {  // Error text message validation
            const txt = $input.text();
            expect(txt).to.be.equal(alreadyRegisterAccountError);
        });
    });

    it('Validate error message on empty Password field', () => {
        SignUp_LandingPage.fillSignUpForm(getRegistrationFields(['passwrd'])); //Fill form  with empty password field
        SignUp_LandingPage.clickSubmitButton();

        ErrorChecks.checkPassworErrors().then(($input)=> {  // Error text message validation
            const txt = $input.text().trim();
            expect(txt).to.be.equal(emptyPasswrdError);
        });
    });

    it('Validate error message on less than 8 digit Password field', () => {
        SignUp_LandingPage.fillSignUpForm(getRegistrationFields({"passwrd":"2"})); //Fill form  with wrong password field
        SignUp_LandingPage.clickSubmitButton();

        ErrorChecks.checkInvalidPassword().then(($input)=> {  // Error text message validation
            const txt = $input.text().trim();
            expect(txt).to.be.equal(invalidPassError);
        });
    });

    it('Validate error message on empty SignUp Terms', () => {
        SignUp_LandingPage.fillSignUpForm(getRegistrationFields(['termsText'])); //Fill form  with uncheck terms
        SignUp_LandingPage.clickSubmitButton();

        ErrorChecks.checkFieldError('terms').then(($input)=> {  // Error text message validation
            const txt = $input.text().trim();
            expect(txt).to.be.equal(emptyTermsError);
        });
    });

    it('Validate Social Media icons length and Google button text on SignUp page', () => {
        SignUp_LandingPage.getSocialMediaIconsLength().should('have.length', 5); // Social Media Icons
        SignUp_LandingPage.getGoogleButtonText(). // Google Button Text
        contains('Sign up with Google').
        should('be.visible');
    });

    it('Validate Social Media icons Slack/Office/Apple/Facebook on SignUp page', () => {
        SignUp_LandingPage.getSocialContainerButtons().then((value)=> {
            expect(value[0]).to.have.attr('alt', 'Sign up with Slack');
            expect(value[1]).to.have.attr('alt', 'Sign up with Office 365');
            expect(value[2]).to.have.attr('alt', 'Sign up with Apple');
            expect(value[3]).to.have.attr('alt', 'Sign up with Facebook');
        });
    });

    it('Validate Account has created successfully and user is on confirmation page', () => {
        const email = SignUp_LandingPage.fillSignUpForm(getRegistrationFields(['keysToBeRemoved'])); //Fill form with valid fields
        
        // Validate Form is submitted 
        SignUp_LandingPage.clickSubmitButton();
        SignUp_LandingPage.getURL().should('include', '/email-confirm/');  // Validate Page URL

        // Validate Title Text
        AccountCreated.getTitleFormText().invoke('text').should('eq', checkEmailTitle); 

        //Validate Sub Title contains same created Email Account.
        AccountCreated.getSubTitleFormText().contains(email).should('be.visible'); 

        //Validate placeholder Text 'Enter 6-digit code'
        AccountCreated.getplaceholderText().should('be.visible');

        //validate Footer Text
        AccountCreated.getSignUpFooter().then(($input)=> {
            const txt = $input.text().trim();
            expect(txt).to.be.equal(checkFooterText);
        });
    });
});