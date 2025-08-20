import './Sidebar.scss';

import { NavLink } from 'react-router';

import type { Recipe } from '@/@types';

type SidebarProps = {
  recipes: Recipe[];
  isLogged: boolean;
};

export default function SideBar({ recipes, isLogged }: SidebarProps) {
  return (
    <nav className="sidebar">
      <ul>
        <li>
          <NavLink to="/">Accueil</NavLink>
        </li>

        {isLogged && <NavLink to="/favorites">Mes recettes préférées</NavLink>}

        {Array.isArray(recipes) && recipes.map((recipe) => (
          <li key={recipe.id}>
            <NavLink to={`/recipe/${recipe.slug}`}>{recipe.title}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
