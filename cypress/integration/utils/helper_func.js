/// <reference types="Cypress" />

export function enterEmailAdress() {

  // Create random user id and enter in Email field
  var chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
  var string = '';
  for(var ii=0; ii<15; ii++){
      string += chars[Math.floor(Math.random() * chars.length)];
      const random_email = `${string}@gmail.com`;
    };
  const random_email = `${string}@gmail.com`;
  return random_email;
};

export function generateRandomtext() {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz";
  
    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  };

export function generateRandomPassword() {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz1234567890";
  
    for (var i = 0; i < 15; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  };

export function getRegistrationFields( keysToBeRemoved = null, termsText='') {
  // This wrapper function will help to iterate over all mendatory fields in form.

    const randomName = generateRandomtext();
    const randomEmail = enterEmailAdress();
    const randomNum  = generateRandomPassword();    

    const registerFields = {
        "name": randomName,
        "email": keysToBeRemoved["email"] === undefined ? randomEmail : keysToBeRemoved["email"],
        "passwrd": keysToBeRemoved["passwrd"] === undefined ? randomNum : keysToBeRemoved["passwrd"],
        "termsText": termsText
    };

    if (keysToBeRemoved){  //Key which needs to be removed will be poped out from dict.
        for (var key in keysToBeRemoved) {
            delete registerFields[keysToBeRemoved[key]]
        };
    return registerFields
    };
};