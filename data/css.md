# CSS

Il est impératif d'utiliser le [préprocesseur SASS](https://sass-guidelin.es/fr/) pour une écriture plus efficace, compatible et légère du CSS (imbrication, préfixage et minification) dans des fichiers SCSS. Tout le CSS ne doit être contenu que dans un fichier minifié nommé `style.min.css`, lui-même relié aux pages.

# Généralités

- Toujours utiliser des *double quote*.
- Gestion des espaces dans la présentation des règles : `margin: 16px;`.
- Toujours rester concis et lisible dans l'énonciation des règles.

        /* On évitera */
        input[type='text']::before {margin : 0 20px 0 0; padding : 20px 10px 20px 10px;
        border-top-left-radius : 10px; border-bottom-right-radius : 10px;
        content : 'input';}
        
        /* On écrira */
        [type="text"]::before {
        	margin-right: 20px;
        	padding: 20px 10px;
        	border-radius: 10px 0 0 10px;
        	content : "input";
        }

- Utiliser des sélecteurs avec peu de poids, de préférence des classes. `!important` est banni.
- Ne pas écraser une règle par une autre.

        /* On évitera */
        li {
           visibility: hidden;
        }
         
        li:first-child {
           visibility: visible;
        }
        
        /* On écrira */
        li:not(:first-child) {
           visibility: hidden;
        }

- Pour des problèmes de performances, éviter d'animer d'autres propriétés que `transform` ou `opacity` ou `filter`, sinon utiliser la règle `will-change`.

# Commentaires

## Rédiger une navigation

De cette manière on peut hiérarchiser des parties de la feuille de style. En utilisant les fonctions de recherche de l'IDE sur les `#` ont peut facilement retrouver un titre.

    /*
    Sommaire :
    ==========
    
    Titre 1
    	Titre 2
    		Titre 3
    */
    
    ...
    
    /* # Titre 1 */
    /* ## Titre 2 */
    /* ### Titre 3 */

# Ordre de déclaration

Pour chaque sélecteur on notera les règles ans cet ordre :

1. Contenu généré : les propriétés afférentes au contenu créé via `:after` et `:before` (`content`, `counter`, `quotes`).
2. Propriété affectant le rendu par défaut de l’élément (`display`, `position`, `top` …)
3. Propriété de boîte (`margin`, `border`, `max-width`… )
4. Coloration et habillage (`color`, `background`… )
5. Transformation et animation (`translate`, `animation`… )
6. Typographie (`font-size`, `letter-spacing`… )

Globalement dans le fichier CSS, il faut profiter du principe de cascade : la règle annoncée en dernière prévaut sur celle annonce en première. Il convient donc de **donner les instructions générales en premier, puis de dérouler les exceptions**, notamment concernant les gabaries.

## Arborescence SCSS

Voici une arborescence pour les fichiers CSS :

- `main.scss` : compilé en main.css et rassemblant toutes les dépendances

        // -- ABSTRACTS
        @import './abstracts/variables';
        @import './abstracts/mixins';
        @import './abstracts/placeholders';
        
        // -- BASE
        @import './base/keyframes';
        @import './base/page';
        @import './base/texte';
        @import './base/cass-bootstrap';
        
        // -- COMPONENTS
        
        // -- LAYOUT
        @import './layout/barre-outil';
        @import './layout/banner';
        @import './layout/navigations';
        
        // -- PAGES
        @import './pages/home';
        @import './pages/search';

- *abstracts* : outils à appeller
    - `_variables.scss`

            // =====================
            // COLORS
            // =====================
            
            $color-orange : #d69a61;
            $color-bleu : #6E7371;
            
            // =====================
            // BREAKPOINTS
            // =====================
            
            $tablette: 720px; // = bootstrap's 'Medium' = md
            $ordinateur: 1140px;  // = bootstrap's 'Extra large' = xl
            
            // =====================
            // Z-INDEX
            // =====================
            
            $zindex-notification: 9999;

    - `_functions.scss`
    - `_placeholders.scss`

            // =====================
            // FONTS
            // =====================
            
            %font-sserif-regular {
            	font-family: 'Montserrat', sans-serif;
            	font-weight: 400;
            	font-style: normal;
            }
            
            %font-serif-regular {
            	font-family: 'Libre Baskerville', serif;
            	font-weight: 400;
            	font-style: normal;
            }

