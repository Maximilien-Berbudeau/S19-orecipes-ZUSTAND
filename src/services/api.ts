import axios from 'axios';
import type { Credentials, Recipe } from '@/@types';

export {
  addTokenToInstance,
  removeTokenFromInstance,
  getRecipes,
  getRecipeByIdOrSlug,
  getFavorites,
  postLogin,
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

function addTokenToInstance(token: string) {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
}
function removeTokenFromInstance() {
  axiosInstance.defaults.headers.common.Authorization = '';
}

async function getRecipes() {
  const { data } = await axiosInstance.get<Recipe[]>('/recipes');
  return data;
}

async function getRecipeByIdOrSlug(payload: number | string) {
  const { data } = await axiosInstance.get<Recipe>(`/recipes/${payload}`);
  return data;
}

async function getFavorites() {
  const { data } = await axiosInstance.get('/favorites');
  return data.favorites as Recipe[];
}

async function postLogin(payload: Credentials) {
  const { data } = await axiosInstance.post('/login', payload);
  return data;
}
