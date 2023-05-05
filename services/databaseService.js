import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('mydb.db');

// create tables if they don't exist
db.transaction(tx => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS foods (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, protein REAL, carbs REAL, fats REAL, unit TEXT)',
    [],
    () => console.log('Foods table created successfully.'),
    error => console.log('Error creating foods table:', error)
  );
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS recipes (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)',
    [],
    () => console.log('Recipes table created successfully.'),
    error => console.log('Error creating recipes table:', error)
  );
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS recipe_foods (recipe_id INTEGER, food_id INTEGER, quantity REAL)',
    [],
    () => console.log('Recipe_foods table created successfully.'),
    error => console.log('Error creating recipe_foods table:', error)
  );
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS meals (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT)',
    [],
    () => console.log('Meals table created successfully.'),
    error => console.log('Error creating meals table:', error)
  );
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS meal_foods (meal_id INTEGER, food_id INTEGER, quantity REAL)',
    [],
    () => console.log('Meal_foods table created successfully.'),
    error => console.log('Error creating meal_foods table:', error)
  );
});

// add a new food
export const addFood = (name, protein, carbs, fats) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO foods (name, protein, carbs, fats) VALUES (?, ?, ?, ?)',
        [name, protein, carbs, fats],
        (_, { insertId }) => {
          resolve(insertId);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

// get all foods
export const getAllFoods = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM foods',
        [],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

// add a new recipe
export const addRecipe = name => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO recipes (name) VALUES (?)',
        [name],
        (_, { insertId }) => {
          resolve(insertId);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

// add a food to a recipe
export const addFoodToRecipe = (recipeId, foodId, quantity) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO recipe_foods (recipe_id, food_id, quantity) VALUES (?, ?, ?)',
        [recipeId, foodId, quantity],
        (_, { insertId }) => {
          resolve(insertId);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

