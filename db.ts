import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabase("foodTrack.db");

export const initializeDatabase = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(`
        CREATE TABLE IF NOT EXISTS Food(
          id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
          name TEXT NOT NULL, 
          calories REAL NOT NULL CHECK (calories >= 0), 
          protein REAL NOT NULL CHECK (protein >= 0), 
          carbs REAL NOT NULL CHECK (carbs >= 0), 
          sugar REAL CHECK (sugar >= 0), 
          fiber REAL CHECK (fiber >= 0), 
          fat REAL NOT NULL CHECK (fat >= 0),
          salt REAL CHECK (salt >= 0),
          per100unit TEXT CHECK(per100unit IN ('g', 'ml'))
        )
      `);

        tx.executeSql(`
        CREATE TABLE IF NOT EXISTS Meal(
          id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
          date TEXT NOT NULL, 
          type TEXT NOT NULL CHECK(type IN ('breakfast', 'lunch', 'dinner', 'snack'))
        )
      `);

        tx.executeSql(`
        CREATE TABLE IF NOT EXISTS MealFood(
          id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
          meal_id INTEGER NOT NULL, 
          food_id INTEGER NOT NULL, 
          amount REAL NOT NULL CHECK(amount >= 0), 
          FOREIGN KEY (meal_id) REFERENCES Meal(id),
          FOREIGN KEY (food_id) REFERENCES Food(id)
        )
      `);
      },
      (error) => reject(error),
      () => resolve()
    );
  });
};

export const insertFood = ({
  foodName,
  calories,
  protein,
  carbs,
  sugar,
  fiber,
  fat,
  salt,
  per100unit,
}) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      console.log(per100unit);
      tx.executeSql(
        "INSERT INTO Food (name, calories, protein, carbs, sugar, fiber, fat, per100unit) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [foodName, calories, protein, carbs, sugar, fiber, fat, per100unit],
        (_, resultSet) => resolve(resultSet.insertId),
        (_, error) => reject(error)
      );
    });
  });
};

export const fetchAllFoods = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM Food",
        [],
        (_, resultSet) => resolve(resultSet.rows._array),
        (_, error) => reject(error)
      );
    });
  });
};

export const getOrCreateMeal = (date, mealType) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM Meal WHERE date = ? AND mealType = ?",
        [date, mealType],
        (_, resultSet) => {
          if (resultSet.rows.length > 0) {
            resolve(resultSet.rows.item(0)); // Return the found meal
          } else {
            // If meal doesn't exist yet, create a new one
            tx.executeSql(
              "INSERT INTO Meal (date, mealType) VALUES (?, ?)",
              [date, mealType],
              (_, resultSet) =>
                resolve({ id: resultSet.insertId, date, mealType }), // Return the new meal
              (_, error) => reject(error)
            );
          }
        },
        (_, error) => reject(error)
      );
    });
  });
};

export const insertMealFood = (mealId, foodId, amount) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO Meal_Food (mealId, foodId, amount) VALUES (?, ?, ?)",
        [mealId, foodId, amount],
        (_, resultSet) => resolve(resultSet.insertId),
        (_, error) => reject(error)
      );
    });
  });
};
