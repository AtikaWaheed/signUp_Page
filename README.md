Get Started With Miro.
==========================

End-to-end tests for Miro SignUp Functions: The online collaborative whiteboard platform to
bring teams together, anytime, anywhere.

Pre reqs:
============================================
1- Install NodeJS and NPM 

Running Tests:
======================================
1- Create project directory
 
       mkdir Miro_signup_Page

2- Let’s start by creating the package.json
        
        npm init -y         // This will create a package.json file

3- Install Node.js packages
       
       $ npm install

4- Install Cypress
      
      npm install cypress

5- In order to execute all tests, run command  

     npx cypress run --spec "cypress/integration/test_suites/mainSignUp_page.js"  