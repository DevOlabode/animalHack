# Configuration

## Backend env

| Variable | Required | Description |
|----------|----------|-------------|
| PORT | no | Default 3000/5000 |
| MONGODB_URI | yes | Atlas/local URI |
| SESSION_SECRET | yes | Session signing |
| CLIENT_URL | yes | Frontend origin for CORS + emails |
| SMTP_* or BREVO_* | for mail | Email provider |
| NODE_ENV | yes | development/production |
| CLOUDINARY_* | Phase 2 | Uploads |

## Frontend env

| Variable | Description |
|----------|-------------|
| VITE_API_URL | Backend base URL |

Never commit secrets. Use `.env.example` without values.
