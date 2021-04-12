# ASSIGNMENT-APP (MBDS_Madagascar2021_G23Backend)

## Informations générales   
ASSIGNMENT-APP est une application de gestion de devoirs d'une école.
L'administrateur pourra donc consulter, ajouter, modifier, faire des recherches et voir les détails des devoirs.
Il peut aussi voir les élèves avec leur moyenne et leue nombre de devoirs rendu et également consulter les matières avec les professeurs corresponsants.
ASSIGNMENT-APP est une application de type MEAN et le code contenu dans ce lien github est le côté BACKEND de l'application.

## Lancement du projet    
Le côté backend de ASSIGNMENT-APP est déjà lancé automatiquement puisqu'il est déployé en ligne et l'utilisateur n'a plus besoin de la faire tourner sur sa machine.    
Vous pouvez voir le deploiement du côté backend de l'application sur 'https://mbdsmadagascar2021g23backend.herokuapp.com/api' et testez comme par exemple[https://mbdsmadagascar2021g23backend.herokuapp.com/api/devoirs/rendus](https://mbdsmadagascar2021g23backend.herokuapp.com/api/devoirs/rendus).

## Auteur    
L'application a été conçue par le groupe 23 composé de:
- MIHARINIAINA Andriamihanta Rilah Mario    n°12  
- RAMIANDRISOA Rindra Ny Aina               n°34

## Fonctionnalités    
Les fonctionnalités développées sont:  
1. Sur le devoir:
- La récupération de tous les devoirs rendus 
- La récupération de tous les devoirs non rendus 
- La récupération d'un devoir selon son id
- La modification d'un devoir
- L'ajout d'un devoir
- La recherche d'un devoir
- Le calcul de la moyenne de l'élève selon ses devoirs rendus
- Le calcul du nombre de devoirs rendus d'un élève
- Le calcul du nombre de devoirs rendus pour chaque élève 
- Le calcul du nombre de devoirs non rendus pour chaque élève 
2. Sur la matière:  
- Le login avec JWT
- La récupération de tous les utilisateurs
- La récupération d'un utilisateur selon son nom
3. Sur l'utilisateur:  
- La récupération de tous les élèves
- La récupération d'un élève selon son id
4. Sur l'élève:  
- La récupération de toutes les matières
- La récupération d'une matière selon son id