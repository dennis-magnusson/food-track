import * as SQLite from "expo-sqlite";
import {
  CREATE_TABLE_FOODS,
  CREATE_TABLE_MEALS,
  CREATE_TABLE_RECIPES,
  CREATE_TABLE_RECIPE_FOODS,
  FETCH_ALL_FOODS,
  INSERT_FOOD,
} from "./sql";

const db = SQLite.openDatabase("mydb.db");

const database = {
  init: () => {
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            CREATE_TABLE_FOODS,
            [],
            () => {
              console.log("Food table created successfully.");
            },
            (_, error) => {
              reject(error);
            }
          );
          tx.executeSql(
            CREATE_TABLE_RECIPES,
            [],
            () => {
              console.log("Recipe table created successfully.");
            },
            (_, error) => {
              reject(error);
            }
          );
          tx.executeSql(
            CREATE_TABLE_RECIPE_FOODS,
            [],
            () => {
              console.log("RecipeFood table created successfully.");
            },
            (_, error) => {
              reject(error);
            }
          );
          tx.executeSql(
            CREATE_TABLE_MEALS,
            [],
            () => {
              console.log("Meal table created successfully.");
            },
            (_, error) => {
              reject(error);
            }
          );
          tx.executeSql(
            CREATE_TABLE_RECIPE_FOODS,
            [],
            () => {
              console.log("MealFood table created successfully.");
            },
            (_, error) => {
              reject(error);
            }
          );
        },
        (error) => {
          reject(error);
        },
        () => {
          resolve();
        }
      );
    });
  },

  insertFood: ({
    name,
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
      db.transaction(
        (tx) => {
          tx.executeSql(
            INSERT_FOOD,
            [
              name,
              calories,
              protein,
              carbs,
              sugar,
              fiber,
              fat,
              salt,
              per100unit,
            ],
            (_, { insertId }) => {
              resolve(insertId);
            },
            (_, error) => {
              reject(error);
            }
          );
        },
        (error) => {
          reject(error);
        }
      );
    });
  },

  fetchAllFoods: () => {
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            FETCH_ALL_FOODS,
            [],
            (_, { rows }) => {
              resolve(rows._array);
            },
            (_, error) => {
              reject(error);
            }
          );
        },
        (error) => {
          reject(error);
        }
      );
    });
  },
};

export default database;
