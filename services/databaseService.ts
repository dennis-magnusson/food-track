import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("food-track.db");

const init = () => {
  console.log("hello");
};

export default { init };
