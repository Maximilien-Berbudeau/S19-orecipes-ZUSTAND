import './Card.scss';

import { Link } from 'react-router';

import type { Recipe } from '@/@types';

type CardProps = {
  recipe: Recipe;
};

export default function Card({ recipe }: CardProps) {
  return (
    <article className="card">
      <div className="card-image">
        <img src={recipe.thumbnail} alt={recipe.title} />
      </div>

      <div className="card-content">
        <div>
          <h2>{recipe.title}</h2>

          <div className="card-meta">Difficulté&nbsp;: {recipe.difficulty}</div>
        </div>

        <Link to={`/recipe/${recipe.slug}`} className="button button--wide">
          Voir la recette
        </Link>
      </div>
    </article>
  );
}
