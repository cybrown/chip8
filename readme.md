# CHIP8

## Installation

Cloner ce repository, et installer les dépendances
```
npm install
```

Lancer les tests
```
npm test
```

Compiler et lancer les tests à chaque changement (ctrl + C pour arrêter)
```
npm run test:watch
```

## Structure du projet

* /src/main/ : Fichier source principaux TypeScript
* /src/test/ : Tests unitaires TypeScript
* /src/reference.d.ts : Référence vers les typages qui sont dans /typings
* /node_modules/ : Libraries node.js
* /lib/ : Fichiers compilés (main et test)
* /typings/ : Typage des librairies
* /tsconfig.json : Configuration TypeScript
* /typings.json : Typages des librairies JavaScript
* /package.json : Commandes pour build le projet et liste des librairies JavaScript

## Scripts NPM

* ```npm test``` Lancer les tests unitaires
* ```npm install``` Installer les dépendances du projet
* ```npm run test:watch``` Compiler et lancer les tests unitaires, en surveillant continuellement les fichiers
* ```npm run tsc``` Compiler les fichiers TypeScript en JavaScript, de /src vers /lib

## Ressources

### CHIP 8
* https://en.wikipedia.org/wiki/CHIP-8
* http://devernay.free.fr/hacks/chip8/C8TECH10.HTM

### Tests unitaires
* https://mochajs.org/
* https://nodejs.org/dist/latest-v5.x/docs/api/assert.html
