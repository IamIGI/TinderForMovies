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

## 5.App
The application consists of a **server (backend)** and **client (frontend)** that communicate with each other.
- WebPage: https://igitest.pl/ 
- Project board: https://github.com/users/IamIGI/projects/15/views/1 
# Tinder for Movies App - Main Functionalities

- **Server (Express, Local Database)**: 
  - Backend built with **Express.js**; stores data in a **local database**.

- **Client (Vite React TypeScript)**: 
  - **Frontend** built using **React** with **TypeScript** and bundled via **Vite**.

- **Swipe, Click, and Keyboard Arrow Actions**:
  - Users can **swipe** to like/dislike movies, **click** to view details, and use **arrow keys** for navigation.

- **RWD Design**: 
  - **Responsive Web Design** (mobile, tablet, desktop).

- **Deployed on PM2 Linux Server and Custom Domain (igitest.pl)**: 
  - Hosted on a **Linux server** using **PM2** for process management and **igitest.pl** as the **custom domain**.

![image](https://github.com/user-attachments/assets/1eb7c564-b341-4dd4-b756-1591fc6de5a5)


