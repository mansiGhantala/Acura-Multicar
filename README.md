# AcuraMuti

AcuraMuti is a full-stack web application with a React + Vite client and a Node.js + Express server.

## Project Structure

- `client/` - Frontend (React, Vite)
- `server/` - Backend (Node.js, Express, MongoDB)

## Getting Started

### Prerequisites

- Node.js
- npm 
- MongoDB

### Installation

1. Clone the repository
2. Install dependencies for both client and server:

   ```sh
   cd client
   npm install
   cd ../server
   npm install
   ```

### Running the App

- Start the server:

  ```sh
  cd server
  npm start
  ```

- Start the client:

  ```sh
  cd client
  npm run dev
  ```

## Features

- Product management (CRUD)
- Image upload (multer)
- WhatsApp order integration
- Admin controls

## Environment Variables

- Configure `.env` files in both `client/` and `server/` directories.

## License

MIT