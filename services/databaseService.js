import { format } from "date-fns";
import * as SQLite from "expo-sqlite";
import {
  CREATE_TABLE_FOODS,
  CREATE_TABLE_MEALS,
  CREATE_TABLE_RECIPES,
  CREATE_TABLE_RECIPE_FOODS,
  FETCH_ALL_FOODS,
  FETCH_MEALS_BY_DATE_AND_TYPE,
  INSERT_FOOD,
  INSERT_MEAL,
} from "./sql";

const db = SQLite.openDatabase("food-track.db");

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
  getOrCreateMeals: async (date) => {
    const mealTypes = ["breakfast", "lunch", "dinner", "snack"];
    const formattedDate = format(date, "yyyy-MM-dd");

    try {
      const meals = await db.transaction(async (tx) => {
        const existingMeals = await fetchExistingMeals(
          tx,
          formattedDate,
          mealTypes
        );
        const createdMeals = await createMissingMeals(
          tx,
          formattedDate,
          mealTypes,
          existingMeals
        );
        return [...existingMeals, ...createdMeals];
      });

      return meals;
    } catch (error) {
      throw new Error(
        "Failed to get or create meals for the specified date: " + error
      );
    }
  },

  // Helper function to fetch existing meals for the given date and meal types
  fetchExistingMeals: async (tx, date, mealTypes) => {
    const meals = [];

    for (const mealType of mealTypes) {
      const meal = await new Promise((resolve, reject) => {
        tx.executeSql(
          FETCH_MEALS_BY_DATE_AND_TYPE,
          [date, mealType],
          (_, { rows }) => {
            const meal = rows._array[0];
            resolve(meal);
          },
          (_, error) => {
            reject(error);
          }
        );
      });

      if (meal) {
        meals.push(meal);
      }
    }

    return meals;
  },

  // Helper function to create missing meals for the given date and meal types
  createMissingMeals: async (tx, date, mealTypes, existingMeals) => {
    const meals = [];

    for (const mealType of mealTypes) {
      const mealExists = existingMeals.some((meal) => meal.type === mealType);

      if (!mealExists) {
        const newMeal = await new Promise((resolve, reject) => {
          tx.executeSql(
            INSERT_MEAL,
            [date, mealType],
            (_, { insertId }) => {
              const createdMeal = { id: insertId, date, type: mealType };
              resolve(createdMeal);
            },
            (_, error) => {
              reject(error);
            }
          );
        });

        meals.push(newMeal);
      }
    }

    return meals;
  },
};

export default database;
