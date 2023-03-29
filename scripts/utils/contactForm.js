const modal = document.querySelector('#contact_modal');
const modalHeader = modal.querySelector('header');
const modalTitle = modal.querySelector('h2');
const modalPhotographerName = modal.querySelector('#contact__photographer-name');
// const closeModalButton = modal.querySelector('.close_modal');
const form = modal.querySelector('form');
const prenomInput = form.querySelector('#prenom');
const nomInput = form.querySelector('#nom');
const emailInput = form.querySelector('#email');
const messageInput = form.querySelector('#message');
const contactButton = form.querySelector('.contact_button');

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
    if (contactForm.checkValidity()) {
      console.log(`Prénom : ${prenomInput.value}\nNom : ${nomInput.value}\nEmail : ${emailInput.value}\nMessage : ${messageInput.value}`);
      closeModal();
    } else {
      contactForm.reportValidity();
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

contactButton.addEventListener('click', submitForm);
document.addEventListener('keyup', onKeyup);


