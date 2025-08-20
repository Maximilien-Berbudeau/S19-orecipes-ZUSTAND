import useStore from '@/store';
import type { ListIngredient } from '@/store/types';

type ListIngredientProps = {
  ingredient: ListIngredient;
};

export default function ListIngredient({ ingredient }: ListIngredientProps) {
  const updateIngredientQuantity = useStore((state) => state.updateIngredientQuantity);
  const removeIngredientFromList = useStore((state) => state.removeIngredientFromList);

  function updateQuantity(event: React.ChangeEvent<HTMLInputElement>) {
    const quantity = parseInt(event.target.value, 10);
    if (!isNaN(quantity)) {
      updateIngredientQuantity(ingredient.id, quantity);
    }
  }

  function removeIngredient() {
    removeIngredientFromList(ingredient.id);
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
