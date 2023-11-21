# Kelbongoo

## Description
L'application web conçue offre deux interfaces distinctes : une pour les administrateurs et une pour les clients. Les administrateurs peuvent créer des produits visibles par les clients. Les clients, quant à eux, peuvent choisir la quantité de chaque produit à commander, voir le total de leur commande et valider leur panier.

## Technologies utilisées
- **Frontend**: ReactJS
- **Routing**: react-router-dom
- **Backend**: Serverless sur Vercel
- **Base de Données**: MySQL (phpMyAdmin)
- **Autres**: UUIDv4 pour la génération de certains IDs

## Installation et configuration
Pour installer le projet:
1. Clonez le dépôt.
2. Exécutez `npm install` pour installer les dépendances : mysql, react-router-dom, uuid.
3. Utilisez le CLI de Vercel, connectez-vous, puis lancez le mode développement avec `verdel dev`.
4. Testez sur le lien donné, généralement localhost:3000.

Pour tester le projet:
- Visitez [Kelbongoo](https://kelbongoo.vercel.app/) pour une démo en ligne (plus pratique !).
- Ou lancez le projet localement avec le CLI Vercel après l'avoir importé dans votre compte Vercel.
- Ou lancez le projet localement en récupérant les tables dans le dossier "./BDD" et en les important dans votre base de données local (ne pas oublier de changer les informations relatives à la connexion à la base de données dans /utils/db.js).

## Utilisation
Utilisez le bouton en haut de la page pour naviguer entre les vues Administrateur et Client. Chaque vue offre des fonctionnalités spécifiques :
- **Vue Administrateur** : Création, visualisation et suppression de produits.
- **Vue Client** : Sélection de produits, gestion de la quantité souhaitée, visualisation du total (prix TTC et quantité), et validation du panier.

## Fonctionnalités
- Création et suppression de produits par les administrateurs.
- Création de panier et enregistrement pour les visiteurs.
- Création, modification et suppresion d'items dans le panier des clients en temps réel.
- Achat de produits (validation du panier) par les clients.

## Axes d'amélioration

1. **Modification des produits par les administrateurs**
   - Ajouter la possibilité pour un administrateur de modifier un produit existant.

2. **Confirmation de suppression de produit**
   - Implémenter un système demandant à l'administrateur de confirmer la suppression définitive d'un produit.

3. **Vérification de l'unicité du nom de produit**
   - Lors de la création d'un nouveau produit, vérifier si un produit avec un nom similaire existe déjà. 
   - Si c'est le cas, afficher un modal ou un pop-up informant l'administrateur avec les données du produit existant, avec une option pour fermer la fenêtre.

4. **Notifications de confirmation**
   - Afficher des notifications en bas de la page pour confirmer la création réussie ou pas d'un produit.

5. **Notifications pour les actions sur le panier**
   - Afficher des notifications en bas de la page pour confirmer la validation réussie ou pas d'un panier.

6. **Prévisualisation du prix TTC dans le formulaire administrateur**
   - Permettre aux administrateurs de voir le prix TTC d'un produit lors de la saisie du produit.
   - Offrir la possibilité de définir le prix HT en se basant sur le prix TTC souhaité.

## Captures d'écran
Vue administrateur : 

![Vue Administrateur](https://zupimages.net/up/23/47/sl9h.png)

Vue catalogue :

![Vue Catalogue](https://zupimages.net/up/23/47/thq0.png)

Table "products" :

![Table "products"](https://zupimages.net/up/23/47/enmg.png)

Table "items" :

![Table "items"](https://zupimages.net/up/23/47/7u89.png)

Table "carts" :

![Table "carts"](https://zupimages.net/up/23/47/hduf.png)