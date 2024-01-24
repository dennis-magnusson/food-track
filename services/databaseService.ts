import * as SQLite from "expo-sqlite";
import { basicFoods } from "../constants/basicFoods";
import {
  Food,
  FoodBeforeInsert,
  FoodEntry,
  FoodEntryBeforeInsert,
  Meal,
  RawMealDataRow,
  ServingSize,
} from "../types";
import {
  CREATE_TABLE_FOODS,
  CREATE_TABLE_MEALS,
  CREATE_TABLE_MEAL_FOODS,
  CREATE_TABLE_SERVINGSIZE,
  DELETE_FOOD_ENTRY,
  FETCH_ALL_FOODS,
  FETCH_ALL_SERVING_SIZES_FOR_FOOD,
  FETCH_FOOD_BY_BARCODE,
  FETCH_MEALS_WITH_FOODS_BY_DATE,
  INSERT_FOOD,
  INSERT_FOOD_TO_MEAL,
  INSERT_FOOD_TO_MEAL_WITH_SERVING_SIZE,
  INSERT_OR_IGNORE_MEAL,
  INSERT_SERVING_SIZE,
  UPDATE_AMOUNT_FOOD_ENTRY,
  UPDATE_AMOUNT_FOOD_ENTRY_WITH_SERVING_SIZE,
} from "./sql";

const db = SQLite.openDatabase("food.db");

export const initializeDB = () => {
  db.transaction(
    (tx) => {
      tx.executeSql(CREATE_TABLE_FOODS);
      tx.executeSql(CREATE_TABLE_MEALS);
      tx.executeSql(CREATE_TABLE_MEAL_FOODS);
      tx.executeSql(CREATE_TABLE_SERVINGSIZE);
    },
    (error) => console.log(error)
  );
};

export const insertAllBasicFoods = async (): Promise<void> => {
  console.log("INSERTING BASIC FOODS");
  for (const food of basicFoods) {
    try {
      const insertedFood = await insertFood(food);
    } catch (error) {}
  }
};

export const insertFood = (food: FoodBeforeInsert): Promise<Food> => {
  return new Promise((resolve, reject) => {
    const {
      name,
      calories,
      protein,
      carbs,
      sugar,
      fiber,
      fat,
      salt,
      per100unit,
      servingSizes,
      barcode,
    } = food;

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
            barcode,
          ],
          (_, result) => {
            const insertedId = result.insertId;
            const insertedFood = { ...food, id: insertedId };
            servingSizes.forEach((servingSize) => {
              if (!servingSize.description || !servingSize.amount) return;
              tx.executeSql(
                INSERT_SERVING_SIZE,
                [insertedId, servingSize.description, servingSize.amount],
                (_, resultSet) => {
                  const insertedServingSizeId = resultSet.insertId;
                  const insertedServingSize: ServingSize = {
                    ...servingSize,
                    id: insertedServingSizeId,
                    food_id: insertedId,
                    description: servingSize.description,
                    amount: servingSize.amount,
                  };
                  resolve({
                    ...insertedFood,
                    servingSizes: [insertedServingSize],
                  });
                }
              );
            });
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  });
};

export const fetchAllFoods = (
  setFoods: React.Dispatch<React.SetStateAction<Food[]>>
) => {
  db.transaction(
    (tx) => {
      tx.executeSql(FETCH_ALL_FOODS, [], (_, resultSet) => {
        setFoods(resultSet.rows._array);
      });
    },
    (error) => console.log(error)
  );
};

export const fetchFoodByBarcode = (barcode: string): Promise<Food | null> => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(FETCH_FOOD_BY_BARCODE, [barcode], (_, resultSet) => {
          if (resultSet.rows.length > 0) {
            resolve(resultSet.rows.item(0));
          } else {
            resolve(null);
          }
        });
      },
      (error) => {
        console.log(error);
        reject(error);
      }
    );
  });
};

