import Card from '@/components/Card/Card';
import useStore from '@/store';

export default function HomePage() {
  const recipes = useStore((state) => state.recipes);

  return (
    <main className="home">
      <h1>Les recettes</h1>
      <p>Voici nos {recipes?.length || 0} recettes</p>

      <div className="card-group">
        {Array.isArray(recipes) && recipes.map((recipe) => (
          <Card key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </main>
  );
}
