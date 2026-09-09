# Documentation
Ceci est une documentation sur le fonctionnement du projet **Chez Lucas** (V3) !
Le but de ce projet est d'héberger gratuitement un site pour permettre l'accès libre aux oeuvres du bédéiste Lucas.
Les fonctionnalités requises sont :
- Afficher des bédés (en format pdf), potentiellement reliées entre elles par série, et naviguer de chapitre en chapitre
- Répertorier l'ensemble des bédés du site pour pouvoir les consulter
- Mettre des commentaires sur les chapitres
- Ajouter des bédés à la volée sans interruption de service

## Principe technique
Les bédés, sous format pdf, sont stockées dans un fichier "pdf". Chaque page du site correspond à un fichier texte sous format [markdown](https://fr.wikipedia.org/wiki/Markdown).
Un service [Quartz](https://quartz.jzhao.xyz/) customisé pour le besoin, transforme les fichiers markdown et pdf en site web statique, hébergé par le service Github Pages.
Le plugin Quartz Comments utilise le provider [giscus](https://giscus.app/fr) pour alimenter le système de commentaires.

## Structure du projet
```mermaid
docs                ## à ignorer
quartz              ## idem
content/ 
    pdf/            ## dossier contenant les pdfs
        Série 1/ 
            chapitre-1.pdf
            chapitre-2.pdf
            chapitre-3.pdf
        Les oneshot/
            oneshot-1.pdf
    Série 1/        ## exemple de série
        chapitre-1.md
        chapitre-2.md
        chapitre-3.md
    Les oneshot/
        oneshot-1.md
```

Ce qui nous intéresse se situe dans le dossier `content` (qui veut dire *contenu* en anglais). 

On retrouve un dossier `pdf` contenant... les bédés en format `.pdf`, et des dossiers pour chaque série avec des pages pour chaque chapitre, en format `.md`. 

Chaque fichier `.md` correspond à une page web.

On retrouve également le fichier `doc.md` que vous consultez actuellement, ainsi que le fichier `index.md`qui correspond à la page d'accueil du site.

## Structure des pages
Une page de BD typique ressemble à ceci :
```markdown /noel/
# Les aventures de noël #2
Le père noël a disparu ! Son plus fidèle lutin mène l'enquête...

---
<link rel="stylesheet" href="../static/pdf-embed.css">
<div class="pdf-embed" data-src="../pdf/noel/noel-2.pdf"></div>
<script type="module" src="../static/pdf-embed.mjs"></script>

[Chapitre précédent](chapitre-1.md)
[Accueil](../index.md)
[Chapitre suivant](chapitre-3.md)
```

- Le **titre** : `# Les aventures de noël #2` simplement précédé d'un `#` pour le transformer en titre. 
- La **description** : `Le père noël a disparu ! Son plus fidèle lutin mène l'enquête...` pour du texte simple, aucun symbole n'est requis
- Le **trait** : `---`
- La **bédé** : 
```html /\.\.\/pdf\/noel\/noel-2\.pdf/
<link rel="stylesheet" href="../static/pdf-embed.css">
<div class="pdf-embed" data-src="../pdf/noel/noel-2.pdf"></div>
<script type="module" src="../static/pdf-embed.mjs"></script>
``` 
C'est du code en HTML, il suffit de le copier-coller et de remplacer par le bon chemin (`../pdf/noel/noel-2.pdf`) du pdf pour adapter à n'importe quelle bédé.
- Les **liens** pour naviguer à l'accueil ou aux chapitres précédent et suivant : `[titre du lien](chemin du fichier)`

## Exemple d'ajout d'une bd
Je veux ajouter le chapitre 1 d'une nouvelle série : 'Narnia', j'ai en ma possession le fichier `chapitre-1.pdf`.

Je vais donc ajouter ce fichier pdf à l'arborescence et créer un nouveau fichier `.md` :
```mermaid
docs
quartz
content/ 
    pdf/ 
        Série 1/ 
            chapitre-1.pdf
            chapitre-2.pdf
            chapitre-3.pdf
        Narnia/                 ## ajout du pdf
            chapitre-1.pdf
        Les oneshot/
            oneshot-1.pdf
    Série 1/ 
        chapitre-1.md
        chapitre-2.md
        chapitre-3.md
    Narnia/                     ## ajout du md
        chapitre-1.md
    Les oneshot/
        oneshot-1.md
```

Dans le fichier `chapitre-1.md`, on va mettre ceci :
```markdown
# Narnia #1
Des enfants isolés de leurs parents font la découverte d'une mystérieuse armoire...

---
<link rel="stylesheet" href="../static/pdf-embed.css">
<div class="pdf-embed" data-src="../pdf/Narnia/chapitre-1.pdf"></div>
<script type="module" src="../static/pdf-embed.mjs"></script>

[Accueil](../index.md)
[Chapitre suivant](chapitre-2.md)
```

Il suffira de rajouter un lien vers cette série dans le fichier `index.md` et l'affaire est dans la boite !
```markdown
---
title: Chez Lucas - Accueil
comments: false
---

# 🐦‍⬛ Chez Lucas
Retrouvez tous les webtoons du célèbre bédéiste en accès libre !

## 🎄 Série 1
- [Chapitre 1](Série%201/chapitre-1.md)
- [Chapitre 2](Série%201/chapitre-2.md)
- [Chapitre 3](Série%201/chapitre-3.md)
## 🐴 Narnia
- [Chapitre 1](Narnia/chapitre-1.md)
## 📓 Les Oneshot
- [👹 Oneshot 1](Les%20oneshot/Oneshot-1.md)
```
Le caractère `%20` dans les chemins de fichier correspond à un espace, "Les oneshot" devient `Les%20oneshot`.