class Storage {

    // Calorie 
    static getCalorieLimit(defaultLimit = '2000') {
      let calorieLimit;
      if(localStorage.getItem('calorieLimit') === null) {
        calorieLimit = defaultLimit;
      } else {
        calorieLimit = +localStorage.getItem('calorieLimit');
      }
      return calorieLimit;
    }
  
    static setCalorieLimit(calorieLimit) {
      localStorage.setItem('calorieLimit', calorieLimit);
    }
  
    // Protein
    static getProteinLimit(defaultLimit = '135') {
      let proteinLimit;
      if(localStorage.getItem('proteinLimit') === null) {
        proteinLimit = defaultLimit;
      } else {
        proteinLimit = +localStorage.getItem('proteinLimit');
      }
      return proteinLimit;
    }
  
    static setProteinLimit(proteinLimit) {
      localStorage.setItem('proteinLimit', proteinLimit);
    }
    
    // Carbs
    static getCarbsLimit(defaultLimit = '230') {
      let carbsLimit;
      if(localStorage.getItem('carbsLimit') === null) {
        carbsLimit = defaultLimit;
      } else {
        carbsLimit = +localStorage.getItem('carbsLimit');
      }
      return carbsLimit;
    }
  
    static setCarbsLimit(carbsLimit) {
      localStorage.setItem('carbsLimit', carbsLimit);
    }
    // Fats
    static getFatsLimit(defaultLimit = '100') {
      let fatsLimit;
      if(localStorage.getItem('fatsLimit') === null) {
        fatsLimit = defaultLimit;
      } else {
        fatsLimit = +localStorage.getItem('fatsLimit');
      }
      return fatsLimit;
    }
  
    static setFatsLimit(fatsLimit) {
      localStorage.setItem('fatsLimit', fatsLimit);
    }
  
    // Total Calories  
    static getTotalCalories(defaultCalories = 0) {
      let totalCalories;
      if(localStorage.getItem('totalCalories') === null) {
        totalCalories = defaultCalories;
      } else {
        totalCalories = +localStorage.getItem('totalCalories');
      }
      return totalCalories;    
    }
  
    static updateTotalCalories(calories) {
      localStorage.setItem('totalCalories', calories);
    }
  
    // Total Protein
    static getTotalProtein(defaultCalories = 0) {
      let totalProtein;
      if(localStorage.getItem('totalProtein') === null) {
        totalProtein = defaultCalories;
      } else {
        totalProtein = +localStorage.getItem('totalProtein');
      }
      return totalProtein;    
    }
  
    static updateTotalProtein(protein) {
      localStorage.setItem('totalProtein', protein);
    }
    
    // Total Carbs
    static getTotalCarbs(defaultCalories = 0) {
      let totalCarbs;
      if(localStorage.getItem('totalCarbs') === null) {
        totalCarbs = defaultCalories;
      } else {
        totalCarbs = +localStorage.getItem('totalCarbs');
      }
      return totalCarbs;    
    }
  
    static updateTotalCarbs(carbs) {
      localStorage.setItem('totalCarbs', carbs);
    }
  
    // Total Fats
    static getTotalFats(defaultCalories = 0) {
      let totalFats;
      if(localStorage.getItem('totalFats') === null) {
        totalFats = defaultCalories;
      } else {
        totalFats = +localStorage.getItem('totalFats');
      }
      return totalFats;    
    }
  
    static updateTotalFats(fats) {
      localStorage.setItem('totalFats', fats);
    }
  
    // Get meals
    static getMeals() {
      let meals;
      if(localStorage.getItem('meals') === null) {
        meals = [];
      } else {
        meals = JSON.parse(localStorage.getItem('meals'));
      }
      return meals;       
    }
  
    // Save meal to local storage
    static saveMeal(meal) {
      const meals = Storage.getMeals();
      meals.push(meal);
      localStorage.setItem('meals', JSON.stringify(meals));
    }
  
    static removeMeal(id) {
      const meals = Storage.getMeals();
      meals.forEach((meal, index) => {
        if(meal.id === id) {
          meals.splice(index, 1);
        }
      });
  
      localStorage.setItem('meals', JSON.stringify(meals));
    }
  
    static clearAll() {
      localStorage.removeItem('totalCalories');
      localStorage.removeItem('totalProtein');
      localStorage.removeItem('totalCarbs');
      localStorage.removeItem('totalFats');
      localStorage.removeItem('meals');
    }
  
  }

  export default Storage;