import './Header.scss';

import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router';
import type { Alert } from '@/@types';
import CartIcon from '@/assets/icons/cart.svg?react';
import * as api from '@/services/api';
import * as ls from '@/services/localStorage';

type HeaderProps = {
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  setAlert: React.Dispatch<React.SetStateAction<Alert | null>>;
  setShowList: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Header({
  isLogged,
  setIsLogged,
  setAlert,
  setShowList,
}: HeaderProps) {
  const navigate = useNavigate();

  async function login(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);

      const { pseudo, token } = await api.postLogin({
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      });

      setAlert(null);
      setIsLogged(true);
      api.addTokenToInstance(token);
      ls.saveToken(token);

      setAlert({
        status: 'success',
        message: `Bienvenue ${pseudo} !`,
      });
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
  }

  function logout() {
    setIsLogged(false);
    api.removeTokenFromInstance();
    ls.removeToken();

    navigate('/');
  }

  return (
    <header className="header">
      <img src="/logo.png" alt="O'recipes" />

      <div className="header-action">
        {isLogged && (
          <button className="button" type="button" onClick={logout}>
            Se déconnecter
          </button>
        )}

        {!isLogged && (
          <form onSubmit={login}>
            <input placeholder="Adresse e-mail" name="email" type="email" />
            <input placeholder="Mot de passe" name="password" type="password" />
            <button type="submit" className="button">
              OK
            </button>
          </form>
        )}

        <button
          type="button"
          className="button button--dark button--tag"
          data-count={3}
          aria-label={`Afficher la liste des ingrédients (${3} éléments)`}
          onClick={() => setShowList((show) => !show)}
        >
          <CartIcon className="cart-icon" />
        </button>
      </div>
    </header>
  );
}
