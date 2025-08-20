# S19E05 - Atelier Zustand

On externalise la gestion de nos états !

## Objectifs pédagogiques

- **Implémenter** un store avec Zustand

## Étapes

- Ajouter Zustand au projet
- Utiliser Zustand et manipuler le state pour faire évoluer le composant liste
  - page recette → ajouter à la liste (ou incrémenter la quantité si existant)
  - liste :
    - bouton « vider la liste »
    - bouton « supprimer l'ingrédient »
    - input « modifier la quantité » (ou supprimer si quantité à 0)
  
> **NOTE** n'hésite pas à ajouter des middlewares comme `devtools` et/ou `immer`
>
> **NOTE 2** à l'ajout de middleware, il est parfois nécessaire de relancer le serveur TS
> pour supprimer une « fausse » erreur → `F1 > TypeScript: restart server`

## Bonus

- Gérer les recettes, récupérées depuis l'API, dans le store

> **NOTE** tu peux aussi essayer de séparer ton store en slices

### Bonus 2

Remplace le maximum d'états (`useState`) par une gestion centralisée dans le store…  
Attention aux pièges !
