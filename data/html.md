# HTML

Tout le code HTML devra être validé par les normes du W3C et respecter les consignes ci-dessous qu'il soit écrit directement ou injecté en PHP ou JavaScript.

[Markup Validation Service](https://validator.w3.org/)

Pour ce langage, on restera particulièrement attentif à la sémantique pour un code plus lisible tant pour les humains et les machines. Plus les balises et leurs métadonnées sont exactes et précises, meilleur sont l’accessibilité de la page et le référencement.

# Généralités

- On utilisera toujours des *double quote* pour les attributs.
- Les balises auto-fermantes devront porter un anti-slash final. `<img src="..." alt="..." />`
- Les valeurs identiques à leur attribut cible ne sont pas renseignées, sauf nécessité. `<input name="pseudo" checked>`

# Commentaires

Pour qu'ils soient bien visibles, les commentaires en HTML permettant de signaler les zone de la page devront se faire comme ci-dessous :

    <!--
    *******************
    HEADER
    informations supplémentaires sur le contenu ci-dessous
    *******************
    -->
    <header>
    	...
    </header>
    <!--
    *******************
    END HEADER
    *******************
    -->

## En-tête

Tous les fichiers HTML doivent débuter comme ci-dessous :

    <!DOCTYPE html>
    <html lang="fr">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
        <!--[if IE]>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <![endif]-->
        <title>Titre de la page</title>
    </head>
    
    <body>
    	...
    </body>
    
    </html>

# Sémantique

Les balises suivantes marquent des zones particulières de la page. Elles sont regroupées ci-dessous par catégories et avec leur usage précis indiqué.

Les éléments HTML5 suivants sont privilégiés aux éléments neutres `<div>` si leur fonction indiquée ci-dessous s’y prête :

- `<header>` : en-tête (de page ou de contenu).
- `<main>` : bloc principal (de page ou de contenu).
- `<nav>` : contenant les liens permettant d'accéder à des pages du site.
- `<article>` : contenu autonome.
    - `<section>` : se trouve dans les balises `<article>` pour y délimiter des sections.
- `<aside>` : contenu optionnel de la page, doit pouvoir être retiré.
- `<footer>` : pied (de page ou de contenu).

Avec les éléments sémantiques listés ci-dessous, on tâchera d'être encore plus précis dans la déclaration des contenus. Ils sont tous uniques, on ne peut les utiliser plusieurs fois dans une même page web.

## Blocs de page

- `<div id="wrapper">` : enveloppe flexible de la page
- `<header role="banner">` : en-tête globale et répétée du site
- `<main role="main">` : conteneur général du contenu principal de la page.
- `<nav role="navigation">` : navigation principale du site.
- `<aside role="complementary">` : barre latérale globale.
- `<article>` : Contenu autonome de la page.

## Utilitaire

- `<form role="search">` : barre de recherche.
- `<section role="contentinfo">` : contenant des informations légales.