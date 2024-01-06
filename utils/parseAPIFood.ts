import { Food } from "../types";

type FoodNoID = Omit<Food, "id">;

function parseAPIFood(rawFood: any, barcode: string): FoodNoID {
  // Extracting the relevant fields from the rawFood object
  const product = rawFood.product;
  const nutriments = product.nutriments;

  // Creating the Food object
  const food: FoodNoID = {
    name: product.product_name,
    calories: nutriments["energy-kcal_100g"] || 0,
    protein: nutriments.proteins_100g || 0,
    fat: nutriments.fat_100g || 0,
    carbs: nutriments.carbohydrates_100g || 0,
    sugar: nutriments.sugars_100g,
    fiber: nutriments.fiber_100g,
    salt: nutriments.salt_100g,
    per100unit: "g", // Assuming all measurements are in grams
    servingSizes: [], // No serving size data available from the API
    barcode: barcode,
  };

  return food;
}

export default parseAPIFood;
