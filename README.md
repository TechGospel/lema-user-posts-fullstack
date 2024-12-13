# Application Setup and Run Guide

This document provides step-by-step instructions for setting up and running both the frontend and backend of the application.

## Prerequisites
Ensure the following are installed on your system:

1. **Node.js** (v16 or higher)
2. **npm** or **yarn** (package manager)
3. **SQLite** (for backend database)

---

## Backend Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/TechGospel/lema-user-posts-fullstack
   cd backend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```


3. **Run the Backend Server**
   ```bash
   npm run dev
   ```
   The backend will start at [http://localhost:3001](http://localhost:3001).

---

## Frontend Setup

1. **Navigate to the Frontend Directory**
   ```bash
   cd frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   - Create a `.env` file in the `frontend` directory.
   - Add the following variables:
     ```env
     REACT_APP_API_BASE_URL=http://localhost:3001
     ```

4. **Run the Frontend Application**
   ```bash
   npm start
   ```
   The application will open in your default browser at [http://localhost:3000](http://localhost:3000).

---

## Running Tests

1. ```bash
   npm test
   ```

### Frontend
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Run the tests:
   ```bash
   npm test
   ```



## API Documentation

To be included in next version

---

## Production URLs
1. Frontend application: [https://lema-user-posts-fullstack-baqk.vercel.app/](https://lema-user-posts-fullstack-baqk.vercel.app/)
2. Backend service: [https://lema-user-posts-fullstack.onrender.com/](https://lema-user-posts-fullstack.onrender.com)

## Notes
- Ensure both frontend and backend are running simultaneously.
- Update `REACT_APP_API_BASE_URL` in the frontend `.env` file if the backend is running on a different URL.

For any issues, please contact the development team or refer to the project repository documentation.

