# Tinder for Movies App

This project is a **Tinder-like application** that allows users to browse movies and interact with them. The application consists of a **server (backend)** and **client (frontend)** that communicate with each other.

## Prerequisites

Before setting up and running the application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (Recommended version: 18.x or higher)

## Installation Instructions

To get started with the **Tinder for Movies** app, follow these steps:

### 1. Clone the Repository

Start by cloning the repository to your local machine.

```bash
git clone https://github.com/your-repository/TinderForMovies.git
cd TinderForMovies
```

### 2.Install dependencies

The package.json file in the root folder contains the **dev:app** and **build:app** scripts for running and building the entire application. However, before running the app for the first time, you need to install dependencies for both the client and server separately.

```bash
npm install #To install "concurrently" package, to run both process concurrently from one script
```

```bash
cd client
npm install
```

```bash
cd ../server
npm install
```

### 3.Run the Application in Development Mode

```bash
cd .. # Navigate back to the root folder if you're inside client or server folder
npm run dev:app
```

This command will:

- Start the **SERVER in development mode**.
- Start the **CLIENT in development mode**.
- both process will run concurrently

## 4.Summary

- **dev:app:** Runs the development versions of both the client and server concurrently.
- **build:app:** Builds both the client and server for production.
- **prod:app** Runs the production versions of both the client and server concurrently.
