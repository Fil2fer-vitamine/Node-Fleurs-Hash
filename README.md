# Fight club project - API Node TypeScript Postgres

To start you have to type this line to install dependencies

(Pour commencer tu dois écrire cette ligne de commande dans ton bash pour installer les dépendances)

```bash
npm i
```

Dependencies : 
- express 
  
Dev dependencies : 
- @types/express 
- typescript 
- ts-node
- nodemon

## Important 

You have to create your own `.env.local` file based on `.env.template` file

(Tu dois créer ton propre fichier `.env.local` en prenant comme modèle le fichier `.env.template`)

## Info init project
You __don't have to do this__, I already executed it while project initialization.

(Tu __n'as pas à executer__, c'est ce que j'ai fais pour initialiser le projet)

Initialization of `package.json` file

```bash
npm init -y
```

Initialization of `.git` hidden folder

```bash
git init
```

Initialization of `.gitignore` file and add node_modules in it

```bash
echo node_modules >> .gitignore
```

Initialization of `tsconfig.json` file

```bash
tsc --init
```
and comment this option `"esModuleInterop": true`

Installation of dependencies : 
```bash
npm i express
```

Installation of dev dependencies : 
```bash
npm i -D typescript @types/express ts-node nodemon
```
