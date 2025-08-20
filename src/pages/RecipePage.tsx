import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import type { Recipe } from '@/@types';
import Spinner from '@/components/ui/Spinner/Spinner';
import useStore from '@/store';
import * as api from '@/services/api';

export default function RecipePage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  
  const addIngredientToList = useStore((state) => state.addIngredientToList);
  const setAlert = useStore((state) => state.setAlert);

  function handleAddIngredientsToList() {
    if (recipe) {
      recipe.ingredients.forEach((ingredient) => {
        addIngredientToList(ingredient);
      });
      
      setAlert({
        status: 'success',
        message: `${recipe.ingredients.length} ingrédient(s) ajouté(s) à votre liste !`
      });
    }
  }

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const data = await api.getRecipeByIdOrSlug(slug ?? 1);
        setRecipe(data);
      } catch (_error) {
        navigate('/page-non-trouvée');
      }
    }

    fetchRecipe();
  }, [slug, navigate]);

  if (!recipe) {
    return <Spinner />;
  }

  return (
    <main className="recipe">
      <div className="recipe-header">
        <div className="recipe-title">
          <h1>{recipe.title}</h1>
          <p>
            {recipe.author} – {recipe.difficulty}
          </p>
          <button 
            type="button" 
            className="button"
            onClick={handleAddIngredientsToList}
          >
            Ajouter les ingrédients à la liste
          </button>
        </div>
        <img src={recipe.thumbnail} alt={recipe.title} />
      </div>

      <ul className="recipe-ingredients">
        {recipe.ingredients.map((ingredient) => (
          <li key={ingredient.id}>
            <span>
              {ingredient.quantity} {ingredient.unit}
            </span>
            {ingredient.name}
          </li>
        ))}
      </ul>

      <ul className="recipe-steps">
        {recipe.instructions.map((instruction) => (
          <li key={instruction}>{instruction}</li>
        ))}
      </ul>
    </main>
  );
}
