# Guide d'utilisation

Pour commencer à voir les vidéos il faut d'abord cliquer sur la vidéo de prévisualisation.
À ce moment-là une fenêtre appraît avec le lancement automatique de la vidéo prévisualisée.

## Sur PC
Sur pc il suffit d'utiliser la molette (vers le haut pour aller en arrière et vers le bas pour aller à la vidéo suivante).\
Si vous êtes à la première vidéo alors vous verrez que vous ne pouvez pas aller en arrière, c'est normal. 
Si n'avez plus de vidéo dans la liste alors le système vous remet à la première vidéo.

## Sur mobile
Il faut "scroller" vers le bas pour aller en bas et "scroller" vers le haut pour aller vers le haut.

# Modifier les vidéos

Pour modifier les vidéos il se rendre dans le dossier `videos` et y rajouter des vidéos. Il y a des déjà des vidéos numérotés de la manière suivante: `video-XX`.\
Le `XX` correspond au numéro de la vidéo (exemple `1`). Il est important de respecter l'ordre des nombre de 1 à `n`.\
Par défaut le système n'affiche que 6 vidéos maximum. Si vous souhaitez changer ça et en rajouter il suffit de se rendre dans le fichier `global.config.js` et modifier la variable `MAX_LOADED_VIDEOS` qui est par défaut à `6`.