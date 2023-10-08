export const CREATE_TABLE_FOODS = `
  CREATE TABLE IF NOT EXISTS Food (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    calories REAL NOT NULL,
    protein REAL NOT NULL,
    carbs REAL NOT NULL,
    sugar REAL,
    fiber REAL,
    fat REAL NOT NULL,
    salt REAL,
    per100unit TEXT CHECK(per100unit IN ('g', 'ml'))
  )
`;

export const CREATE_TABLE_MEALS = `
  CREATE TABLE IF NOT EXISTS Meal (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    type TEXT CHECK(type IN ('breakfast', 'lunch', 'dinner', 'snack')) NOT NULL
  )
`;

export const CREATE_TABLE_MEAL_FOODS = `
  CREATE TABLE IF NOT EXISTS MealFood (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    meal_id INTEGER NOT NULL,
    food_id INTEGER NOT NULL,
    amount REAL NOT NULL,
    FOREIGN KEY (meal_id) REFERENCES Meal(id),
    FOREIGN KEY (food_id) REFERENCES Food(id)
  )
`;

export const INSERT_FOOD = `
  INSERT INTO Food (name, calories, protein, carbs, sugar, fiber, fat, salt, per100unit)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

export const INSERT_MEAL = `
  INSERT INTO Meal (date, type) VALUES (?, ?)
`;

export const INSERT_FOOD_TO_MEAL = `
    INSERT INTO MealFood (meal_id, food_id, amount)
    VALUES (?, ?, ?)
`;

export const FETCH_ALL_FOODS = `
  SELECT * FROM Food
`;

export const FETCH_MEALS_BY_DATE_AND_TYPE = `
  SELECT * FROM Meal WHERE date = ? AND type = ?
`;
