# Controller AJAX

```php
if (!isset($_GET['action']) || empty($_GET['action'])) {
	exit;
}

// données envoyées par défault
$is_ok = false;
$consol_msg = 'Aucun traitement.';
$data = [];

// stockage de l'argument d'action
$action = $_GET['action'];
// stockage des données renvoyées en réponse
if (isset($_POST) && !empty($_POST)) {$data = $_POST;}

switch ($action) {
	case 'inscription':
		require_once '../models/user.class.php';
		$class_user = new User;

		try {
			$class_user->set_courriel($data['courriel']);
			$class_user->select_user($bdd, 'courriel');
			...

			$is_ok = true;
			$consol_msg = 'Utilisateur connecté.';
		} catch (Exception $error) {
			$consol_msg = $error->getMessage();
		}
	break;

	case 'connexion':
		...
	break;
}

// envoie d'une unique réponse au client
echo json_encode(array('isOk' => $is_ok, 'consolMsg' => $consol_msg, 'data' => $data));
```