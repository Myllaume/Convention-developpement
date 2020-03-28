# PHP

[10 bonnes pratiques en PHP](https://www.arthurweill.fr/guide-des-bonnes-pratiques-php/)

# Généralités

- Si le fichier ne contient que du PHP, ne pas utiliser la balise fermante `?>` en fin de documents.
- Nommage des entités
    - Les variables et fonctions sont nommées en minuscule, éventuellement avec des *underscore*.
    - Les constantes sont nommées en majuscule, éventuellement avec des *underscore*.
    - Les classes sont nommées avec une majuscule, éventuellement avec des *underscore*.
- Pour des raisons de performance et pour faciliter la concaténation, toujours utiliser les guillemets simples pour délimiter les chaines de caractères.

        // On évitera
        echo "Je m'appelle $prenom $nom";
        
        // On préfèrera
        echo 'Je m\'apelle '$prenom . ' ' . $nom;

- Éviter au maximum d'écrire du HTML en PHP et faire des insertions et conditions démaquées.

        <?php
        $boolean = true;
        $nom_by_pdo = 'Guillaume Brioudes';
        $pdo_array = [...];
        ?>
        
        /**
        * Si '$boolean' est true, afficher le nom
        * sinon afficher "Aucun nom n'est entré."
        */
        
        <?php if ($boolean): ?>
        <p class="valid">Votre nom est <?= $nom_by_pdo ?>.</p>
        <?php else: ?>
        <p class="error">Aucun nom n'est entré.</p>
        <?php endif; ?>
        
        /**
        * Pour chaque élément entré dans la base de données
        * l'ajouter à la liste
        */
         
        <ul>
        <?php foreach($pdo_array as $elt): ?>
        <li><?= $elt ?></li>
        <?php endforeach; ?>
        </ul>

# Commentaires

Les commentaires PHP recourent à [différents tags](https://docs.phpdoc.org/latest/guides/docblocks.html#list-of-tags) pour rapporter certaines métadonnées aux lecteurs, voire pour générer de la documentation à partir du code avec *phpDocumentor*.

## Fichiers

Au début des fichiers on peut renseigner le tag `@category` pour relier le fichier à un ensemble, le `@author` pour indiquer un auteur, mais aussi une licence avec `@license`. On peut aussi signaler des tâches `@todo` qui restent à réaliser dans le fichier.

    /**
     * Class Users
     * Liée à la table 'Users' de la bdd
     * @category class
     * @author Guillaume Brioudes <guillaume.brioudes@myllaume.fr>
     * @license Creative Commons BY-SA 4.0
     * @todo liaison avec la session
     */

## Fonctions et méthodes

On précise pour les fonctions après le tag `@param` quels sont les paramètres et leur type à entrer, après `@trows` les exceptions jetées, après `@return` les valeurs retournées par la fonction et leur type.

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
    		!preg_match('#^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W)#', $var)) {
    
    		throw new Exception('Le mot de passe n\'est pas conforme.');
    	}
    
    	$password_hashed = password_hash($password, PASSWORD_DEFAULT);
    }

# Traitement de données

## Conditionnelles

Les tests doivent être fait avec à des constantes pour un code bien lisible.

    const MAX_USER = 50;
    
    if ($nb_user < MAX_USER) {
    	// traitement
    }

Les conditionnelles doivent être rigoureusement établies, ne pas laisser de doute possible sur les valeurs à obtenir.

    // on évitera
    
    if ($array) {
    	// traitement
    }
    
    if ($is_not_null) {
    	// traitement
    }
    
    if ($is_not_false) {
    	// traitement
    }
    
    // on préfèrera
    
    if (!empty($array)) {
    	// traitement
    }
    
    if ($is_not_null != 0) {
    	// traitement
    }
    
    if ($is_not_false != false) {
    	// traitement
    }

## Orienté objet

Le traitement des données avec PHP doit être effectué en orienté objet. Voici quelques bonnes pratiques pour l'intégrité des données :

- Les ascenseurs ascendants doivent tester les valeurs en entrée et interrompre le processus en cas d'erreur.

        function set_courriel($var) {
        	if (!filter_var($var, FILTER_VALIDATE_EMAIL)) {
        		throw new Exception('Ce n\'est pas une adresse courriel valide.');
        	}
                
        	$this->courriel = strval($var); // typage de la donnée
        }

## Base de données

Bonne pratiques pour gérer des données via PHP  en orienté objet :

- Bien sécuriser les requêtes SQL et les données qui en ressortent.

        function select_user($bdd) {
        	try {
        		$sql_select_user = $bdd->prepare('SELECT * FROM users WHERE id=:id AND courriel=:courriel');
        		$ok_select_user = $sql_select_user->bindValue(':id', $this->id, PDO::PARAM_INT); // valeur numérique
        		$ok_select_user &= $sql_select_user->bindValue(':courriel', $this->courriel, PDO::PARAM_STR); // valeur chaine de caractère
        		$ok_select_user &= $sql_select_user->execute();
        
        		if (!$ok_select_user) {
        			throw new Exception('Erreur de séléction de l\'utilisateur dans la bdd.');
        		}
        
        		$user_infos = $sql_select_user->fetch(PDO::FETCH_ASSOC);
        		if (empty($user_infos)) {
        			throw new Exception('Aucun utilisateur trouvé.');
        		}
        
        		// utilisation des ascenseurs ascendants pour certifier l'intégrité et le typage
        		$this->set_id($user_infos['id']);
        		$this->set_courriel($user_infos['courriel']);
        	} catch (Exception $error) {
        		throw new Exception($error->getMessage()); // interruption du processus en cas d'erreur
        	}
        }