- *base* : spécifications de base
    - `_reset.scss`
    - `_typography.scss`

    ...

- *components* : composants indépendants
    - `_buttons.scss`

    ...

- *layout* : assemblages de composants
    - `_grid.scss`
    - `_navigation.scss`
    - `_aside.scss`
    - `_forms.scss`

    ...

- *pages* : particularités d'organisation des blocs au sein de certaines pages
    - `_home.scss`
    - `_contact.scss`

    ...

- *themes* : changement brusque de l'apparence globale du site sur demande de l'utilisateur
    - `_admins.scss`

    ...

- *libraries* : bibliothèques de styles
    - `_bootstrap.scss`

    ...

# Nommage

## OOCSS

L'*oriented object CSS* est une manière particulière de concevoir les éléments d'une page et la gestion de leur apparence. On va tenter de distinguer des blocs dans la page, tels qu'un bouton, une boîte de lien ou un formulaire, et leur apposer une *class* en rapport avec leur apparence ou leur utilité propre et non leur utilité dans la page ou sur le site. Ainsi, on pourra très facilement rendre ces éléments indépendants et pouvoir les multiplier sur le site.

Ci-dessous on a définit une apparence de base pour tous les boutons du site web que l'on attribut avec le sélecteur CSS `.btn`. Les deux autres sélecteurs servent à modifier la taille ; on pourrait aussi ajouter un sélecteur `.blue-btn` pour modifier la couleur.

    <button class="btn small-btn"></button>
    <button class="btn large-btn"></button>

## BEM

Sigle pour Bloc Élément Modificateur, soit les trois types éléments distingués par les *class* faites en BEM. Il s’agit d’une convention de nommage des classes CSS permettant une relecture facile des fichiers de styles et une écriture simplifiée en SCSS.

Dans le code ci-dessous, on distingue le *bloc*, chaque fois noté en premier. Selon la convention OOCSS, c'est un élément indépendant de tel sorte que l'on peut le dupliquer ou le déplacer avec ses enfants dans le code sans que cela ne casse l'organisation des éléments. Ses enfants et leurs frères sont les *éléments* et dépendent du *bloc* : les en séparer briserait la structure du *bloc*. On les distingue à l’exterminé de deux underscores. Ils peuvent subir des variations d'un frère à l'autre et on leur applique alors un *modificateur*, à l'extrémité de deux tirets tel que présenté ci-dessous. Ces trois chaines peuvent elle-même être écrite en un mot ou bien être composées de termes reliés par des tirets.

    <div class="btns-content">
    	<button class="btns-content__btn"></button>
    	<button class="btns-content__btn btns-content__btn--big"></button>
    	<button class="btns-content__btn"></button>
    </div>

Voici comment styliser ces éléments en SCSS en utilisation le *nesting* (imbrication). Attention à ne pas dépasser deux niveaux d'imbrication (exceptionnellement trois pour des réactions au :hover par exemple).

    .btns-content {
    	backgound-color: red;
    
    	&__btn {
    		width: 50px;
    		border: none;
    		backgound-color: gray;
    		color: black;
         
    			&--big {
    				width: 100px;
    			}
         
    		&:hover {
    			backgound-color: black;
    			color: white;
    		}
    	}
    }

# Hiérarchie des éléments

Selon les principes de cette norme, la spécificité des sélecteurs doit être progressive. On début avec le sélecteur étoile, puis des *class* pour pouvoir aller vers des double *class*, pour ensuite utiliser des identifiants, combiner avec les *class* et balises dans un dernier temps.

- Niveau de spécificité des sélecteurs
- Précision des règles
- Portée des sélecteurs

# Responsive

Quelques règles pour un CSS efficace pour le *responsive*, gérer les gabaries **:

- Utiliser les valeur en rem plutôt qu'en pixel.

        /* débuter le fichier CSS par ces deux lignes */
        html {
           font-size: 62.5%;
        }
         
        body {
           /* tous les textes auront une
        	hauteur de base de 14px */
           font-size: 1.4rem;
        }

- Fixer les *breakpoints* précis à utiliser

        $tiny: 480px;
        $extra-large: 1200px;
         
        @media (max-width: $tiny - 1) {/* règles si plus petit que $tiny - 1 */}
        @media (min-width: $extra-large) {/* règles si plus grand que $tiny */}