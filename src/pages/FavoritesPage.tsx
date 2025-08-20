import { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';
import type { Alert, Recipe } from '@/@types';
import Card from '@/components/Card/Card';
import * as api from '@/services/api';

type FavoritesPageProps = {
  setAlert: React.Dispatch<React.SetStateAction<Alert | null>>;
};

export default function FavoritesPage({ setAlert }: FavoritesPageProps) {
  const [favorites, setFavorites] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchFavRecipes = async () => {
      try {
        const data = await api.getFavorites();
        setFavorites(data);
      } catch (error) {
        const message =
          isAxiosError(error) || error instanceof Error
            ? error.message
            : 'code inconnu';

        setAlert({
          status: 'error',
          message,
        });
      }
    };
    fetchFavRecipes();
  }, [setAlert]);

  return (
    <main className="home">
      <h1>Mes recettes préférées</h1>

      <div className="card-group">
        {favorites.map((favorite) => (
          <Card key={favorite.id} recipe={favorite} />
        ))}
      </div>
    </main>
  );
}
