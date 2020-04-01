/***
 * Navigation
 * ---------
 * Détection et action des ancres dans la page.
 */

window.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll('[data-ancre]').forEach(link => {
        link.addEventListener('click', () => {
            window.scrollTo({
                top: document.querySelector('#cat-' + link.dataset.ancre).offsetTop,
                behavior: 'smooth'
            });
        });
    });

});

/***
 * Back to top
 * ---------
 * bouton de retour en haut de page :
 * - affichage si scroll de 200 ou plus
 * - fonctionnement : scroll smooth à 0
 */

window.addEventListener('scroll', function(e) {
    var btnBackTop = document.querySelector('#back-to-top');

    if (window.scrollY >= 200) {
        btnBackTop.classList.add('--visible');

        btnBackTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

    } else {
        btnBackTop.classList.remove('--visible');
    }
});

/***
 * Copier dans le presse papier
 * ---------
 * Pour toutes les fenêtres de code afficher un
 * bouton qui toogle la class .select qui entraine
 * une selection du contenu intégrale au clic
 */

window.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.hljs').forEach(codeWindow => {
        const btn = document.createElement('button');
        btn.classList.add('btn');
        btn.textContent = 'Sélection partielle';
        codeWindow.after(btn);

        codeWindow.classList.add('select');

        let isActive = true;
        btn.addEventListener('click', () => {
            if (!isActive) {
                codeWindow.classList.add('select');
                btn.textContent = 'Sélection partielle';
                isActive = true;
            } else {
                codeWindow.classList.remove('select');
                btn.textContent = 'Sélection intégrale';
                isActive = false;
            }
        });
        
    });
});

/***
 * Sommaire automatique
 * ---------
 * Pour chaque titre de niveau 2 on l'insert
 * dans le sommaire et on la balise pour qu'il
 * fonctionne avec le système de navigation
 */

const sommaire = document.querySelector('#sommaire');

var htmlSommaire = `
<h3>Sommaire</h3>
<ul>`;

document.querySelectorAll('main h2').forEach(titreDeux => {
    var titreId = titreDeux.textContent.replace(/ /g, '_');
    titreDeux.id = 'cat-' + titreId;
    htmlSommaire += '<li data-ancre="' + titreId + '">' + titreDeux.textContent + '</li>';
    
});

htmlSommaire += '</ul>';
sommaire.innerHTML = htmlSommaire;