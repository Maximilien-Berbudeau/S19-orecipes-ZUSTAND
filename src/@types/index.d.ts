export type Recipe = {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  author: string;
  difficulty: string;
  description: string;
  instructions: string[];
  ingredients: Ingredient[];
};

export type Ingredient = {
  name: string;
  id: number;
  quantity: number;
  unit: string;
};

export type Credentials = {
  email: string;
  password: string;
};

export type Alert = {
  status: 'error' | 'success';
  message: string;
};
