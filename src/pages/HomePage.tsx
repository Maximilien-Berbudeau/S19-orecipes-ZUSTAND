import type { Recipe } from '@/@types';
import Card from '@/components/Card/Card';

type HomePageProps = {
  recipes: Recipe[];
};

export default function HomePage({ recipes }: HomePageProps) {
  return (
    <main className="home">
      <h1>Les recettes</h1>
      <p>Voici nos {recipes.length} recettes</p>

      <div className="card-group">
        {recipes.map((recipe) => (
          <Card key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </main>
  );
}
