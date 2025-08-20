import type { Recipe, Ingredient, Alert } from '@/@types';

export interface ListIngredient extends Ingredient {

  id: number;
}


export interface IngredientsListState {
  ingredients: ListIngredient[];
  addIngredientToList: (ingredient: Ingredient) => void;
  removeIngredientFromList: (id: number) => void;
  updateIngredientQuantity: (id: number, quantity: number) => void;
  clearIngredientsList: () => void;
}

export interface RecipesState {
  recipes: Recipe[];
  isLoading: boolean;
  error: string | null;
  setRecipes: (recipes: Recipe[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  fetchRecipes: () => Promise<void>;
}

export interface AuthState {
  isLogged: boolean;
  login: () => void;
  logout: () => void;
}

export interface UIState {
  alert: Alert | null;
  showList: boolean;
  setAlert: (alert: Alert | null) => void;
  clearAlert: () => void;
  toggleList: () => void;
  showListPanel: () => void;
  hideListPanel: () => void;
}

export interface GlobalState 
  extends IngredientsListState, 
          RecipesState, 
          AuthState, 
          UIState {}
