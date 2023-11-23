import * as SQLite from "expo-sqlite";
import { Food, FoodEntry, Meal, RawMealDataRow } from "../types";
import {
  CREATE_TABLE_FOODS,
  CREATE_TABLE_MEALS,
  CREATE_TABLE_MEAL_FOODS,
  FETCH_ALL_FOODS,
  FETCH_MEALS_WITH_FOODS_BY_DATE,
  INSERT_FOOD,
  INSERT_FOOD_TO_MEAL,
  INSERT_OR_IGNORE_MEAL,
  UPDATE_AMOUNT_FOOD_ENTRY,
} from "./sql";

const db = SQLite.openDatabase("food.db");

export const initializeDB = () => {
  db.transaction(
    (tx) => {
      tx.executeSql(CREATE_TABLE_FOODS);
      tx.executeSql(CREATE_TABLE_MEALS);
      tx.executeSql(CREATE_TABLE_MEAL_FOODS);
    },
    (error) => console.log(error)
  );
};

// export const populateBasicFoods = () => {
//   basicFoods.forEach((food) => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         "INSERT INTO Food (name, calories, protein, carbs, sugar, fiber, fat, salt, per100unit) SELECT ?, ?, ?, ?, ?, ?, ?, ?, ? WHERE NOT EXISTS (SELECT 1 FROM Food WHERE name = ?)",
//         [...food, food[0]],
//         () => {},
//         (_, error) => console.log(error)
//       );
//     });
//   });
// };

export const insertFood = (food: Omit<Food, "id">): Promise<Food> => {
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
    } = food;

    db.transaction(
      (tx) => {
        tx.executeSql(
          INSERT_FOOD,
          [name, calories, protein, carbs, sugar, fiber, fat, salt, per100unit],
          (_, result) => {
            const insertedId = result.insertId;
            const insertedFood = { ...food, id: insertedId };
            resolve(insertedFood);
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
  entry: Omit<FoodEntry, "id" | "meal_id">
): Promise<number> => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          INSERT_FOOD_TO_MEAL,
          [mealId, entry.food.id, entry.amount],
          (_, result) => {
            const insertedMealFoodId = result.insertId;
            resolve(insertedMealFoodId);
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

export const updateAmountToFoodEntry = (
  entryId: number,
  newAmount: number
): Promise<number> => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          UPDATE_AMOUNT_FOOD_ENTRY,
          [newAmount, entryId],
          (_, result) => {
            resolve(result.rowsAffected);
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
