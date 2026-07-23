# Vethra Frontend

React + Vite app for the Vethra MVP.

## Develop

```bash
cp .env.example .env
npm install
npm run dev
```

Locally, leave `VITE_API_URL` empty so Vite proxies `/api` to `http://localhost:3000`.

## Production

Set `VITE_API_URL` to your API base (including `/api`), e.g. `https://vethra-api.onrender.com/api`, then:

```bash
npm run build
```

Deploy the `dist/` folder (Vercel: set Root Directory to `frontend`).
