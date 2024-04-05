const email = document.getElementById('mail');
const country = document.getElementById('country');
const zipCode = document.getElementById('zip');
const passwd = document.getElementById('passwd');
const passwdConfirmation = document.getElementById('passwdConfirmation');
const form = document.querySelector('form');

const emailError = document.querySelector('#mail + span.error');
const countryError = document.querySelector('#country + span.error');
const zipError = document.querySelector('#zip + span.error');
const passwdError = document.querySelector('#passwd + span.error');
const passwdConfError = document.querySelector('#passwdConfirmation + span.error');

addListenerToField(email, emailError);
addListenerToField(country, countryError);
addListenerToField(zip, zipError);
addListenerToField(passwd, passwdError);

function addListenerToField(field, errorSpan) {
    field.addEventListener('input', (event) => {
        if (field.validity.valid) {
            errorSpan.textContent = '';
        } else {
            switch (field.id) {
                case 'mail':
                    showEmailError();
                    break;
                case 'country':
                    showCountryError();
                case 'zip':
                    showZipError();
                case 'passwd':
                    showPasswdError();
                default:
                    break;
            }
        }
    });
}

passwdConfirmation.addEventListener('input', (event) => {
    if(passwd.value !== passwdConfirmation.value){
        passwdConfError.textContent = 'Password confirmation does not match';
        passwdConfirmation.setCustomValidity("Invalid field.")
    }else{
        passwdConfError.textContent = '';
        passwdConfirmation.setCustomValidity("");
    }
});

form.addEventListener('submit', (event) => {
  if(!email.validity.valid){
    showEmailError();
    event.preventDefault();
  }else if(!country.validity.valid){
    showCountryError();
    event.preventDefault();
  }else if(!zip.validity.valid){
    showZipError();
    event.preventDefault();
  }else if(!passwd.validity.valid){
    event.preventDefault();
  }else if(!passwdConfirmation.validity.valid){
    event.preventDefault();
  }
});

function showEmailError() {
    if (email.validity.valueMissing) {
        emailError.textContent = 'You need to enter a valid email address';
    } else if (email.validity.typeMismatch) {
        emailError.textContent = 'Entered value needs to be an email address';
    } else if (email.validity.tooShort) {
        emailError.textContent = `Email should be at least ${email.minLength} characters. You
           entered ${email.value.length}`;
    }
}

function showCountryError() {
    if (country.validity.valueMissing) {
        countryError.textContent = 'You need to enter a valid country';
    } else if (country.validity.tooShort) {
        countryError.textContent = `Country should be at least ${country.minLength} characters. You
        entered ${country.value.length}`;
    } else if (country.validity.patternMismatch) {
        countryError.textContent = 'Country name needs to be only characters from a to z'
    }
}

function showZipError(){
    if(zip.validity.valueMissing){
        zipError.textContent = 'You need to enter a valid zip code';
    }else if(zip.validity.patternMismatch){
        zipError.textContent = 'Zip codes are 6 chars length composed of numbers and letters';
    }
}

function showPasswdError(){
    if(passwd.validity.patternMismatch){
        passwdError.textContent = 'Password must be 8 characters long with at least one letter, one number and one special character'
        passwdConfirmation.setCustomValidity("Invalid field");
        passwdConfError.textContent = 'Password confirmation does not match';
    }
}


