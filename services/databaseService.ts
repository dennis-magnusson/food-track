import * as SQLite from "expo-sqlite";
import { basicFoods } from "../constants/basicFoods";
import {
  CREATE_TABLE_FOODS,
  CREATE_TABLE_MEALS,
  CREATE_TABLE_MEAL_FOODS,
  CREATE_TABLE_RECIPES,
  CREATE_TABLE_RECIPE_FOODS,
  FETCH_ALL_FOODS,
  INSERT_FOOD,
} from "./sql";

const db = SQLite.openDatabase("mydb.db");

export const initializeDB = () => {
  db.transaction(
    (tx) => {
      tx.executeSql(CREATE_TABLE_FOODS);
      tx.executeSql(CREATE_TABLE_RECIPES);
      tx.executeSql(CREATE_TABLE_RECIPE_FOODS);
      tx.executeSql(CREATE_TABLE_MEALS);
      tx.executeSql(CREATE_TABLE_MEAL_FOODS);
    },
    (error) => console.log(error)
  );
};

export const populateBasicFoods = () => {
  basicFoods.forEach((food) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO Food (name, calories, protein, carbs, sugar, fiber, fat, salt, per100unit) SELECT ?, ?, ?, ?, ?, ?, ?, ?, ? WHERE NOT EXISTS (SELECT 1 FROM Food WHERE name = ?)",
        [...food, food[0]],
        () => {},
        (_, error) => console.log(error)
      );
    });
  });
};

export const insertFood = (food) => {
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
      tx.executeSql(INSERT_FOOD, [
        name,
        calories,
        protein,
        carbs,
        sugar,
        fiber,
        fat,
        salt,
        per100unit,
      ]);
    },
    (error) => console.log(error)
  );
};

export const fetchAllFoods = (setFoods) => {
  db.transaction(
    (tx) => {
      tx.executeSql(FETCH_ALL_FOODS, [], (_, { rows: { _array } }) => {
        setFoods(_array);
      });
    },
    (error) => console.log(error)
  );
};
