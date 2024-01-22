# Employee Management GraphQL Backend

## Overview
This GraphQL backend system is designed to facilitate employee management. It provides a robust and flexible API built with Node.js, integrating with a PostgreSQL database to offer employee management functionalities.

## Prerequisites
Before setting up the project, ensure you have the following installed:
- Node.js (v14.21.3)
- PostgreSQL

## Installation

### 1. Install Node.js
#### Mac:
Use Homebrew to install Node.js:
\```bash
brew install node@14
\```
#### Windows:
Download and install from the official [Node.js website](https://nodejs.org/).

### 2. Install PostgreSQL
Follow the installation guide for PostgreSQL on your respective operating system. Ensure you remember the credentials for the PostgreSQL user you create during installation.

### 3. Clone the Repository
\```bash
git clone [your-repository-link]
cd employee-management
\```

### 4. Install Dependencies
Navigate to the employee management directory and install the necessary Node.js packages.
\```bash
npm install
\```

### 5. Start PostgreSQL Server
Ensure your PostgreSQL server is up and running.

### 6. Database Setup
Create a new PostgreSQL database with a name of your choice.

### 7. Environment Configuration
Create a `.env` file in the root of your employee management project directory and fill it with your database credentials and details:
\```env
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=
\```

### 8. Run the Application
Execute the following command from the 'employee-management' directory to start the server:
\```bash
npm start
\```

## Usage
After starting the server, you can interact with the GraphQL API at:
`http://localhost:4000/graphql`

## Notes
- The project is configured to run with Node.js version 14.21.3. Ensure you are using this version to avoid potential compatibility issues.
- Always secure your `.env` file and never expose your database credentials publicly.