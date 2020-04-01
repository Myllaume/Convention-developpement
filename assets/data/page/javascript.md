# JavaScript

## Généralités

- Toujours terminer les instructions par un `;`.
- Pour les chaines de caractères, utiliser les *simple quotes.*
- Court-circuiter les blocs plutôt que d'imbriquer avec les expressions `return`, `break` ou `continue`.
- Encapsuler les valeurs à utiliser au courant des instructions du fichier dans des objets pour les appeler de manière sémantique.

```javascript
var form = {
	utils: {
		form: document.querySelector('.form'),
		btnSubmit: document.querySelector('.form__submit'),
		callback: document.querySelector('.form__callback')
	},
	input: {
		name: document.querySelector('#input-name'),
		email: document.querySelector('#input-email')
	},
	parms: {
		width: '200px'
	}
};

// Avec ce code, on accédera à l'élément HTML du formulaire avec 'form.utils.form'
```

- Utiliser les *back quotes* pour saisir du code HTML bien lisible.

```javascript
var html = `
	<h2>Titre</h2>
	<div>
		<p>Insertion simple et lisible</p>
		<p>Avec les back-quotes</p>
	</div>
`;
```

## Commentaires

Voici un commentaire sur plusieurs ligne décrivant une fonction, d'abord avec un nom explicite, puis des explication sur son fonctionnement et des annotations au sein de la fonction pour repérer efficacement les valeurs.

```javascript
function backToTop() {

/**
 * Back to top
 * ---
 * bouton de retour en haut de page :
 * - 2) affichage de la flèche (1) si scroll de 200px ou plus
 * - 3) au clic sur le flèche scroll smooth j'au pixel 0
 */

	window.addEventListener('scroll', function(e) {
		//===> (1)
		var btnBackTop = document.querySelector('#back-to-top');
		
		//===> (2)
		if (window.scrollY >= 200) {
		btnBackTop.classList.add('--visible');
		
			//===> (3)
			btnBackTop.addEventListener('click', () => { // (3)
				window.scrollTo({
					top: 0,
					behavior: 'smooth'
				});
			});
		
		} else {
			btnBackTop.classList.remove('--visible');
		}
	});
}
```

## Optimisation

### Indentation

Pour augmenter la lisibilité du code, éviter la sur-indentation.

```javascript
// À éviter

if (array.length !== 0) {
	for (let i = 0; i < array.length; i++) {
		// traitement...
	}
}

// Écrire

if (array.length === 0) {
	return;
}

for (let i = 0; i < array.length; i++) {
	// traitement...
}
```

### Court-circuiter

Pour éviter l'exécution inutile de boucles, conditionnelles, mieux vaut régulièrement court-circuiter les fonctions avec `return`, `break` ou `continue`.

```javascript
function checkArrayNames(arrayNames) {

if (arrayNames.length === 0) {
	// si 'arrayNames' vide : arrêt de la fonction
	return;
}

var validNames = [];

for (let i = 0; i < arrayNames.length; i++) {
	// pour chaque nom du tableau...
	if (arrayNames[i].length > 5) {
		// ne pas traiter si + long que 5 caractères
		continue;
	}
	// l'enregistrer dans 'validNames'
	validNames.push(arrayNames[i]);
}

	// renvoyer 'validNames'
	return validNames;
}
```

### Mise en cache

La sélection des éléments au sein du DOM est un processus lourd. Il faut veiller à limiter ces opérations et à sémantiser, regrouper les éléments du DOM.

```javascript
var elts = {
	form: {
		this: document.querySelector('#form-user'),
		btnSend: document.querySelector('#btn-send-user')
	},
	content: document.querySelector('#content'),
	txts: document.querySelectorAll('#content p'),
	titles: document.querySelectorAll('.title')
}

elts.form.btnSend.addEventListener('click', () => {
	sendForm(elts.form.this);
})
```

## Évènements

Lorsque l'on veut animer la page, il faut toujours préférer manipuler des classes CSS avec le JavaScript. On va distinguer plusieurs animations explicités par des noms de classe type *modificateur* (selon la convention BEM) :

- `--visible` pour le rendre visible
- `--hidden` pour cacher
- `--active` pour activer