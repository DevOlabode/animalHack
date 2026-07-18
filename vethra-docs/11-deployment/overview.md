# Deployment

## Target topology

```
Vercel (frontend) → Railway/Render (Express) → MongoDB Atlas
                         ↓
                   Brevo/SMTP email
```

## Frontend

- Build: `npm run build`
- Env: `VITE_API_URL=https://api.example.com`

## Backend

- Start: `npm start`
- Env: see `02-system-design/configuration.md`
- Health route recommended: `GET /api/health`

## CORS

Must allow frontend origin with credentials.
