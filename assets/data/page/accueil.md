La convention de développement fixe l'ensemble des consignes liées à l'écriture du code source, ainsi qu'à l’arborescence de fichiers et à l'utilisation des outils de développement. Ce document devra être visé et strictement respecté par tout développeur participant à un de mes projets ; sans cela, ça peut rapidement donner un code brouillon.

Il s'agit de concevoir un projet fait d'un seul bloc afin **faciliter la maintenance et l'extension**.

### Instructions globales

- L'ensemble du code source doit être encodé en UTF-8.
- Le code doit être commenté.
- Les indentations doivent être réalisées avec 4 tabulations.
- Les lignes de code ne doivent pas dépasser 80 caractères, espaces compris.
- Les fichiers doivent être nommés en minuscule, sans chiffre et caractères spéciaux, hormis les *undercores* et points : `script.min.js`.
- Toujours respecter ces principes du développement :
    - DRY : Don't Repeat Yourself : Utiliser au maximum des fonctions (même très simples) pour stocker le code exécuté à différents endroits.
    - KISS : Keep it simple, stupid : Écrire le code le plus simple possible.