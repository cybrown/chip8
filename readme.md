# CHIP8

[![Join the chat at https://gitter.im/cybrown/chip8](https://badges.gitter.im/cybrown/chip8.svg)](https://gitter.im/cybrown/chip8?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Kanban board](https://img.shields.io/badge/kanban%20board-on%20trello-blue.svg)](https://trello.com/b/cXEvdKzv)
[![Build Status](https://travis-ci.org/cybrown/chip8.svg?branch=master)](https://travis-ci.org/cybrown/chip8)

## Installation

Cloner ce repository, et installer les dépendances
```
npm install
```

Lancer les tests
```
npm test
```

Lancer la couverture (disponible dans coverage/lcov-report/index.html)
```
npm run coverage
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

## Utilisation

Lancer une rom en ligne de commande:

```node cli.js sample-roms/sample1.c8```

## Ressources

### CHIP 8
* https://en.wikipedia.org/wiki/CHIP-8
* http://devernay.free.fr/hacks/chip8/C8TECH10.HTM
* http://mattmik.com/files/chip8/mastering/chip8.html

### Tests unitaires
* https://mochajs.org/
* https://nodejs.org/dist/latest-v5.x/docs/api/assert.html

