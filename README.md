# Task Management System
This project is a Task Management System built using React and React Router. It allows users to log in, register, manage tasks, and categorize them into different types.

## Features

User Authentication (Login/Registration)
Task Management:
Add, edit, and delete tasks
Filter tasks by description, type, and date
Mark tasks as completed
Dynamic routing using React Router
Responsive design with clean and modern UI

## Getting Started
### Prerequisites

Before running the project, make sure you have:
Node.js installed on your computer
A package manager like npm or yarn

### Installation

Clone this repository to your local machine:
git clone <repository-url>

Navigate to the project folder:
cd cinema-gestao
Install all dependencies:

npm install
Running the Project
To start the development server, run:

npm start
This will launch the application at http://localhost:3000.

## Project Structure

The project is organized as follows:

cinema-gestao/
├── node_modules/          # Auto-generated dependencies (after npm install)
├── public/                # Static files
│   ├── index.html         # Main HTML template
│   └── favicon.ico        # App icon
├── src/                   # Source code
│   ├── assets/            # Static assets (e.g., images, styles)
│   ├── App.jsx            # Main app component
│   ├── index.jsx          # Entry point for React
│   ├── Login.jsx          # Login page component
│   ├── Registo.jsx        # Registration page component
│   ├── Tarefas.jsx        # Task management page component
│   └── styles.css         # Shared global styles
├── package.json           # Project configuration and dependencies
├── README.md              # Project documentation
└── .gitignore             # Files and folders to ignore in Git


## How It Works

## Pages & Components

### Login Page (Login.jsx)

Allows users to log in using a predefined username and password.
Redirects authenticated users to the Tarefas page.

### Registration Page (Registo.jsx)

Users can register by entering their email, username, and password.

### Task Management Page (Tarefas.jsx)

Add, edit, delete, and complete tasks.
Filter tasks based on description, type, or date.
Uses useState for state management.

## Navigation

Routing is handled using React Router:

/ - Login Page
/registo - Registration Page
/tarefas - Task Management Page (restricted to authenticated users)

## Styling

All styling is done using CSS files.
Shared styles are in styles.css.
Component-specific styles are included in their respective .css files.

## Future Improvements

Connect the app to a backend service for data persistence.
Implement more robust authentication with JWT or OAuth.
Add unit and integration tests for better reliability.

## License

This project is licensed under the MIT License.
