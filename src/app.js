import '@fortawesome/fontawesome-free/js/all';
import './css/style.css';

const openLimit = document.getElementById('open-limit');
const closeLimit = document.getElementById('close-limit');
const modalLimit = document.getElementById('modal-limit');

const openMeal = document.getElementById('open-meal');
const closeMeal = document.getElementById('close-meal');
const modalMeal = document.getElementById('modal-meal');

// Limit Modal //

// Show modal
openLimit.addEventListener('click', () => modalLimit.classList.add('show-modal'));

// Hide modal
closeLimit.addEventListener('click', () => modalLimit.classList.remove('show-modal'));

// Hide modal on outside click
window.addEventListener('click', e =>
  e.target == modalLimit ? modalLimit.classList.remove('show-modal') : false
);

// Meal Modal //

// Show modal
openMeal.addEventListener('click', () => modalMeal.classList.add('show-modal'));

// Hide modal
closeMeal.addEventListener('click', () => modalMeal.classList.remove('show-modal'));

// Hide modal on outside click
window.addEventListener('click', e =>
  e.target == modalMeal ? modalMeal.classList.remove('show-modal') : false
);


