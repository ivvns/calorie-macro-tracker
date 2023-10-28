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

const tracker = new MacroTracker();

const breakfast = new Meal('Breakfast', 3000, 201, 181, 181);
tracker.addMeal(breakfast);

console.log(tracker._meals);
console.log(tracker._totalCalories);