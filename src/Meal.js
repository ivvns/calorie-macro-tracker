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

  export default Meal;
