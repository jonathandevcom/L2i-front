# L2I - E-commerce website developed with Angular and 4D

Project for the transition to RNCP title "Application Developer Designer" 2021-2023.

To access the project:

1. You need a 4D license (version 19 R8 or higher) and to install the 4D server.

2. Clone both GitHub repositories.
* For the front-end part: [GitHub Pages](https://github.com/jonathandevcom/L2i-front)
* For the back-end part: [GitHub Pages](https://github.com/jonathandevcom/L2i-back)

3. On the front-end part:
* Install dependencies: `npm install`
* Add a 'variablesEnvironment' directory in the SRC directory with two files: 'environment.ts' and 'environment.prod.ts'. An example is as follows:
  ```typescript
  export const environment = {
    production: false,
    username4D: 'XXXX',
    password4D: 'XXXX',
    apiUrl: 'http://localhost/rest'
  }
  ```
* Don't forget to install Angular on your machine, if it's not already installed: `npm install -g @angular/cli`
* Run the command: `ng build --configuration production` (for the production version) or `ng serve` (for the development version).

4. On the back-end part:
* Open the 4D project
* Create a 'Data' directory at the root of the project and create a 'data' file inside it
* Open the main process
* Access the development database and run the method 'collectionArticles' (to create the collection of articles) or use the forms to create your first data. Remember to quit and restart 4D for authentication.
* Add a 'variablesEnvironment' method in the main process. An example is as follows:
  ```4d
  If ($1="username")
  return "XXXX"
  End if
  If ($1="password")
  return "XXXX"
  End if
  ```



# L2I - Site e-commerce réalisé avec Angular et 4D

Projet de passage de titre RNCP Concepteur développeur d'application 2021-2023.

Pour accéder au projet :

1. Il faut une licence 4D (version 19 R8 ou supérieure) et installer le serveur 4D.

2. Cloner les deux dépôts github. 
  * Pour la partie front end : [GitHub Pages](https://github.com/jonathandevcom/L2i-front)
  * Pour la partie back end : [GitHub Pages](https://github.com/jonathandevcom/L2i-back)

4. Sur la partie frond end :
* installer : npm install
* ajouter un dossier variablesEnvironment dans le répertoire SRC : 1 fichier environment.ts et 1 fichier environment.prod.ts
  ```typescript
  export const environment = {
    production: false,
    username4D: 'XXXX',
    password4D: 'XXXX',
    apiUrl: 'http://localhost/rest'
  }
  ```
* npm install (ne pas oublier d'installer angular sur votre machine, s'il n'est pas déjà installé)
* lancer : ng build --configuration production (pour la version de production) ou ng serve (pour la version de développement).
* 

5. Sur la partie backend :
* ouvrir le projet 4D
* créer un dossier Data à la racine du projet et créer un fichier data
* ouvrir le process principal
* accéder à la base de développement et lancer la méthode collectionArticles (pour créer la collection d'articles) ou utiliser les formulaires pour créer vos premières données. Pensez à quitter et redémarrer 4d pour vous authentifier.
* ajouter une methode variablesEnvironment dans le process principal
  ```4d
  If ($1="username")
  return "XXXX"
  End if
  If ($1="password")
  return "XXXX"
  End if
  ```
