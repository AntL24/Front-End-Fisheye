const modal = document.querySelector('#contact_modal');
const modalHeader = modal.querySelector('header');
const modalTitle = modal.querySelector('h2');
const modalPhotographerName = modal.querySelector('#contact__photographer-name');
const form = modal.querySelector('form');
form.addEventListener('submit', submitForm);
const prenomInput = form.querySelector('#prenom');
const nomInput = form.querySelector('#nom');
const emailInput = form.querySelector('#email');
const messageInput = form.querySelector('#message');
const closeModalButton = modal.querySelector('.close_modal');
closeModalButton.addEventListener('click', closeModal);
const contactButton = document.querySelector('.contact_button');
contactButton.addEventListener('click', displayModal);

function displayModal() {
  modal.style.display = 'block';
  document.body.classList.add('modal-open');
  prenomInput.focus();
}

function closeModal() {
  modal.style.display = 'none';
  document.body.classList.remove('modal-open');
}

function submitForm(event) {
  event.preventDefault();
  const contactForm = event.target.closest('form');
  const formInputs = contactForm.querySelectorAll('input, textarea');

  let formIsValid = true;
  for (const input of formInputs) {
    if (!input.checkValidity()) {
      const errorContainer = input.parentElement;
      errorContainer.setAttribute('data-error-visible', true);
      formIsValid = false;
      contactForm.reportValidity();
      } else {
      const errorContainer = input.parentElement;
      errorContainer.setAttribute('data-error-visible', false);
    }
  }

  if (formIsValid) {
    console.log(`Prénom : ${prenomInput.value}\nNom : ${nomInput.value}\nEmail : ${emailInput.value}\nMessage : ${messageInput.value}`);
    closeModal();
  }
}

function onKeyup(event) {
    if (event.key === 'Escape') {
      closeModal();
    }
  }
  
modalHeader.addEventListener('click', (event) => {
  if (event.target === modalHeader || event.target === modalTitle || event.target === modalPhotographerName) {
    closeModal();
  }
});

document.addEventListener('keyup', onKeyup);

const inputs = [prenomInput, nomInput, emailInput, messageInput];

function onKeydown(event) {
  const currentIndex = inputs.indexOf(document.activeElement);

  if (event.key === 'ArrowUp' && currentIndex > 0) {
    event.preventDefault();
    inputs[currentIndex - 1].focus();
  } else if (event.key === 'ArrowDown' && currentIndex < inputs.length - 1) {
    event.preventDefault();
    inputs[currentIndex + 1].focus();
  }
}

document.addEventListener('keydown', onKeydown);


export { displayModal, closeModal, submitForm };