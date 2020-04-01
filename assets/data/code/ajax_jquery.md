# Ajax JQuery

```javascript
$.ajax({
	url: "/path/traitement.php",
	type: 'POST',
	data: $('#id-form').serialize(),
	dataType: 'JSON',
	success: function (JSON, statut) {
		console.log('SUCCESSS');
		console.log(statut);
		console.log(JSON);
	
		if (JSON.isOk) {
			// à faire si réussi
		}
	},
	error: function (resultat, statut, erreur) {
		console.log('erreur');
		console.log(resultat);
		console.log(erreur);
	},
	complete: function (resultat, statut) {
	
	}
});
```