import './Sidebar.scss';

import { NavLink } from 'react-router';
import useStore from '@/store';

type SidebarProps = {
  isLogged: boolean;
};

export default function SideBar({ isLogged }: SidebarProps) {
  const recipes = useStore((state) => state.recipes);

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
