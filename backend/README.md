# Personal Finance Tracker Backend

This is the backend server for the Personal Finance Tracker application.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/personal-finance-tracker
JWT_SECRET=your_jwt_secret_key_here
```

3. Make sure MongoDB is running on your system

## Running the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- GET /api/auth/profile - Get user profile

### Transactions
- GET /api/transactions - Get all transactions
- POST /api/transactions - Create a new transaction
- GET /api/transactions/:id - Get a specific transaction
- PUT /api/transactions/:id - Update a transaction
- DELETE /api/transactions/:id - Delete a transaction 