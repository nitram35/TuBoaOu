
# TuBoaOu - Web App project for UTT course LO10

## Description
Nous nous sommes tous déjà retrouvés dans cette situation avec nos amis : Dans quel bar on se retrouve ? Quel est le bar le plus proche pour tout le monde ? Je ne peux pas venir, c'est trop loin pour moi ? Y-a-t'il un évènement proche de ce bar auquel nous pourrions aller après ?

L'application web "TuBoaOu" a pour but de permettre aux utilisateurs souhaitant se réunir pour aller boire un verre de trouver le bar le plus proche en temps de trajet pour chacun en fonction de leur localisation notamment. 

Cette app permettrait d'aider nos groupes d'utilisateurs (amis, collègues de travail...) à trouver le bar idéal pour chacun (que ce soit en termes de distance, de notation, de prix, de localisation).

"TuBoaOu" permettrait de faciliter cette étape de recherche DU bar et permettrait également de faciliter les interactions sociales. On pourrait également étendre les fonctionnalités à un système de notation/ajout en favoris des bars et des commentaires sur l'expérience dans le bar pour les autres utilisateurs.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Before running the application, make sure you have the following installed:
-   Node.js
-   MongoDB or **MongoDB Atlas account** by going on the MongoDB website and signing up for a new account (optionnal for the team).

### Installation

#### Step 1: Clone the repository

```bash
git clone https://github.com/nitram35/TuBoaOu.git
```
Then go to **root directory**
```bash
cd TuBoaOu
```
#### Step 2: Install Frontend Dependencies

Open a new terminal window , and run the following command to install the frontend dependencies:

```bash
cd client
```

```bash
npm install
```
#### Step 3: Create an Environment File

 - Create a file named .env in the **/client** directory.

##### Step 3.1: Add Firebase API Key for Authentification with Google

  In the .env file, create the line :
  
 - `VITE_FIREBASE_API_KEY  =  "you_api_key"` 
 

> In progress, others to add

#### Step 4: Run the Frontend Server

After installing the frontend dependencies, run the following command in the same terminal to start the frontend server:

```bash
npm run dev
```

This command will start the frontend server, and you'll be able to access the website on localhost:5173 in your web browser.

**Keep this terminal open because each time u save the code, the page will be updated directly.**

#### Step 5: Create Your Database Cluster (Only Once !)

> Already done
- Create a new database or cluster by following the instructions provided in the MongoDB documentation. Remember to note down the "Connect to your application URI" for the database, as you will need it later. Also, make sure to change `<password>` with your own password

- add your current IP address to the MongoDB database's IP whitelist to allow connections (this is needed whenever your ip changes). 

> For this project I added 0.0.0.0/0 Ip adress so that everybody can use the
> mongoDB Atlas database from his computer

#### Step 6: Create an Environment File

- Create a file named .env in the **root** directory (**TuBoaOu**).

  This file will store environment variables for the project to run.

##### Step 6.1: Add MongoDB URI

In the .env create an environment variable:

`MONGODB_URI="your-mongodb-uri"`
Replace "your-mongodb-uri" with the actual URI of your MongoDB database.

##### Step 6.2: Add JWT key

In the .env add an environment variable:

`JWT_SECRET  =  'whateverYouWant'`
Replace "whateverYouWant" with **Whatever You Want**.

#### Step 7: Install Backend Dependencies

In a **new terminal**, navigate to the **root** directory

```bash
cd ..
```

then run the following command to install the backend dependencies:

```bash
npm install
```

This command will install all the required packages specified in the package.json file.

#### Step 8: Run the Backend Server

In the same terminal, run the following command to start the backend server:

```bash
npm run dev
```

This command will start the backend server, and it will listen for incoming requests.
**Keep this terminal open, each time you change something in the code, the server restart automatically.**

## Deployment

> Work In Progress

## Built With

-   React.js
-   Redux
-   Node.js
-   Express.js
-   MongoDB Atlas
-   Tailwind CSS
-   Flowbite React
-   JWT Authentication
-  bcryptjs
-  Firebase

## Authors

* **GANDON Martin** - [Github](https://github.com/nitram35)
* **SIMONOVICI Enzo**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
