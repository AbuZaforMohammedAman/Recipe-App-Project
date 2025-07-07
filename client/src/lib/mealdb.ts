import { MealDBRecipe, Recipe } from "@/types/recipe";

export function transformMealDBRecipe(mealData: MealDBRecipe): Recipe {
  const ingredients = [];
  
  // Extract ingredients and measures
  for (let i = 1; i <= 20; i++) {
    const ingredient = mealData[`strIngredient${i}` as keyof MealDBRecipe];
    const measure = mealData[`strMeasure${i}` as keyof MealDBRecipe];
    
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        name: ingredient.trim(),
        measure: measure?.trim() || '',
      });
    }
  }

  return {
    id: mealData.idMeal,
    name: mealData.strMeal,
    category: mealData.strCategory,
    area: mealData.strArea,
    instructions: mealData.strInstructions,
    image: mealData.strMealThumb,
    tags: mealData.strTags ? mealData.strTags.split(',').map(tag => tag.trim()) : [],
    youtube: mealData.strYoutube,
    ingredients,
    source: mealData.strSource,
  };
}

export function estimateCookingTime(instructions: string): string {
  // Simple estimation based on instruction keywords
  const text = instructions.toLowerCase();
  
  if (text.includes('overnight') || text.includes('24 hours')) {
    return '24+ hours';
  }
  if (text.includes('2 hours') || text.includes('120 minutes')) {
    return '2 hours';
  }
  if (text.includes('1 hour') || text.includes('60 minutes')) {
    return '1 hour';
  }
  if (text.includes('45 minutes')) {
    return '45 mins';
  }
  if (text.includes('30 minutes')) {
    return '30 mins';
  }
  if (text.includes('20 minutes')) {
    return '20 mins';
  }
  if (text.includes('15 minutes')) {
    return '15 mins';
  }
  if (text.includes('10 minutes')) {
    return '10 mins';
  }
  if (text.includes('5 minutes')) {
    return '5 mins';
  }
  
  // Default estimation based on number of ingredients
  const ingredientCount = text.split(',').length;
  if (ingredientCount > 15) {
    return '45+ mins';
  }
  if (ingredientCount > 10) {
    return '30 mins';
  }
  return '20 mins';
}