export const fetchServingSizesForFood = (id: number): any => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          FETCH_ALL_SERVING_SIZES_FOR_FOOD,
          [id],
          (_, resultSet) => {
            resolve(resultSet.rows._array);
          }
        );
      },
      (error) => {
        console.log(error);
        reject(error);
      }
    );
  });
};

export const fetchMealsForDate = (date: string): Promise<RawMealDataRow[]> => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        ["breakfast", "lunch", "dinner", "snack"].forEach((mealType) => {
          tx.executeSql(INSERT_OR_IGNORE_MEAL, [date, mealType]);
        });

        tx.executeSql(
          FETCH_MEALS_WITH_FOODS_BY_DATE,
          [date],
          (_, resultSet) => {
            resolve(resultSet.rows._array);
          }
        );
      },
      (error) => {
        console.log(error);
        reject(error);
      }
    );
  });
};

export const insertFoodEntryToMeal = (
  mealId: Meal["id"],
  entry: FoodEntryBeforeInsert
): Promise<number> => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        if ("servingSize_id" in entry && "nServings" in entry) {
          // if using a serving size from database
          tx.executeSql(
            INSERT_FOOD_TO_MEAL_WITH_SERVING_SIZE,
            [mealId, entry.food.id, entry.nServings, entry.servingSize_id],
            (_, result) => {
              const insertedMealFoodId = result.insertId;
              resolve(insertedMealFoodId);
            }
          );
        } else if ("customAmount" in entry) {
          // if using a custom amount instead
          tx.executeSql(
            INSERT_FOOD_TO_MEAL,
            [mealId, entry.food.id, entry.customAmount],
            (_, result) => {
              const insertedMealFoodId = result.insertId;
              resolve(insertedMealFoodId);
            }
          );
        } else
          throw new Error(
            "No serving size or custom amount provided for food entry"
          );
      },
      (error) => {
        console.log(error);
        reject(error);
      }
    );
  });
};

export const deleteFoodEntry = (entryId: number): Promise<number> => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(DELETE_FOOD_ENTRY, [entryId], (_, result) => {
          resolve(result.rowsAffected);
        });
      },
      (error) => {
        console.log(error);
        reject(error);
      }
    );
  });
};

export const updateAmountToFoodEntry = (
  entryId: FoodEntry["id"],
  entry: FoodEntryBeforeInsert
): Promise<number> => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        if ("servingSize_id" in entry && "nServings" in entry) {
          // if using a serving size from database
          tx.executeSql(
            UPDATE_AMOUNT_FOOD_ENTRY_WITH_SERVING_SIZE,
            [entry.nServings, entry.servingSize_id, entryId],
            (_, result) => {
              resolve(result.rowsAffected);
            }
          );
        } else if ("customAmount" in entry) {
          // if using a custom amount instead
          tx.executeSql(
            UPDATE_AMOUNT_FOOD_ENTRY,
            [entry.customAmount, entryId],
            (_, result) => {
              resolve(result.rowsAffected);
            }
          );
        } else
          throw new Error(
            "No serving size or custom amount provided for food entry"
          );
      },
      (error) => {
        console.log(error);
        reject(error);
      }
    );
  });
};

export const dropAllTables = () => {
  console.log("WARNING: DROPPING ALL TABLES");
  db.transaction((tx) => {
    // Get all table names
    tx.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';",
      [],
      (_, { rows }) => {
        let tables = rows._array.map((row) => row.name);

        // Drop each table
        tables.forEach((table) => {
          tx.executeSql(
            `DROP TABLE IF EXISTS ${table};`,
            [],
            (_, result) => {
              console.log(`Dropped ${table}`);
            },
            (error) => {
              console.log(`Error dropping ${table}: ${error}`);
              return false;
            }
          );
        });
      },
      (error) => {
        console.log("Error fetching tables: " + error);
        return false;
      }
    );
  });
};
