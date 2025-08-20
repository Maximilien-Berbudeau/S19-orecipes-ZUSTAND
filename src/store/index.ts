import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { GlobalState } from './types';

// Configuration du store principal avec middlewares
export const useStore = create<GlobalState>()(
  devtools(
    immer((set) => ({
      
      ingredients: [],
      
      addIngredientToList: (ingredient) =>
        set((state) => {
          const existingIngredient = state.ingredients.find(
            (item) => item.id === ingredient.id
          );
          
          if (existingIngredient) {
            existingIngredient.quantity += ingredient.quantity;
          } else {
            state.ingredients.push({ ...ingredient });
          }
        }),
      
      removeIngredientFromList: (id) =>
        set((state) => {
          state.ingredients = state.ingredients.filter(
            (ingredient) => ingredient.id !== id
          );
        }),
      
      updateIngredientQuantity: (id, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            state.ingredients = state.ingredients.filter(
              (ingredient) => ingredient.id !== id
            );
          } else {
            const ingredient = state.ingredients.find((item) => item.id === id);
            if (ingredient) {
              ingredient.quantity = quantity;
            }
          }
        }),
      
      clearIngredientsList: () =>
        set((state) => {
          state.ingredients = [];
        }),

      recipes: [],
      isLoading: false,
      error: null,
      
      setRecipes: (recipes) =>
        set((state) => {
          state.recipes = recipes;
          state.error = null;
        }),
      
      setLoading: (loading) =>
        set((state) => {
          state.isLoading = loading;
        }),
      
      setError: (error) =>
        set((state) => {
          state.error = error;
        }),
      
      fetchRecipes: async () => {
        const { isAxiosError } = await import('axios');
        const api = await import('@/services/api');
        
        set((state) => {
          state.isLoading = true;
          state.error = null;
        });
        
        try {
          const recipes = await api.getRecipes();
          set((state) => {
            state.recipes = recipes;
            state.isLoading = false;
            state.error = null;
          });
        } catch (error) {
          const message = isAxiosError(error) || error instanceof Error
            ? error.message
            : 'Erreur inconnue';
          
          set((state) => {
            state.error = message;
            state.isLoading = false;
          });
        }
      },

      isLogged: false,
      
      login: () =>
        set((state) => {
          state.isLogged = true;
        }),
      
      logout: () =>
        set((state) => {
          state.isLogged = false;
        }),

      alert: null,
      showList: false,
      
      setAlert: (alert) =>
        set((state) => {
          state.alert = alert;
        }),
      
      clearAlert: () =>
        set((state) => {
          state.alert = null;
        }),
      
      toggleList: () =>
        set((state) => {
          state.showList = !state.showList;
        }),
      
      showListPanel: () =>
        set((state) => {
          state.showList = true;
        }),
      
      hideListPanel: () =>
        set((state) => {
          state.showList = false;
        }),
    })),
    {
      name: 'orecipes-store',
    }
  )
);

export default useStore;
