import MacroTracker from './Tracker';
import Meal from './Meal';

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

// Meal Modal //

// Show modal
openMeal.addEventListener('click', () => modalMeal.classList.add('show-modal'));

// Hide modal
closeMeal.addEventListener('click', () => modalMeal.classList.remove('show-modal'));


// App 
class App {
  constructor() {
    this._tracker = new MacroTracker();
    this._loadEventListeners();
    this._tracker.loadMeals();

  }

  _loadEventListeners() {
    document.getElementById('meal-form').addEventListener('submit', this._newMeal.bind(this));

    document.getElementById('meal-items').addEventListener('click', this._removeItem.bind(this, 'meal'));

    document.getElementById('reset').addEventListener('click', this._reset.bind(this));

    document.getElementById('limit-form').addEventListener('submit', this._setLimit.bind(this));
  }

  _newMeal(e) {
    e.preventDefault();

    const name = document.getElementById('meal-name');
    const calories = document.getElementById('meal-calories');
    const protein = document.getElementById('meal-protein');
    const carbs = document.getElementById('meal-carbs');
    const fats = document.getElementById('meal-fats');

    // Validate inputs
    if (name.value === '' || calories.value === '' || protein.value === '' || carbs.value === '' || fats.value === '') {
      alert('Please fil in all fields');
      return;
    } 

    const meal = new Meal(name.value, +calories.value, +protein.value, +carbs.value, +fats.value);

    this._tracker.addMeal(meal);

    const mealModal = document.getElementById('modal-meal');

    // Close Modal
    mealModal.addEventListener('submit', () => modalMeal.classList.remove('show-modal'));

    name.value = '';
    calories.value = '';
    protein.value = '';
    carbs.value = '';
    fats.value = '';
  }

  _removeItem(type, e) {
    if(e.target.classList.contains('delete') || e.target.classList.contains('fa-x')) {
      if(confirm('Are you sure')) {
        const id = e.target.closest('.meal-card').getAttribute('data-id');
        
        if(type === 'meal') {
          this._tracker.removeMeal(id);
        }

        e.target.closest('.meal-card').remove();
      }
    }
  }

  _reset() {
    this._tracker.reset();
    document.getElementById('meal-items').innerHTML = '';
  }

  _setLimit(e) {
    e.preventDefault();
    const caloriesLimit = document.getElementById('modal-calories');
    const proteinLimit = document.getElementById('modal-protein');
    const carbsLimit = document.getElementById('modal-carbs');
    const fatsLimit = document.getElementById('modal-fats');
    
    if(caloriesLimit.value === '' || proteinLimit.value === '' || carbsLimit.value === '' || fatsLimit.value === '') {
      alert('Please fill in all values');
      return;
    }

    this._tracker.setLimit(+caloriesLimit.value, +proteinLimit.value, +carbsLimit.value, +fatsLimit.value);

    caloriesLimit.value = '';
    proteinLimit.value = '';
    carbsLimit.value = '';
    fatsLimit.value = '';
    
    // Close Modal
    const limitModal = document.getElementById('modal-limit');
    
    limitModal.addEventListener('submit', () => modalLimit.classList.remove('show-modal'));

  }

}

const app = new App();