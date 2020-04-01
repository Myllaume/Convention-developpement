# Ascenseurs

## Principe

Pour chaque type de données, deux ascenseurs sont à mettre en place.

- Les *set* permettent de faire remonter une valeur (vers les attributs) ;
- Les *get* permettent de faire descendre une valeur (vers l'instance ou les méthodes).

Ces ascenseurs garantissent l'intégrité des données : leur type et éventuellement leur contenu s'il est normalisable. Ils garantissent également que le variable ne soit pas vide. Ainsi, il est obligatoire de passer par un ascenseur que ce soit pour attribuer des données à l'objet, exécuter des méthodes ou bien *return* des données dans l'instance.

```php
// avant leur insertion en BDD, on vérifie ainsi que les données sont conformes
$sql_insert_file = $bdd->prepare('INSERT INTO files SET id=:id, path=:path, datetime=:datetime');
$ok_insert_file = $sql_insert_file->bindValue(':id', $this->get_id(), PDO::PARAM_INT);
$ok_insert_file &= $sql_insert_file->bindValue(':path', $this->get_path(), PDO::PARAM_STR);
$ok_insert_file &= $sql_insert_file->bindValue(':datetime', $this->get_datetime(), PDO::PARAM_STR);

// échange de données entre deux objets instanciés par un ascenseur *get*
$class_file->set_image($_FILES);
$class_user->add_image($class_file->get_image());
```

## Généraux

### *Int*

```php
public function set_int($var) {
	if (empty($var)) {
		throw new Exception('Champ [quoi] [objet] vide.');
	}

	if (!is_int($var)) {
		throw new Exception('Ce n\'est pas un [quoi] [objet] valide.');
	}

	if ($var > 1 || $var < 0) {
		// *error* si valeur supérieure à 1 ou inférieur à 0
		throw new Exception('Ce n\'est pas un [quoi] [objet] conforme.');
	}

	$this->int = intval($var);
	}

public function get_id() {
	return intval($this->int);
}
```

### *String*

```php
public function set_string($var) {
	if (empty($var)) {
		throw new Exception('Champ [quoi] [objet] vide.');
	}

	if (!is_string($var)) {
		throw new Exception('Ce n\'est pas un [quoi] [objet] valide.');
	}

	if (strlen($title) > 70) {
		// *error* si nb de caractères supérieur à 70
		throw new Exception('Cette chaine de [quoi] [objet] est trop longue.');
	}

	$this->string = strval($var);
}

public function get_string() {    
	return strval($this->string);
}
```

### *Array*

```php
public function set_array($var) {
	if (empty($var)) {
		throw new Exception('Champ [quoi] [objet] vide.');
	}

	if (!is_array($var)) {
		throw new Exception('Ce n\'est pas un tableau [quoi] [objet] valide.');
	}

	$this->array= $var;
}

public function get_array() {    
	return $this->array;
}
```

## Spécifiques

### Courriel

```php
public function set_courriel($var) {
	if (empty($var)) {
		throw new Exception('Champ courriel [objet] vide.');
	}

	if (!is_string($var) || !filter_var($var, FILTER_VALIDATE_EMAIL)) {
		throw new Exception('Ce n\'est pas une adresse courriel [objet] valide.');
	}

	$this->password = strval($var);
}

public function get_courriel() {
	return strval($this->courriel);
}
```

### Mot de passe

```php
public function set_password($var) {
	if (empty($var)) {
		throw new Exception('Champ mot de passe utilisateur vide.');
	}

	if (!is_string($var) ||
		strlen($var) < 8 ||
		!preg_match('#^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W)#', $var)) {

	throw new Exception('Mot de passe utilisateur non conforme : il doit au moins faire
	8 caractères et contenir une majuscule, une minuscule, un chiffre et
	un caractère spécial.');
	}

	$this->password = strval($var);
}

public function get_password() {
	return strval($this->password);
}
```

### Date

```php
public function set_date($mois, $jour, $annee) {
	if (empty($var)) {
		throw new Exception('Champ date livre vide.');
	}
	
	if (!is_string($var)) {
		throw new Exception('Ce n\'est pas une date livre valide.');
	}
	
	if (!checkdate($mois, $jour, $annee)) {
		throw new Exception('Cette date livre est impossible.');
	}

	$this->date = ['j' => $jour, 'm' => $mois, 'y' => $annee];
}

public function get_date() {
	$date = date_create();
	$this->date = date_date_set($date, $this->date['y'], $this->date['m'], $this->date['d']);
	$this->date = date_format($date, 'Y-m-d');
	return $this->date;
}
```