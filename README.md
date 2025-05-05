# NoteFlow

A full-stack note-taking application built with React, Express, and MongoDB.

## Getting Started (Local Development)

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/) (running locally or provide a remote URI)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/noteflow.git
   cd noteflow
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory with the following content:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/noteflow
   VITE_API_URL=http://localhost:5000/api
   ```

   - Adjust `MONGODB_URI` if your MongoDB is running elsewhere.

4. **Start MongoDB:**

   Make sure your MongoDB server is running. For a local install, you can usually start it with:
   ```bash
   mongod
   ```

5. **Run the application:**
   ```bash
   npm run dev
   ```

   - This will start both the frontend (Vite, default at [http://localhost:5173](http://localhost:5173)) and backend (Express, at [http://localhost:5000](http://localhost:5000)) servers concurrently.

6. **Open your browser:**

   Visit [http://localhost:5173](http://localhost:5173) to use the app.

---

## Scripts

- `npm run dev` — Start both frontend and backend in development mode
- `npm run dev:frontend` — Start only the frontend (Vite)
- `npm run dev:backend` — Start only the backend (Express)
- `npm run build` — Build the frontend for production
- `npm run lint` — Run ESLint

---

## Troubleshooting

- Ensure MongoDB is running and accessible at the URI you provided.
- If ports 5000 or 5173 are in use, update the `.env` and/or Vite config accordingly.

---
