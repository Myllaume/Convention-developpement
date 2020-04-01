# Méthode Git

Référence : [Git, les bonnes pratiques](https://medium.com/@pilloud.anthony/git-les-bonnes-pratiques-b0f19c3eef47)

Git est un logiciel open-source de *versionning* adapté sur plusieurs plateformes web comme GitHub ou GitLab. Il est aussi possible de l'installer sur un ordinateur et de profiter de ce système en local. Ce logiciel permet d'écrire du code source en collaboration et plus généralement de construire une arborescence complexe en divisant le développement.

Il faut une méthode bien définie pour une équipe de développeur·euse·s afin de profiter au mieux de ces fonctionnalités. Il y a un vocabulaire à maîtriser avant de pouvoir interagir par le biais d'une interface ou pas des lignes de code.

Git va permettre de réaliser plusieurs tâches :

- Dresser un historique de l'écriture de code source sauvegardé (*commit*) un instant T avec la possibilité de revenir en arrière (*rollback*)
- Sur la base d'un même code source, diviser (*fork*) **le projet pour apporter des modifications parallèlement puis unifier (*merge*) les versions
- Maîtrise de l'architecture du code

Voici les bonnes pratiques générales :

- *Commit* régulièrement et avec une phrase comme titre ainsi qu'une éventuelle description pour détailler. Le titre doit être taggué suivant la typologie de *commit* suivante :
    - `[add]` ajout d’une fonctionnalité
    - `[edit]` modification d’une fonctionnalité
    - `[refa]` factorisation du code (modification de l'écriture, mais pas des fonctionnalités)
    - `[del]` suppression d’une fonctionnalité ou d'un fichier
    - `[fix]` correction d’un bug
    - `[oth]` quand aucun des tags précédant ne correspond à la tâche

## Itérations

Git est dans une logique de "projet agile", aussi appelé "projet itératif". C'est dans une logique de boucle que les membres du projet — quel que soit leur domaine — vont amasser du code. Jusqu'à la fin du développement on va reproduire cette boucle régulièrement, par exemple tous les trois jours.

1. Analyse des besoins restants et découpage du travail
2. Développement indépendant des fonctionnalités
3. Validation par l'équipe et le·a *lead-dev*
    - Validé : *merge* dans la *branch* supérieure
    - Invalidé : relevé des erreurs et/ou manques, puis poursuite du développement
4. Evaluation de la progression, des choix qui ont été faits, et retour à la première étape

![Méthode GIT - cycle_iteratif.png](/assets/images/cycle_iteratif.png)

Source : [https://www.geek-directeur-technique.com/](https://www.geek-directeur-technique.com/2009/02/06/le-cycle-iteratif)

### Équipe

Tous les membres de l'équipe doivent être identifiables et contactables par leur profil Git.

Est *lead-dev* est une personne particulièrement soucieuse de la cohérence du projet, du respect de la présente convention de développement. Iel est capable de comprendre les différents langages et connaît les méthodes de développement. Sans nécessairement installer une hiérarchie, c'est un·e développeur·se qui obtient une responsabilité supplémentaire, celle de la **revue de code**. Iel ne corrige pas nécessairement le code, mais le relis et le valide ou non.

## Git Flow

Le dépôt (*repository*) contenant le code source est divisé en plusieurs branches (*branch*) permettant de différencier plusieurs étapes dans le code source. Les *branchs* permettent de garder un code source bien lisibles

- Master : c'est la *branch* unique maîtresse, dite de production. Elle ne contient que des produits finis répartis en versions et composés d'un code fonctionnel et abouti. À chaque *merge* dans le *master* on considère qu'une nouvelle version indépendante est créée, utilisable. On ne modifie jamais directement le *master* qui, s'il contient des bugs, est retravaillé dans la *branch* Develop.
- Develop : c'est la *branch* unique de développement regroupant les fonctionnalités dernièrement développées et mises en commun : le tout doit encore y être debuggé par le·a *lead-dev*. Une fois que toutes les fonctionnalités ont été réunies et qu'elles interagissent sans bug, cette *branch* est *merge* dans le *master*.
- Feature : c'est une *branch* de fonctionnalité. Il est possible d'en créer une multitude rigoureusement différenciées par leur nom `feature-[nom_fonctionnalité]`. On fait bien attention à y développer cette unique fonction tant qu'elle est indépendante (qu'elle se suffit à elle-même). Il est envisageable de *fork* une *branch* Feature sous ne nom `feature-[nom_fonctionnalité]--[spécification]`, mais une à la fois et avec précaution. Une fois que cette fonctionnalité est aboutie, vérifiée et débuggée, elle peut être *merge* dans la *branch* Develop.

![Méthode GIT - git_flow.png](/assets/images/git_flow.png)

Source : [https://fr.lutece.paris.fr/](https://fr.lutece.paris.fr/fr/jsp/site/Portal.jsp?page=wiki&view=page&page_name=git)

Pour que les fonctionnalités soient bien indépendantes, il est nécessaire de découper préalablement le projet en travaux à assigner aux développeur·euse·s qui vont travailler dans leurs *branch* Feature.

## Mouvements

Dans la mesure du possible, on ne *merge* que vers le haut : de Feature à Develop et de Develop à Master*.* L'appel (*pull*) d'une *branch* supérieure depuis une *branch* inférieure peut en effet causer des conflits. La supérieure, espace de *merge* et de débogage, peut être incompatible avec l'inférieure, non-débugué ou même compatible avec les *merges* d'autres Feature. Suite à un *pull* dans une Feature, elle devra être débuggée pour poursuivre son développement. Si ces corrections ne sont pas compatibles avec celles auparavant effectuées dans la *branch* supérieure, on va droit dans le mur. Même lorsque le *pull* ne cause pas immédiatement de bug, c'est lors du *merge* final de la Feature que peuvent apparaitre des anomalies complexes ; le code source est alors bon à jeter et il faut *rollback*. En prévention de cela, il ne faut pas supprimer les Feature qui n'ont pas été *merge* dans le Master.

Pour échanger autour du code qui a été *commit*, on profite des outils Git. Les développeur·euse·s doivent régulièrement envoyer leur travail sur le *repository* et annoncer leur avancement pour recueillir les remarques des collaborateurs et pouvoir profiter du *rollback*, utile en cas d'embourbement. Ainsi, un·e développeur·se qui pense avoir achevé son travail émet une demande de fusion (*merge-request*) pour la *branch* supérieure. Le·a *lead-dev* confirme ou non cette demande.

Il est important de ne pas accumuler les *merges* de Feature par intermittence, mais de les exécuter tous ensemble. Les *forks* de Develop donnant les *branchs* Feature doivent pouvoir partir d'une base fonctionnelle, débuggée. Sans cela il faudra re-alimenter (*pull*) les branches Feature avec la version corrigée et cela peut causer des conflits immédiatement ou par la suite. **Le conflit, c'est l'échec du processus de *versionning***. Pour l'éviter, il faut débuter une nouvelle séquence de développement par un *merge* de toutes les *branchs* Feature au sein de Develop. Là on débugue et seulement ensuite on pourra *fork* pour développer les nouvelles fonctionnalités sur des bases saines. En attendant ce *merge* de toutes les *branchs* Feature au sein de Develop, les développeur·euse·s continuent de *fork* la même base de code source depuis Develop en laissant en attente les Feature abouties.