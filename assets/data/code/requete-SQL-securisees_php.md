# Requêtes SQL sécurisées

## Select

### Argument simple

```php
function select($bdd, $id) {
	try {
		$sql_select = $bdd->prepare('SELECT * FROM Table WHERE id=:id');
		$ok_select = $sql_select->bindValue(':id', $id, PDO::PARAM_INT); // valeur numérique
		$ok_select &= $sql_select->execute();
	
		if (!$ok_select) {
			throw new Exception('Erreur requête.');
		}
	
		// seléction premier résultat avec 'fetch'
		// pour seléctionner tous les résultat utiliser *fetchAll*
		$donnees_recuperees = $sql_select->fetch(PDO::FETCH_ASSOC);
	
		if (empty($donnees_recuperees)) {
			throw new Exception('Aucune donnée récupéré.');
		}
	
		// traitement ou assignation des données...
	
	} catch (Exception $error) {
		// '$error->getMessage()' contient l'erreur éventuelle
	}
}
```

### Argument au choix

```php
function select($bdd, $selecteur, $valeur) {
	try {
		switch ($selecteur) {
			case 'id':
				$sql_select = $bdd->prepare('SELECT * FROM Table WHERE '.$selecteur.'=:'.$selecteur);
				$ok_select = $sql_select->bindValue(':'.$selecteur, $valeur, PDO::PARAM_INT); // valeur numérique
			break;
	
			case 'courriel':
				$sql_select = $bdd->prepare('SELECT * FROM Table WHERE '.$selecteur.'=:'.$selecteur);
				$ok_select = $sql_select->bindValue(':'.$selecteur, $valeur, PDO::PARAM_STR); // valeur chaine
			break;
		}
				
		$ok_select &= $sql_select->execute();

		...

	} catch (Exception $error) {
		// '$error->getMessage()' contient l'erreur éventuelle
	}
}
```

## Udapte

```php
function update($bdd, $data) {
	try {
		$sql_update = $bdd->prepare('UPDATE Table SET string=:string, int=:int, datetime=:datetime, json=:json WHERE id=:id');
		$ok_update = $sql_update->bindValue(':string', $data['string'], PDO::PARAM_STR); // valeur chaine
		$ok_update &= $sql_update->bindValue(':int', $data['int'], PDO::PARAM_INT); // valeur numérique
		$ok_update &= $sql_update->bindValue(':datetime', $data['datetime'], PDO::PARAM_STR); // valeur chaine
		$ok_update &= $sql_update->bindValue(':json', $data['json'], PDO::PARAM_STR); // valeur chaine
		$ok_update &= $sql_update->bindValue(':id', $data['id'], PDO::PARAM_INT); // valeur numérique
		$ok_update &= $sql_update->execute();
	
		if (!$ok_update) {
			throw new Exception('Erreur requête.');
		}
	
	} catch (Exception $error) {
		// '$error->getMessage()' contient l'erreur éventuelle
	}
}
```

## Insert

```php
function insert($bdd, $data) {
	try {
		$sql_insert = $bdd->prepare('INSERT INTO Table SET string=:string, int=:int, datetime=:datetime, json=:json, id=:id');
		$ok_insert = $sql_insert->bindValue(':string', $data['string'], PDO::PARAM_STR); // valeur chaine
		$ok_insert &= $sql_insert->bindValue(':int', $data['int'], PDO::PARAM_INT); // valeur numérique
		$ok_insert &= $sql_insert->bindValue(':datetime', $data['datetime'], PDO::PARAM_STR); // valeur chaine
		$ok_insert &= $sql_insert->bindValue(':json', $data['json'], PDO::PARAM_STR); // valeur chaine
		$ok_insert &= $sql_insert->bindValue(':id', $data['id'], PDO::PARAM_INT); // valeur numérique
		$ok_insert &= $sql_insert->execute();
	
		if (!$ok_insert) {
			throw new Exception('Erreur requête.');
		}

		return intval($bdd->lastInsertId()); // récupération de l'id des données insérées
	
	} catch (Exception $error) {
		// '$error->getMessage()' contient l'erreur éventuelle
	}
}
```