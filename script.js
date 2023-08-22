const form = document.getElementById('my-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const contactNumber = document.getElementById('contact-number');

function toggleError(element, isValid) {
  const errorElement = document.getElementById(element.id + 'Error');

  errorElement.classList.toggle('hidden', isValid);
  if (isValid) {
    element.style.borderColor = '#4EE1A0';
  } else {
    element.style.borderColor = '#FF6F5B';
  }
}

function validateName() {
  const nameValue = nameInput.value;
  const isValid = nameValue !== '';
  toggleError(nameInput, isValid);
  return isValid;
}

function validateEmail() {
  const emailValue = emailInput.value;
  const isValid = emailValue !== '' && emailPattern.test(emailValue);
  toggleError(emailInput, isValid);
  return isValid;
}

function validateMessage() {
  const messageValue = messageInput.value;
  const isValid = messageValue !== '';
  toggleError(messageInput, isValid);
  return isValid;
}

nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
messageInput.addEventListener('input', validateMessage);

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isMessageValid = validateMessage();

  if (isNameValid && isEmailValid && isMessageValid) {
    // emailjs code
    contactNumber.value = Math.random() * 100000 | 0;
    emailjs.sendForm('service_afgyy39', 'template_d8pzez8', form)
      .then(function () {
        console.log('SUCCESS!');
      }, function (error) {
        console.log('FAILED...', error);
      });
    // end emailjs code
    form.reset();
  } 
  else {
    if (!isNameValid) {
      nameInput.focus();
    } else if (!isEmailValid) {
      emailInput.focus();
    } else if (!isMessageValid) {
      messageInput.focus();
    }
  }
});