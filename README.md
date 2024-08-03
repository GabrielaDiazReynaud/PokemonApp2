# Pokémon App Documentation

- Deployed App: [PokemonApp](https://gabrieladiazreynaud.github.io/PokemonApp/)

## Pokémon App Features

The Pokémon app includes the following features:

#### 1. Look Up Pokémon by ID and Name

Users can search for Pokémon by their ID or name using the search functionality provided in the app. Simply enter the ID or name of the Pokémon in the search bar, and the app will display the corresponding Pokémon details if found.

#### 2. Filter Pokémon by Generations

Users can filter Pokémon by generations using the filter feature provided in the app. Select the desired generations from the dropdown menu, and the app will display only the Pokémon from that specific generation.

#### 3. Display All Pokémon by Default

By default, the app displays all Pokémon available in the database. Users can explore the entire list of Pokémon without any filters applied.

<br/>

## Installing Project in Local Machine

### Step 1: Clone Repository

- Clone the repository to your local machine.

  ```bash
  git clone https://github.com/username/project-name.git
  ```

  Replace `username` with the GitHub username of the repository owner and `project-name` with the name of the repository.

### Step 2 : Navigate to the Project Directory

- Navigate to the directory of the cloned repository.

  ```bash
  cd project-name
  ```

  Replace `project-name` with the name of the cloned repository directory.

### Step 3: Install Project Dependencies

- Install project dependencies by running:

  ```bash
  npm install
  ```

  <br/>

## Run Project in Local Machine

### Prerequisites

- Have the project installed on local machine.

### Step 1: Navigate to the Project Directory

- Navigate to the directory of the project.

  ```bash
  cd project-name
  ```

  Replace `project-name` with the name of the project directory.

### Step 2: Start the Development Server

- Start the development server by running:

  ```bash
  npm run start
  ```

  <br/>

## Deployment Process

### Prerequisites

#### Step 1: Create a New Repository on GitHub

- Go to [GitHub](https://github.com) and create a new repository.

#### Step 2: Initialize the Git Repository Locally

- Open the terminal or command prompt.
- Navigate to the root directory of the project.

  ```bash
  cd path/to/project
  ```

- Initialize a new Git repository.

  ```bash
  git init
  ```

#### Step 3: Add and Commit the Project Files

- Add all the project files to the staging area.

  ```bash
  git add .
  ```

- Commit the files to the repository with a commit message.

  ```bash
  git commit -m "Initial commit"
  ```

#### Step 4: Link the Local Repository to GitHub

- Copy the URL of the new repository from GitHub. It should look like `https://github.com/username/repository-name.git`.
- Add the remote URL to the local repository.

  ```bash
  git remote add origin https://github.com/username/repository-name.git
  ```

#### Step 5: Push Changes to GitHub

- Push the local repository to GitHub.

  ```bash
  git push -u origin master
  ```

  <br/>
  <br/>

### Deploy to GitHub Pages

#### Step 1: Install `gh-pages` Package

- In the terminal, navigate to the root directory of the Pokémon application Install the `gh-pages` package by running:

  ```bash
  npm install gh-pages --save-dev
  ```

#### Step 2: Configure `package.json`

- Open the `package.json` file. Add the following fields at the top level:

  ```json
  "homepage": "https://username.github.io/repositoryname",
  "scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
  }
  ```

#### Step 3: Deploy to GitHub Pages

- In the terminal, run the following command to deploy the Pokémon application:

  ```bash
  npm run build
  npm run deploy
  ```

  <br/>
  <br/>

## Making Changes to Application

### Step 1: Create a New Branch

- Before creating a new branch, ensure you are on the main (or master) branch:
  ```bash
  git checkout main
  ```
- Pull the latest changes from the remote repository:

  ```bash
  git pull origin main
  ```

- Create a new branch with a descriptive name:

  ```bash
  git checkout -b feature/feature-name
  ```

### Step 2: Comitting Changes

- Add the files you have changed to the staging area:
  ```bash
  git add .
  ```
- Commit changes with a descriptive message:
  ```bash
  git commit -m "Add detailed description of your changes"
  ```

### Step 3: Pushing Changes

- Push your changes to the remote repository
  ```bash
  git push origin feature/feature-name
  ```

### Step 4: Create a Pull Request on GitHub
