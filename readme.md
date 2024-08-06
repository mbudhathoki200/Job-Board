# Job Board

Job Board is a full-stack application that allows users to post and apply for jobs. It provides a platform for employers to list job openings and for job seekers to find and apply for jobs.

## Features

- User authentication (login/logout)
- CRUD operations for job listings
- Search and filter job listings
- Apply to jobs
- Manage job applications

## Technologies

- **Frontend:** HTML, CSS, Tailwind CSS, TypeScript, Vite
- **Backend:** Node.js with Express.js
- **Database:** PostgreSQL

## Installation

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- PostgreSQL (v12 or later)

### Setting up the Frontend

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/job-board.git

   ```

2. Navigate to the frontend directory:

   ```bash
   cd job-board/frontEnd

   ```

3. Install dependencies and run the development server:

   ```bash
    npm install
    npm run dev

   ```

The frontend should now be running on http://localhost:5173.

### Setting up the Backend

1. Open a new terminal window and navigate to the backend directory:

   ```bash
   cd job-board/backEnd

   ```

2. Install dependencies:

   ```bash
   npm install

   ```

3. Set up the environment variables in a .env file with your PostgreSQL configuration:

   ```bash
    DATABASE_URL=postgresql://username:password@localhost:5432/jobboard

   ```

4. Run database migrations:

   ```bash
    npm run migrate

   ```

5. Start the backend server:

   ```bash
    npm start
   The backend should now be running on http://localhost:3000 or the port specified in your environment variables.
   ```
