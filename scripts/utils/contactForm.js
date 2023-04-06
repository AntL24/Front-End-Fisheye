const modal = document.querySelector('#contact_modal');

const form = modal.querySelector('form');
form.addEventListener('submit', submitForm);

const prenomInput = form.querySelector('#prenom');
const nomInput = form.querySelector('#nom');
const emailInput = form.querySelector('#email');
const messageInput = form.querySelector('#message');

const inputs = [prenomInput, nomInput, emailInput, messageInput];

const closeModalButton = modal.querySelector('.close_modal');
closeModalButton.addEventListener('click', closeModal);

const contactButton = document.querySelector('.contact_button');
contactButton.addEventListener('click', displayModal);

//Change contact modal display to block
function displayModal() {
  modal.style.display = 'block';
  document.body.classList.add('modal-open');
  prenomInput.focus();
}
//Hide contact modal by changing its display
function closeModal() {
  modal.style.display = 'none';
  document.body.classList.remove('modal-open');
}
//Console log the form values after checking their validity
function submitForm(event) {
  event.preventDefault();
  const contactForm = event.target.closest('form');
  const formInputs = contactForm.querySelectorAll('input, textarea');

  for (const input of formInputs) {
    if (!input.checkValidity()) {
      const errorContainer = input.parentElement;
      errorContainer.setAttribute('data-error-visible', true);
      contactForm.reportValidity();
      } else {
      const errorContainer = input.parentElement;
      errorContainer.setAttribute('data-error-visible', false);
      console.log(`Prénom : ${prenomInput.value}\nNom : ${nomInput.value}\nEmail : ${emailInput.value}\nMessage : ${messageInput.value}`);
      closeModal();
    }
  }
}

//Close modal on escape key press
function onKeyup(event) {
    if (event.key === 'Escape') {
      closeModal();
    }
  }
document.addEventListener('keyup', onKeyup);

//Focus on next input when pressing enter
function onKeydown(event) {
  const currentIndex = inputs.indexOf(document.activeElement);
  if (event.key === 'ArrowUp' && currentIndex > 0) {
    event.preventDefault();
    inputs[currentIndex - 1].focus();
  } else if (event.key === 'ArrowDown' && currentIndex < inputs.length - 1) {
    event.preventDefault();
    inputs[currentIndex + 1].focus();
  }
  //If the last input is focused, submit the form
  if (event.key === 'Enter' && currentIndex === inputs.length - 1) {
    event.preventDefault();
    //Validate ternary operator if all inputs are valid. If so, submit the form. If not, return reportValidity() on the form.
    inputs.every(input => input.checkValidity()) ? submitForm(event) : form.reportValidity();

  }
}
document.addEventListener('keydown', onKeydown);


export { displayModal, closeModal, submitForm };