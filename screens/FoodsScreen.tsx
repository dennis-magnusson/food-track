import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import FoodsList from "../components/FoodsList";
import MySafeAreaView from "../components/MySafeAreaView";
import { fetchAllFoods } from "../db";

const FoodsScreen = () => {
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    fetchAllFoods()
      .then((foods) => setFoods(foods))
      .catch((error) => console.log(error));
  }, []);

  return (
    <MySafeAreaView>
      <ScrollView>
        <FoodsList foods={foods} />
      </ScrollView>
    </MySafeAreaView>
  );
};

export default FoodsScreen;
