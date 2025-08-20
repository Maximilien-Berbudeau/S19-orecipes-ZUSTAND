import './List.scss';

import useStore from '@/store';
import ListIngredient from './ListIngredient';

export default function List() {
  const ingredients = useStore((state) => state.ingredients);
  const clearIngredientsList = useStore((state) => state.clearIngredientsList);

  return (
    <aside className="list list--open">
      <div className="list-top">
        <h2>Votre liste</h2>
        <button 
          type="button" 
          className="list-empty button button--ghost"
          onClick={clearIngredientsList}
        >
          Vider
        </button>
      </div>

      <section className="list-ingredients">
        {ingredients.map((ingredient) => (
          <ListIngredient key={ingredient.id} ingredient={ingredient} />
        ))}
      </section>
    </aside>
  );
}
