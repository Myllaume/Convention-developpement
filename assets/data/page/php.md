# PHP

## Généralités

- Si le fichier ne contient que du PHP, ne pas utiliser la balise fermante `?>` en fin de documents.
- Nommage des entités :
    - Les variables et fonctions sont nommées en minuscule, éventuellement avec des *underscore*.
    - Les constantes sont nommées en majuscule, éventuellement avec des *underscore*.
    - Les classes sont nommées avec une majuscule, éventuellement avec des *underscore*.
- Ne pas utiliser ``print()`` mais ``echo``.
- Pour des raisons de performance et pour faciliter la concaténation, toujours utiliser les guillemets simples pour délimiter les chaines de caractères.

```php
// On évitera
echo "Je m'appelle $prenom $nom";

// On préfèrera
echo 'Je m\'apelle '$prenom . ' ' . $nom;
```

- Éviter au maximum d'écrire du HTML en PHP et faire des insertions et conditions démaquées.

```php
<?php if ($can_access): ?>
<p>Bienvenue <?= $nom ?>.</p>
<?php else: ?>
<p>Aucun accès...</p>
<?php endif; ?>

<ul>
<?php foreach($tableau as $cle => $valeur): ?>
	<li><?= $valeur ?></li>
<?php endforeach; ?>
</ul>
```

## Commentaires

Les commentaires PHP recourent à [différents tags](https://docs.phpdoc.org/latest/guides/docblocks.html##list-of-tags) pour rapporter certaines métadonnées aux lecteurs, voire pour générer de la documentation à partir du code avec *phpDocumentor*.

### Fichiers

Au début des fichiers on peut renseigner le tag `@category` pour relier le fichier à un ensemble, le `@author` pour indiquer un auteur, mais aussi une licence avec `@license`. On peut aussi signaler des tâches `@todo` qui restent à réaliser dans le fichier.

```php
/**
 * Class Users
 * Liée à la table 'Users' de la bdd
 * @category class
 * @author Guillaume Brioudes <guillaume.brioudes@myllaume.fr>
 * @license Creative Commons BY-SA 4.0
 * @todo liaison avec la session
 */
```

### Fonctions et méthodes

On précise pour les fonctions après le tag `@param` quels sont les paramètres et leur type à entrer, après `@trows` les exceptions jetées, après `@return` les valeurs retournées par la fonction et leur type.

```php
/**
 * Hashage d'un mot de passe
 * @param string $password mot de passe utilisateur de minimum '$pwd_length'
 * caractères avec minuscules, majuscules, chiffres et caract. spéciaux
 * @param int $pwd_length longueure du mot de passe
 * @throws string mot de passe non conforme
 * @return string mot de passe hashé
 */

function hash_password($password, $pwd_length) {
    if (strlen($var) < $pwd_length ||
        !preg_match('##^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W)##', $var)) {

        throw new Exception('Le mot de passe n\'est pas conforme.');
    }

    $password_hashed = password_hash($password, PASSWORD_DEFAULT);
}
```

## Traitement de données

### Conditionnelles

Les tests doivent être fait avec des constantes pour un code bien lisible.

```php
const MAX_USER = 50;

if ($nb_user < MAX_USER) {
    // traitement
}
```

Les conditionnelles doivent être rigoureusement établies, ne pas laisser de doute possible sur les valeurs à obtenir.

```php
// on évitera

if ($array) {
	// traitement
}

if ($is_not_null) {
	// traitement
}

// on préfèrera

if (!empty($array)) {
	// traitement
}

if ($is_not_null != 0) {
	// traitement
}
```

### Base de données

Bonne pratiques pour gérer des données via PHP  en orienté objet :

- Bien [sécuriser les requêtes SQL](?view=code&title=requete-SQL-securisees_php) et les données qui en ressortent.

## Performances et lisibilité

Chaque variable, boucle, inclusion nécessite des ressources et il faut envisager, lorsque c'est possible, d'adapter sa méthode afin de soulager le serveur. Le **bon sens** et les indications suivantes permettent de limiter l'impact ; toujours est-il qu'une page statique HTML est ce qu'il y a de mieux – faire du cache.

- Traquer et corriger les erreurs PHP.
- Ne pas utiliser ``include_once`` et ``require_once``, mais ``include`` et ``require``.
- Décharger la mémoire en détruisant les variables avec ``unset()``.

```php
// Destruction de plusieurs variables
unset($var1, $var2);
```

- Utiliser ``switch`` plutôt qu'une succession de ``if() {} elseif () {} else {}``.

### Orienté objet

S'il ne faut pas en abuser (le procédural reste plus rapide), le développement orienté objet fournit un code plus lisible. Il garantit l'[intégrité des données](?view=code&title=ascenseurs_php) et permet d'isoler des fonctionnalités.