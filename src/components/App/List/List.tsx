import './List.scss';

import type { Ingredient } from '@/@types';
import ListIngredient from './ListIngredient';

const ingredients: Omit<Ingredient, 'id'>[] = [
  {
    name: 'beurre de cacahuètes crunchy',
    quantity: 120,
    unit: 'g',
  },
  {
    name: 'œuf',
    quantity: 3,
    unit: '',
  },
  {
    name: 'sel',
    quantity: 3,
    unit: 'pincée',
  },
];

export default function List() {
  return (
    <aside className="list list--open">
      <div className="list-top">
        <h2>Votre liste</h2>
        <button type="button" className="list-empty button button--ghost">
          Vider
        </button>
      </div>

      <section className="list-ingredients">
        {ingredients.map((ingredient) => (
          <ListIngredient key={ingredient.name} ingredient={ingredient} />
        ))}
      </section>
    </aside>
  );
}
