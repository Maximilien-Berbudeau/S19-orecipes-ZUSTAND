import type { Ingredient } from '@/@types';

type ListIngredient = {
  ingredient: Omit<Ingredient, 'id'>;
};

export default function ListIngredient({ ingredient }: ListIngredient) {
  function updateQuantity() {
    throw new Error('updateQuantity not implemented.');
  }

  function removeIngredient() {
    throw new Error('removeIngredient not implemented.');
  }

  return (
    <article className="list-ingredient">
      <h3>{ingredient.name}</h3>

      <div>
        <input
          name="qty"
          type="number"
          min={0}
          value={ingredient.quantity}
          onChange={updateQuantity}
        />{' '}
        {ingredient.unit}
      </div>

      <button
        type="button"
        className="button button--ghost"
        title="Supprimer"
        onClick={removeIngredient}
      >
        X
      </button>
    </article>
  );
}
