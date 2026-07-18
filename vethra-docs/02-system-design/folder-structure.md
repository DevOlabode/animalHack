# Folder Structure

Align new code to this layout (matches/extends current repo).

```
vethra/
├── frontend/
│   ├── public/
│   ├── services/           # Axios API modules (auth, pets, ...)
│   └── src/
│       ├── api/            # (optional) thin API wrappers
│       ├── assets/
│       ├── components/     # shared UI
│       ├── context/        # AuthContext
│       ├── features/       # (Phase 2) feature folders
│       ├── hooks/
│       ├── layouts/        # AppShell, PublicShell, AuthLayout
│       ├── views/          # route-level pages (current)
│       ├── pages/          # alias ok if migrating naming
│       ├── routes/         # route objects (optional)
│       ├── store/          # Zustand later
│       ├── styles/
│       ├── utils/
│       ├── App.jsx
│       └── main.jsx
├── backend/
│   ├── config/             # db, passport, env
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/           # email, authPayload, slots
│   ├── utils/
│   ├── validators/         # Joi schemas (add)
│   ├── scripts/            # seed
│   ├── uploads/            # local only
│   └── src/index.js
├── docs/                   # legacy
└── vethra-docs/            # THIS specification set
```

## Naming

- Controllers: `nouns.js` matching routes (`appointments.js`)
- Models: PascalCase file `Pet.js` → model `Pet`
- Views: `SomethingView.jsx`
- Joi: `validators/appointment.validator.js`
