import Storage from './Storage';

class MacroTracker {
    constructor() {
      this._calorieLimit = Storage.getCalorieLimit();
      this._totalCalories = Storage.getTotalCalories(0);
      this._proteinLimit = Storage.getProteinLimit();
      this._totalProtein = Storage.getTotalProtein(0);
      this._carbsLimit = Storage.getCarbsLimit();
      this._totalCarbs = Storage.getTotalCarbs(0);
      this._fatsLimit = Storage.getFatsLimit();
      this._totalFats = Storage.getTotalFats(0);
      this._meals = Storage.getMeals();
  
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
  
      document.getElementById('modal-calories').value = this._calorieLimit;
      document.getElementById('modal-protein').value = this._proteinLimit;
      document.getElementById('modal-carbs').value = this._carbsLimit;
      document.getElementById('modal-fats').value = this._fatsLimit;
    }
  
    // Public Methods
  
    addMeal(meal) {
      this._meals.push(meal);
      this._totalCalories += meal.calories;
      Storage.updateTotalCalories(this._totalCalories);
      this._totalProtein += meal.protein;
      Storage.updateTotalProtein(this._totalProtein);
      this._totalCarbs += meal.carbs;
      Storage.updateTotalCarbs(this._totalCarbs);
      this._totalFats += meal.fats;  
      Storage.updateTotalFats(this._totalFats);
      Storage.saveMeal(meal);
      this._displayNewMeal(meal);
      this._render();
    }
  
    removeMeal(id) {
      const index = this._meals.findIndex((meal) => meal.id === id);
  
      if (index !== -1) {
        const meal = this._meals[index];
        this._totalCalories -= meal.calories;
        Storage.updateTotalCalories(this._totalCalories);
        this._totalProtein -= meal.protein;
        Storage.updateTotalProtein(this._totalProtein);
        this._totalCarbs -= meal.carbs;
        Storage.updateTotalCarbs(this._totalCarbs);
        this._totalFats -= meal.fats;  
        Storage.updateTotalFats(this._totalFats);
        this._meals.splice(index, 1);
        Storage.removeMeal(id);
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
      Storage.clearAll();
      this._render();
    }
  
    setLimit(calorieLimit, proteinLimit, carbsLimit, fatsLimit) {
      this._calorieLimit = calorieLimit;
      Storage.setCalorieLimit(calorieLimit);
      this._proteinLimit = proteinLimit;
      Storage.setProteinLimit(proteinLimit);
      this._carbsLimit = carbsLimit;
      Storage.setCarbsLimit(carbsLimit);
      this._fatsLimit = fatsLimit;
      Storage.setFatsLimit(fatsLimit);
  
      this._displayCaloriesLimit();
      this._displayProteinLimit();
      this._displayCarbsLimit();
      this._displayFatsLimit();
      this._render();
    }
  
    loadMeals() {
      this._meals.forEach(meal => this._displayNewMeal(meal));
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

export default MacroTracker;