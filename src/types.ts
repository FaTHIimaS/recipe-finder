export type Screen = 'home' | 'results' | 'detail' | 'saved';

export interface Ingredient {
  name: string;
  amount: string;
  pantryCategory?: string;
}

export interface Recipe {
  id: string;
  title: string;
  cookTime: string; // e.g. "25 mins"
  prepTime?: string; // e.g. "10 mins"
  totalTimeMinutes: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Intermediate' | 'Master' | string;
  calories?: number;
  category: 'Pasta' | 'Salad' | 'Soup' | 'Stir-Fry' | 'Breakfast' | 'Curry' | 'Bake' | string;
  dietary?: string[]; // e.g. "Vegetarian", "Gluten-Free"
  image: string;
  imageAlt: string;
  description: string;
  ingredients: Ingredient[];
  steps: string[];
  tips?: string;
  authorNote?: string;
  isAiGenerated?: boolean;
}

export interface MatchedRecipe extends Recipe {
  matchedIngredientsCount: number;
  missingIngredients: string[];
  matchPercentage: number;
}
