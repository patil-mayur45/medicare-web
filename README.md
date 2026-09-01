# MediCare+ — Doctor Appointment Booking App

A full-stack appointment booking platform where patients can register, browse
services, book appointments with a specialty/date/time, upload medical
reports, and track their appointment history.

Live-quality UI details included: skeleton loaders, empty states, error
states with retry, toast notifications, modal confirmations, an animated
hero/carousel/accordion on the homepage, and a responsive sidebar dashboard.

---

## Tech Stack

**Frontend:** React (Vite), Redux Toolkit, React Router DOM, Tailwind CSS,
react-icons, react-hot-toast, axios, Vitest + React Testing Library

**Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT auth, bcryptjs,
multer (file uploads), express-validator

---

## Project Structure

```
medicare-app/
├── backend/
│   ├── config/          # DB connection
│   ├── controllers/     # Route handlers (auth, appointments, services, profile)
│   ├── middleware/      # auth (JWT), upload (multer), centralized error handler
│   ├── models/          # User, Appointment, Service (Mongoose schemas)
│   ├── routes/          # Express routers
│   ├── utils/           # token generator, service seeder
│   ├── uploads/          # profile pictures & report uploads (served statically)
│   ├── .env.example
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/  # Header, Footer, Sidebar, Carousel, Accordion, Modal,
    │   │                  FormInput, Spinner, ErrorState, EmptyState, skeletons/
    │   ├── pages/        # Home, Login, Signup, Profile, BookAppointment,
    │   │                  MyAppointments, Services, NotFound
    │   ├── redux/         # store.js + slices/ (auth, appointments, services, ui)
    │   ├── services/      # axios instance + API wrapper functions
    │   ├── utils/         # form validators
    │   ├── hooks/         # useForm (generic form-state hook)
    │   └── tests/         # Vitest + RTL test suites
    ├── .env.example
    └── vite.config.js
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- A MongoDB connection string (local MongoDB or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster)

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/medicare   # or your Atlas connection string
JWT_SECRET=replace_this_with_a_long_random_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

Seed the "Services" collection (used on the Services page):

```bash
npm run seed
```

Start the API:

```bash
npm run dev      # nodemon, auto-restarts on changes
# or
npm start
```

The API runs at `http://localhost:5000`. Health check: `GET /api/health`.

### 2. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
```

Edit `.env` if your backend runs somewhere other than `localhost:5000`:

```
VITE_API_URL=http://localhost:5000/api
```

Start the dev server:

```bash
npm run dev
```

The app runs at `http://localhost:5173`.

### 3. Run Tests

```bash
cd frontend
npm test
```

Covers: Login form (validation + submit), Book Appointment form (validation +
submit), and My Appointments list (loading / loaded / empty / error states).

---

## API Overview

| Method | Endpoint                        | Auth | Description                        |
|--------|----------------------------------|------|-------------------------------------|
| POST   | /api/auth/signup                | No   | Register a new patient              |
| POST   | /api/auth/login                 | No   | Log in, returns JWT                 |
| GET    | /api/auth/me                    | Yes  | Get current logged-in user          |
| PUT    | /api/profile                    | Yes  | Update profile (+ picture upload)   |
| POST   | /api/appointments               | Yes  | Book an appointment (+ report file) |
| GET    | /api/appointments?year=&status= | Yes  | List my appointments (filterable)   |
| PATCH  | /api/appointments/:id/cancel    | Yes  | Cancel an appointment               |
| GET    | /api/services                   | No   | List hospital services              |

All errors return: `{ success: false, message: "..." }`.

---

## Deployment

### Frontend (Vercel / Netlify)
1. Push the `frontend/` folder to a GitHub repo (or the whole monorepo with
   the project root set to `frontend/`).
2. Set the build command to `npm run build`, output directory `dist`.
3. Add environment variable `VITE_API_URL` pointing to your deployed backend
   (e.g. `https://your-api.onrender.com/api`).

### Backend (Render / Heroku)
1. Push the `backend/` folder to a GitHub repo (or set the root directory to
   `backend/` in your host's settings).
2. Set the start command to `npm start`.
3. Add environment variables: `MONGO_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN`,
   `CLIENT_URL` (your deployed frontend URL, for CORS).
4. If your host uses ephemeral storage (e.g. Render free tier), note that
   uploaded files in `/uploads` won't persist across deploys — for
   production, swap the `multer` disk storage for a cloud storage provider
   (S3, Cloudinary, etc.).

---

## Notes & Possible Extensions
- Authentication uses JWT stored in `localStorage` and attached via an axios
  request interceptor.
- Passwords are hashed with bcrypt before saving (pre-save Mongoose hook).
- File uploads are validated by type and size (3MB for profile pictures, 5MB
  for reports) via multer.
- The "Services" page pulls its content from MongoDB — run `npm run seed` in
  the backend to populate sample data.
- Possible next steps: doctor-side dashboard, appointment reminders (email/SMS),
  admin panel for managing services, pagination on My Appointments, dark mode.
