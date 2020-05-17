Bonjour, voici comment lire notre projet correctement:
​
Niveau en programmation minium:
    -intermediaire
​
Configuration nécessaire:
    - linux
    - git
    - nodejs
​
Dans un premier temps récuperer le fichier sur git avec la commande:
​
    git clone git@git.epitech.eu:/sebastien.maillot@coding-academy.fr/rush-mern
​
Dans un terminal allez dans le fichier mern-rush:
    cd ~/rush-mern
​
Lancer ensuite la commande: 
    npm install
​
Ensuite allez dans le repertoire back-end:
    cd ~/rush-mern/back-end
​
Verifier si mongod, mongo ou nodemon ont déjà été lancé avec la les commandes:
    ps aux | grep mongod
    ps aux | grep mongo
    ps aux | grep nodemon
​
Si vous voyez des resultats qui ressemble à: 
mongodb   1009  0.4  1.2 1493764 101192 ?      Ssl  09:36   0:12 /usr/bin/mongod --config /etc/mongod.conf
​
Lancer le commande: 
    sudo kill 1009
​
Et lancer la commande suivante:
    ~/rush-mern/back-end
    sudo mongod --port 27042
    (il faudra saisir votre mot de passe sudo)
​
Ouvrir un nouveau terminal et aller dans le repertoire back-end et lancer la commande suivante:
    ~/rush-mern/back-end
    mongo --port 27042
​
Ouvrir à nouveau un terminal et aller dans le repertoire back-end et lancer la commande suivante:
    ~/rush-mern/back-end
    nodemon server.js
​
Enfin dans un nouveau terminal dans le répertoire rush-mern lancer la commande suivante:
    cd ~/rush-mern
    npm start
    (cette commande devrait vous ouvrir directement dans votre navigateur la page d'accueil du site)




******************************
******************************
********* RACCOURCIS *********
******************************
******************************




This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
