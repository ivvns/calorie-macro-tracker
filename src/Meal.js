class Meal {
    constructor(name, calories) {
        this.id = Math.random().toString(16).slice(2); // Other ways to make an id (days, timestamp, etc)
        this.name = name;
        this.calories = calories;
    }
}
