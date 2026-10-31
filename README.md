<div align="center">

# 🩺 MediCare+

### Your health, booked in minutes.

A full-stack doctor appointment booking website built with the MERN stack.

[![Live Demo](https://img.shields.io/badge/Live-Demo-1d7c86?style=for-the-badge)](https://medicare-web-eosin.vercel.app)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repo-181717?style=for-the-badge&logo=github)](https://github.com/patil-mayur45/medicare-web)

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Redux](https://img.shields.io/badge/Redux-764ABC?style=flat&logo=redux&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white)

</div>

---

## 📖 About

**MediCare+** is a doctor appointment booking website. Users can sign up, log in, book an appointment by choosing the doctor type, date, and time, upload medical reports, and see or cancel their appointments from a personal dashboard.

The app is fully responsive and includes loading skeletons, empty states, error messages with retry, and toast notifications, so it feels smooth and easy to use.

🔗 **Live Demo:** https://medicare-web-eosin.vercel.app

> ⏳ The backend runs on a free Render plan, so the first request after a period of inactivity can take 30–60 seconds to wake up.

---

## ✨ Features

- 🔐 **Secure authentication** — sign up and log in with JWT, passwords hashed with bcrypt
- 📅 **Book an appointment** — choose doctor specialty, date, time, and add comments
- 📎 **Upload reports** — attach a PDF or image to your appointment
- 🗂️ **My Appointments** — view all appointments as cards, filter by year, and cancel
- 👤 **Patient profile** — update personal details and upload a profile picture
- 🏥 **Services page** — browse the services the hospital offers
- 🎠 **Home page extras** — hero banner, testimonials carousel, and FAQ accordion
- ✅ **Form validation** — on both the frontend and the backend
- ⚡ **Great UX** — skeleton loaders, empty states, error states with retry, toast notifications
- 📱 **Responsive design** — works on mobile, tablet, and desktop
- 🧪 **Unit tests** — login form, booking form, and appointment list

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Languages** | JavaScript, HTML, CSS |
| **Frontend** | React (Vite), Redux Toolkit, React Router, Tailwind CSS, React Icons, Axios, React Hot Toast |
| **Backend** | Node.js, Express.js, JWT, bcryptjs, Multer, express-validator |
| **Database** | MongoDB with Mongoose (MongoDB Atlas) |
| **Testing** | Vitest, React Testing Library |
| **Deployment** | Vercel (frontend), Render (backend), MongoDB Atlas (database) |

---

## 📁 Project Structure

```
medicare-web/
├── backend/
│   ├── config/          # Database connection
│   ├── controllers/     # Route logic (auth, appointments, services, profile)
│   ├── middleware/      # JWT auth, file upload, error handler
│   ├── models/          # User, Appointment, Service schemas
│   ├── routes/          # API routes
│   ├── utils/           # Token generator, services seeder
│   ├── uploads/         # Uploaded profile pictures and reports
│   └── server.js
│
└── frontend/
    └── src/
        ├── components/  # Header, Footer, Sidebar, Carousel, Accordion, Modal, etc.
        ├── pages/       # Home, Login, Signup, Profile, BookAppointment, MyAppointments, Services
        ├── redux/       # Store and slices (auth, appointments, services, ui)
        ├── services/    # API calls (Axios)
        ├── hooks/       # useForm custom hook
        ├── utils/       # Form validators
        └── tests/       # Unit tests
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or higher
- A MongoDB database ([MongoDB Atlas](https://www.mongodb.com/atlas) free tier works well)
- [Git](https://git-scm.com/)

### 1. Clone the repository

```bash
git clone https://github.com/patil-mayur45/medicare-web.git
cd medicare-web
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder (you can copy `.env.example`):

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

Add the sample services to the database, then start the server:

```bash
npm run seed
npm run dev
```

The API runs at `http://localhost:5000`.

### 3. Set up the frontend

Open a **new terminal**:

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend` folder:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the app:

```bash
npm run dev
```

Open **http://localhost:5173** in your browser.

### 4. Run the tests

```bash
cd frontend
npm test
```

---

## 🔌 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|:----:|-------------|
| POST | `/api/auth/signup` | ❌ | Register a new user |
| POST | `/api/auth/login` | ❌ | Log in and get a JWT |
| GET | `/api/auth/me` | ✅ | Get the logged-in user |
| PUT | `/api/profile` | ✅ | Update profile and picture |
| POST | `/api/appointments` | ✅ | Book an appointment (with optional report) |
| GET | `/api/appointments` | ✅ | Get my appointments (`?year=` and `?status=` filters) |
| PATCH | `/api/appointments/:id/cancel` | ✅ | Cancel an appointment |
| GET | `/api/services` | ❌ | Get all hospital services |

All errors return the same shape: `{ "success": false, "message": "..." }`

---

## ☁️ Deployment

| Part | Platform | Settings |
|------|----------|----------|
| Frontend | Vercel | Root directory `frontend`, env var `VITE_API_URL` |
| Backend | Render | Root directory `backend`, build `npm install`, start `npm start` |
| Database | MongoDB Atlas | Allow Render's access in **Network Access** |

Backend environment variables on Render: `MONGO_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `CLIENT_URL` (your Vercel URL).

> Files uploaded to a free Render server are not permanent. For production use, store uploads in cloud storage such as Cloudinary or AWS S3.

---

## 🔮 Future Improvements

- Doctor login and doctor dashboard
- Email or SMS appointment reminders
- Cloud storage for uploaded files
- Admin panel to manage services and appointments
- Pagination and search in My Appointments
- Dark mode

---

## 👨‍💻 Author

**Mayur Patil** — Full Stack Web Developer

- GitHub: [@patil-mayur45](https://github.com/patil-mayur45)
- LinkedIn: [Mayur Patil](https://www.linkedin.com/in/mayur-patil-0a14a541b)

---

<div align="center">

⭐ If you like this project, please give it a star on GitHub!

</div>
