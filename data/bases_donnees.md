# Bases de données

# Nommage

L'écriture du nom des tables varie selon leur utilisation :

- `Users` ou `Fiches_produit` : nom d'une table, débute par une majuscule et au pluriel.
- `User_Token` : la table fait le lien entre les données de la table `User` et la table `Token`

Le nom des colonnes (métadonnées) doit être en minuscule et peut éventuellement être en plusieurs mots séparés par des *underscores* comme `user_id`.

Toutes les clés primaires sont appelées `id`. Pour nommer une clé étrangère, on la nommera selon la table pointée tel que `id_user` est une clé étrangère pointant vers la table `Users`.