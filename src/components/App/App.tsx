import './App.scss';

import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import FavoritesPage from '@/pages/FavoritesPage';
import HomePage from '@/pages/HomePage';
import NotFoundPage from '@/pages/NotFoundPage';
import RecipePage from '@/pages/RecipePage';
import useStore from '@/store';
import * as api from '@/services/api';
import * as ls from '@/services/localStorage';

import Notification from '../ui/Notification/Notification';
import Spinner from '../ui/Spinner/Spinner';
import Header from './Header/Header';
import List from './List/List';
import SideBar from './Sidebar/Sidebar';

export default function App() {
  const location = useLocation();

  const [isLogged, setIsLogged] = useState(false);

  const isLoading = useStore((state) => state.isLoading);
  const fetchRecipes = useStore((state) => state.fetchRecipes);
  const alert = useStore((state) => state.alert);
  const setAlert = useStore((state) => state.setAlert);
  const showList = useStore((state) => state.showList);

  useEffect(() => {
    function getToken() {
      const token = ls.getToken();

      if (token) {
        api.addTokenToInstance(token);
        setIsLogged(true);
      }
    }

    fetchRecipes();
    getToken();
  }, [fetchRecipes]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll when URL changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {alert && <Notification alert={alert} setAlert={setAlert} />}

      <div className="app">
        <div className="app-content">
          <SideBar isLogged={isLogged} />

          <div className="content">
            <Header
              isLogged={isLogged}
              setIsLogged={setIsLogged}
              setAlert={setAlert}
            />

            <hr />

            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/recipe/:slug" element={<RecipePage />} />

              {isLogged && (
                <Route
                  path="/favorites"
                  element={<FavoritesPage setAlert={setAlert} />}
                />
              )}

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>

        <div className={showList ? 'app-list app-list--expanded' : 'app-list'}>
          <List />
        </div>
      </div>
    </>
  );
}
