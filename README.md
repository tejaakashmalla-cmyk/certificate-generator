# 🎓 Amaanitvam Foundation — Certificate Generator System

> **अमानित्वम् — Humility in Service**

A full-stack MERN application for generating, managing, and verifying official certificates for Amaanitvam Foundation volunteers, interns, and program participants.

---

## ✨ Features

### 🌐 Public
- **Modern NGO-themed homepage** with stats, features, and CTA
- **Certificate Generator** — Fill a form, get a live preview, download PDF
- **Certificate Verification** — Scan QR code to verify authenticity online
- **Dark Mode** toggle with localStorage persistence

### 🎓 Certificate
- Beautiful, print-ready A4 landscape design
- Unique Certificate ID in `AMAN-YYYY-NNN` format
- QR code linking to verification page
- Signature placeholders for Director & Coordinator
- PDF download via jsPDF + html2canvas (high resolution)

### 🔐 Admin
- JWT-based login (7-day token)
- Dashboard with stats (total, this month, unique events)
- Search certificates by name or certificate ID
- Delete certificates with confirmation dialog
- Responsive table with all certificate data

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, Vite, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas (Mongoose) |
| Auth | JWT + bcryptjs |
| PDF | jsPDF + html2canvas |
| QR | qrcode |
| Notifications | react-hot-toast |
| Routing | React Router v6 |

---

## 📁 Folder Structure

```
amaanitvam/
├── backend/
│   ├── controllers/
│   │   ├── authController.js       # Login, setup, getMe
│   │   └── certificateController.js # CRUD + ID generation
│   ├── middleware/
│   │   └── auth.js                 # JWT protect middleware
│   ├── models/
│   │   ├── Admin.js                # Admin user schema
│   │   └── Certificate.js          # Certificate schema
│   ├── routes/
│   │   ├── auth.js                 # /api/auth/*
│   │   └── certificates.js         # /api/certificates/*
│   ├── .env.example
│   ├── package.json
│   ├── render.yaml                 # Render deployment config
│   ├── seed.js                     # Create first admin account
│   └── server.js                   # Express app entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CertificatePreview.jsx  # Visual certificate design
│   │   │   └── Navbar.jsx              # Responsive nav + dark mode
│   │   ├── context/
│   │   │   ├── AuthContext.jsx         # Admin auth state
│   │   │   └── ThemeContext.jsx        # Dark/light mode
│   │   ├── pages/
│   │   │   ├── AdminDashboard.jsx      # Certificate management
│   │   │   ├── AdminLoginPage.jsx      # JWT login
│   │   │   ├── GeneratePage.jsx        # Form + preview + download
│   │   │   ├── HomePage.jsx            # Landing page
│   │   │   └── VerifyPage.jsx          # QR verification
│   │   ├── utils/
│   │   │   └── api.js                  # Axios API wrapper
│   │   ├── App.jsx                     # Router + providers
│   │   ├── index.css                   # Tailwind + custom styles
│   │   └── main.jsx                    # React entry point
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vercel.json                 # Vercel SPA routing
│   └── vite.config.js
│
├── package.json                    # Root scripts
└── README.md
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free tier works)

### 1. Clone the repository
```bash
git clone https://github.com/your-org/amaanitvam-certificates.git
cd amaanitvam-certificates
```

### 2. Install all dependencies
```bash
npm run install:all
# Or manually:
cd backend && npm install
cd ../frontend && npm install
```

### 3. Configure environment variables

**Backend** — copy and edit:
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/amaanitvam
JWT_SECRET=your_long_random_secret_key_here
FRONTEND_URL=http://localhost:5173
ADMIN_EMAIL=admin@amaanitvam.org
ADMIN_PASSWORD=Admin@123
```

**Frontend** — copy and edit:
```bash
cd frontend
cp .env.example .env
```

Edit `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000
```

### 4. Seed the admin account
```bash
npm run seed
# Creates admin with credentials from backend/.env
```

### 5. Start development servers

Terminal 1 (Backend):
```bash
npm run dev:backend
# Runs on http://localhost:5000
```

Terminal 2 (Frontend):
```bash
npm run dev:frontend
# Runs on http://localhost:5173
```

---

## 🔌 API Reference

### Auth
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/login` | ❌ | Admin login → returns JWT |
| POST | `/api/auth/setup` | ❌ | One-time admin creation |
| GET | `/api/auth/me` | ✅ | Get current admin |

### Certificates
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/certificates` | ❌ | Create certificate |
| GET | `/api/certificates` | ✅ | Get all (supports `?search=`) |
| GET | `/api/certificates/:id` | ❌ | Get by ID or certificateId |
| DELETE | `/api/certificates/:id` | ✅ | Delete certificate |

### Health
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server health check |

---

## ☁️ Deployment

### Backend → Render

1. Push code to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your repository, select `backend/` as root
4. Set:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add environment variables:
   - `MONGO_URI` — your Atlas connection string
   - `JWT_SECRET` — random secret key
   - `FRONTEND_URL` — your Vercel frontend URL
6. Deploy!

### Frontend → Vercel

1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your repository, select `frontend/` as root
3. Add environment variable:
   - `VITE_API_URL` — your Render backend URL (e.g., `https://amaanitvam-api.onrender.com`)
4. Deploy!

> **Note:** After deploying backend, run the seed script once to create admin:
> ```bash
> cd backend && MONGO_URI="your_atlas_uri" node seed.js
> ```

---

## 🔒 Security Notes

- JWT tokens expire in 7 days
- Passwords are hashed with bcryptjs (salt rounds: 10)
- Certificate creation is public (no auth required)
- All admin operations (read all, delete) require valid JWT
- Change the default admin password after first login!

---

## 🎨 Certificate ID Format

```
AMAN-2026-001
│    │    └── Sequential number (resets each year)
│    └────── Year
└─────────── Foundation prefix
```

Each certificate also includes a QR code linking to:
`https://your-domain.com/verify/AMAN-2026-001`

---

## 📦 Key Dependencies

```
Backend:
  express         REST API framework
  mongoose        MongoDB ODM
  jsonwebtoken    JWT auth
  bcryptjs        Password hashing
  cors            Cross-origin requests
  dotenv          Env vars

Frontend:
  react           UI library
  vite            Build tool
  tailwindcss     Utility CSS
  react-router-dom  Client routing
  axios           HTTP client
  jspdf           PDF generation
  html2canvas     DOM screenshot
  qrcode          QR code generation
  react-hot-toast  Notifications
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📜 License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">
  <strong>Amaanitvam Foundation</strong><br/>
  <em>अमानित्वम् — Humility in Service</em>
</div>
