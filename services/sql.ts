export const CREATE_TABLE_FOODS = `
  CREATE TABLE IF NOT EXISTS food (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    calories REAL NOT NULL,
    protein REAL NOT NULL,
    carbs REAL NOT NULL,
    sugar REAL,
    fiber REAL,
    fat REAL NOT NULL,
    salt REAL,
    per100unit TEXT CHECK(per100unit IN ('g', 'ml')),
    barcode TEXT
  )
`;

export const CREATE_TABLE_MEALS = `
  CREATE TABLE IF NOT EXISTS meal (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    type TEXT CHECK(type IN ('breakfast', 'lunch', 'dinner', 'snack')) NOT NULL,
    UNIQUE(date, type)
);
`;

export const CREATE_TABLE_MEAL_FOODS = `
  CREATE TABLE IF NOT EXISTS mealfood (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    meal_id INTEGER NOT NULL,
    food_id INTEGER NOT NULL,
    n_servings REAL,
    servingsize_id INTEGER,
    customAmount REAL,
    FOREIGN KEY (servingsize_id) REFERENCES servingsize(id),
    FOREIGN KEY (meal_id) REFERENCES meal(id),
    FOREIGN KEY (food_id) REFERENCES food(id),
    CHECK (
      (customAmount IS NOT NULL AND servingsize_id IS NULL AND n_servings IS NULL) OR 
      (customAmount IS NULL AND servingsize_id IS NOT NULL AND n_servings IS NOT NULL)
    )
  )
`;

export const CREATE_TABLE_SERVINGSIZE = `
  CREATE TABLE IF NOT EXISTS servingsize (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    food_id INTEGER NOT NULL,
    description TEXT NOT NULL,
    amount INTEGER NOT NULL,
    FOREIGN KEY (food_id) REFERENCES food(id)
  )
`;

export const INSERT_FOOD = `
  INSERT INTO food (name, calories, protein, carbs, sugar, fiber, fat, salt, per100unit, barcode)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

export const INSERT_MEAL = `
  INSERT INTO meal (date, type) VALUES (?, ?)
`;

export const INSERT_FOOD_TO_MEAL = `
    INSERT INTO mealfood (meal_id, food_id, customAmount)
    VALUES (?, ?, ?)
`;

export const INSERT_FOOD_TO_MEAL_WITH_SERVING_SIZE = `
    INSERT INTO mealfood (meal_id, food_id, n_servings, servingsize_id)
    VALUES (?, ?, ?, ?)
`;

export const INSERT_SERVING_SIZE = `
  INSERT INTO servingsize (food_id, description, amount) VALUES (?, ?, ?)
`;

export const FETCH_ALL_SERVING_SIZES_FOR_FOOD = `
  SELECT * FROM servingsize WHERE food_id = ?
`;

export const FETCH_ALL_FOODS = `
  SELECT food.*, MAX(meal.date) as last_used
  FROM food
  LEFT JOIN mealfood ON food.id = mealfood.food_id
  LEFT JOIN meal ON mealfood.meal_id = meal.id
  GROUP BY food.id
  ORDER BY last_used DESC
`;

export const FETCH_FOOD_BY_BARCODE = `
  SELECT * FROM food WHERE barcode = ?
`;

export const INSERT_OR_IGNORE_MEAL = `
  INSERT OR IGNORE INTO meal (date, type) VALUES (?, ?)
`;

export const UPDATE_AMOUNT_FOOD_ENTRY_WITH_SERVING_SIZE = `
  UPDATE mealfood 
  SET customAmount = NULL, n_servings = ?, servingsize_id = ?
  WHERE id = ?
`;

export const UPDATE_AMOUNT_FOOD_ENTRY = `
  UPDATE mealfood 
  SET n_servings = NULL, servingsize_id = NULL, customAmount = ?
  WHERE id = ?
`;

export const DELETE_FOOD_ENTRY = `
    DELETE FROM mealfood WHERE id = ?;
`;

export const FETCH_MEALS_WITH_FOODS_BY_DATE = `
  SELECT 
    meal.id AS meal_id, 
    meal.date, 
    meal.type, 
    mealfood.food_id,
    mealfood.id AS entry_id,
    food.name,
    food.calories,
    food.protein,
    food.carbs,
    food.sugar,
    food.fiber,
    food.fat,
    food.salt,
    food.per100unit,
    mealfood.n_servings,
    mealfood.servingsize_id,
    mealfood.customAmount
  FROM meal 
  LEFT JOIN mealfood ON meal.id = mealfood.meal_id
  LEFT JOIN food ON mealfood.food_id = food.id
  WHERE meal.date = ?
  ORDER BY meal.type, food.name
`;
