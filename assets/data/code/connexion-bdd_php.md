# Connexion base de données

## Fichier `bdd.php`

```php
function connexionBdd() {
	$config = array(
		'driver' => 'mysql',
		'serveur' => '', // adresse du serveur
		'base' => '', // nom de la base de données
		'utilisateur' => '', // nom d'utilisateur
		'mdp' => '' // mot de passe utilisateur
	);

	try {
		$bdd = new PDO($config['driver'].':host='.$config['serveur'].';dbname='.$config['base'].';charset=utf8;', $config['utilisateur'],$config['mdp']);
		$bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		return $bdd;
	} catch (PDOException $error) {
		echo 'Connexion bdd impossible : '. $error->getMessage();
		exit; //arrêt des scripts php
	}
}
```

## Autre fichier

```php
require_once '../bdd.php';
$bdd = connexionBdd(); // accès PDO
```