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

// Macro Tracker
class MacroTracker {
  constructor() {
    this._calorieLimit = 3000;
    this._totalCalories = 0;
    this._proteinLimit = 200;
    this._totalProtein = 0;
    this._carbsLimit = 180;
    this._totalCarbs = 0;
    this._fatsLimit = 180;
    this._totalFats = 0;
    this._meals = [];

    this._displayCaloriesLimit();
    this._displayProteinLimit();
    this._displayCarbsLimit();
    this._displayFatsLimit();

    this._displayCaloriesConsumed();
    this._displayProteinConsumed();
    this._displayCarbsConsumed();
    this._displayFatsConsumed()

    this._displayCaloriesRemaining();
    this._displayProteinRemaining();
    this._displayCarbsRemaining()
    this._displayFatsRemaining();

    this._displayCaloriesProgress();
    this._displayFatsProgress();
    this._displayProteinProgress();
    this._displayCarbsProgress();
  }

  // Public Methods

  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;
    this._totalProtein += meal.protein;
    this._totalCarbs += meal.carbs;
    this._totalFats += meal.fats;  
    this._displayNewMeal(meal);
    this._render();
  }

  removeMeal(id) {
    const index = this._meals.findIndex((meal) => meal.id === id);

    if (index !== -1) {
      const meal = this._meals[index];
      this._totalCalories -= meal.calories;
      this._totalProtein -= meal.protein;
      this._totalCarbs -= meal.carbs;
      this._totalFats -= meal.fats;  
      this._meals.splice(index, 1);
      this._render();
    }
  }

  reset() {
    this._totalCalories = 0;
    this._meals = [];
    this._totalCalories = 0;
    this._totalProtein = 0;
    this._totalCarbs = 0;
    this._totalFats = 0; 
    this._render();
  }

  setLimit(calorieLimit, proteinLimit, carbsLimit, fatsLimit) {
    this._calorieLimit = calorieLimit;
    this._proteinLimit = proteinLimit;
    this._carbsLimit = carbsLimit;
    this._fatsLimit = fatsLimit;

    this._displayCaloriesLimit();
    this._displayProteinLimit();
    this._displayCarbsLimit();
    this._displayFatsLimit();
    this._render();
  }

  // Private Methods // 

  // Limits
  _displayCaloriesLimit() {
    const calorieLimitEl = document.getElementById('calories-limit');
    calorieLimitEl.innerHTML = this._calorieLimit;
  }
  
  _displayProteinLimit() {
    const proteinLimitEl = document.getElementById('protein-limit');
    proteinLimitEl.innerHTML = this._proteinLimit + 'g';
  }
  
  _displayCarbsLimit() {
    const carbsLimitEl = document.getElementById('carbs-limit');
    carbsLimitEl.innerHTML = this._carbsLimit + 'g';
  }

  _displayFatsLimit() {
    const fatsLimitEl = document.getElementById('fats-limit');
    fatsLimitEl.innerHTML = this._fatsLimit + 'g';
  }

  // Consumed
  _displayCaloriesConsumed() {
    const caloriesConsumedEl = document.getElementById('calories-consumed');

    const consumed = this._meals.reduce((total, meal) => total + meal.calories, 0);

    caloriesConsumedEl.innerHTML = consumed;

  }
  
  _displayProteinConsumed() {
    const proteinConsumedEl = document.getElementById('protein-consumed');

    const consumed = this._meals.reduce((total, meal) => total + meal.protein, 0);

    proteinConsumedEl.innerHTML = consumed + 'g';

  }
  
  _displayCarbsConsumed() {
    const carbsConsumedEl = document.getElementById('carbs-consumed');

    const consumed = this._meals.reduce((total, meal) => total + meal.carbs, 0);

    carbsConsumedEl.innerHTML = consumed + 'g';

  }
  
  _displayFatsConsumed() {
    const fatsConsumedEl = document.getElementById('fats-consumed');

    const consumed = this._meals.reduce((total, meal) => total + meal.fats, 0);

    fatsConsumedEl.innerHTML = consumed + 'g';

  }

  // Remaining
  _displayCaloriesRemaining() {
    const caloriesRemainingEl = document.getElementById('calories-remaining');
    const calorieProgressEl = document.getElementById('calories-progress');

    const remaining = this._calorieLimit - this._totalCalories;

    caloriesRemainingEl.innerHTML = remaining;

    if(remaining < 0) {
      caloriesRemainingEl.parentElement.classList.add('text-limit');
      calorieProgressEl.classList.add('bar-limit');
    } else {
      caloriesRemainingEl.parentElement.classList.remove('text-limit');
      calorieProgressEl.classList.remove('bar-limit');
    }

  }
  
  _displayProteinRemaining() {
    const proteinRemainingEl = document.getElementById('protein-remaining');
    const proteinProgressEl = document.getElementById('protein-progress');

    const remaining = this._proteinLimit - this._totalProtein;

    proteinRemainingEl.innerHTML = remaining + 'g';

    if(remaining < 0) {
      proteinRemainingEl.parentElement.classList.add('text-limit');
      proteinProgressEl.classList.add('bar-limit');
    } else {
      proteinRemainingEl.parentElement.classList.remove('text-limit');
      proteinProgressEl.classList.remove('bar-limit');
    }

  }
  
  _displayCarbsRemaining() {
    const carbsRemainingEl = document.getElementById('carbs-remaining');
    const carbsProgressEl = document.getElementById('carbs-progress');

    const remaining = this._carbsLimit - this._totalCarbs;

    carbsRemainingEl.innerHTML = remaining + 'g';

    if(remaining < 0) {
      carbsRemainingEl.parentElement.classList.add('text-limit');
      carbsProgressEl.classList.add('bar-limit');
    } else {
      carbsRemainingEl.parentElement.classList.remove('text-limit');
      carbsProgressEl.classList.remove('bar-limit');
    }

  }
  
  _displayFatsRemaining() {
    const fatsRemainingEl = document.getElementById('fats-remaining');
    const fatsProgressEl = document.getElementById('fats-progress');

    const remaining = this._fatsLimit - this._totalFats;

    fatsRemainingEl.innerHTML = remaining + 'g';

    if(remaining < 0) {
      fatsRemainingEl.parentElement.classList.add('text-limit');
      fatsProgressEl.classList.add('bar-limit');
    } else {
      fatsRemainingEl.parentElement.classList.remove('text-limit');
      fatsProgressEl.classList.remove('bar-limit');
    }
  }

  // Progress Bars
  _displayCaloriesProgress() {
    const caloriesProgressEl = document.getElementById('calories-progress');
    const percentage = (this._totalCalories / this._calorieLimit) * 100;
    const width = Math.min(percentage, 100);
    
    caloriesProgressEl.style.width = `${width}%`;

  }
  
  _displayProteinProgress() {
    const proteinProgressEl = document.getElementById('protein-progress');
    const percentage = (this._totalProtein / this._proteinLimit) * 100;
    const width = Math.min(percentage, 100);
    
    proteinProgressEl.style.width = `${width}%`;

  }

  _displayCarbsProgress() {
    const carbsProgressEl = document.getElementById('carbs-progress');
    const percentage = (this._totalCarbs / this._carbsLimit) * 100;
    const width = Math.min(percentage, 100);
    
    carbsProgressEl.style.width = `${width}%`;

  }


  _displayFatsProgress() {
    const fatsProgressEl = document.getElementById('fats-progress');
    const percentage = (this._totalFats / this._fatsLimit) * 100;
    const width = Math.min(percentage, 100);
    
    fatsProgressEl.style.width = `${width}%`;

  }

  _displayNewMeal(meal) {
    const mealsEl = document.getElementById('meal-items');
    const mealEl = document.createElement('div');
    
    mealEl.classList.add('meal-card');
    mealEl.setAttribute('data-id', meal.id);
    mealEl.innerHTML = `
    <div class="meal-body"> 
    <div class="meal-heading">
      <p class="meal-text">${meal.name}</p>
      <button><i class="fa-solid fa-x"></i></button>
    </div>
    <div>
      <p class="meal-cals">${meal.calories} cals</p>
    </div>
    <div>
      <ul class="meal-nutrition">
        <li class="meal-macro">${meal.protein}g protein</li>
        <li class="meal-macro meal-carbs">${meal.carbs}g carbs</li>
        <li class="meal-macro">${meal.fats}g fats</li>
      </ul>
    </div>
  </div>
    `;

    mealsEl.appendChild(mealEl);

  }

    _render() {
      this._displayCaloriesConsumed();
      this._displayProteinConsumed();
      this._displayCarbsConsumed();
      this._displayFatsConsumed();
      this._displayCaloriesRemaining();
      this._displayProteinRemaining();
      this._displayCarbsRemaining();
      this._displayFatsRemaining();
      this._displayCaloriesProgress();
      this._displayProteinProgress();
      this._displayCarbsProgress();
      this._displayFatsProgress();
  }
  
}

// Meal
class Meal {
  constructor(name, calories, protein, carbs, fats) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
    this.protein = protein;
    this.carbs = carbs;
    this.fats = fats;
  }
}

// App 
class App {
  constructor() {
    this._tracker = new MacroTracker();

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
      alert('Please enter a value');
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
      if(confirm('Are you sure'));
        const id = e.target.closest('.meal-card').getAttribute('data-id');
        
        if(type === 'meal') {
          this._tracker.removeMeal(id);
        }

        e.target.closest('.meal-card').remove();
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
      alert('Please add a limit');
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