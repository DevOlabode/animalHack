# Vethra

Shared digital healthcare platform for pets — pet owners and veterinary clinics manage records, appointments, diagnoses, prescriptions, and follow-up care.

## Stack

- Frontend: React 19 + Vite + React Router
- Backend: Node.js + Express 5 + Passport sessions
- Database: MongoDB (Mongoose)
- Email: Brevo (optional in development)

## Quick start

### 1. Backend

```bash
cd backend
cp .env.example .env
# Set DB_URL, SESSION_SECRET, FRONTEND_ORIGIN=http://localhost:5173
npm install
npm run seed    # demo accounts
npm run dev
```

Demo logins (password `demo123456`):

- Owner: `demo@petowner.com`
- Clinic: `demo@happypaws.com`

### 2. Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Open http://localhost:5173 — Vite proxies `/api` to the backend.

## Production deploy

Topology: **Vercel (frontend)** → **Railway/Render (API)** → **MongoDB Atlas** + Brevo.

### Backend env

| Variable | Notes |
|----------|--------|
| `NODE_ENV` | `production` |
| `PORT` | Provided by host, or `3000` |
| `DB_URL` | MongoDB Atlas URI |
| `SESSION_SECRET` | Strong random secret (required) |
| `FRONTEND_ORIGIN` | Exact Vercel URL (CORS + cookies) |
| `BREVO_API_KEY` / `EMAIL_FROM` | Transactional email |

Seed is blocked in production unless `ALLOW_SEED=true`.

Health checks: `GET /health` and `GET /api/health`.

### Frontend env

| Variable | Notes |
|----------|--------|
| `VITE_API_URL` | Full API base, e.g. `https://api.example.com/api` |

Build: `cd frontend && npm run build`

Cookies use `secure` + `sameSite=none` in production (requires HTTPS and `trust proxy`).

## MVP flows

1. Owner signs up / signs in → add pet
2. Browse clinics → book with reason
3. Clinic pending queue → accept / decline (with reason)
4. Patient timeline → diagnosis + prescription + reminder
5. Owner reminders → mark treatment task completed

Docs: `vethra-docs/` (start with `12-hackathon/mvp.md`).
