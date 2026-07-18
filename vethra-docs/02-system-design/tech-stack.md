# Tech Stack

## Canonical (this project)

### Frontend

| Package | Use |
|---------|-----|
| React 19 | UI |
| Vite | Dev/build |
| React Router 7 | Routes |
| Axios | API client |
| CSS (existing) / Tailwind (optional adopt) | Styling |
| Lucide or local icons | Icons |

Recommended additions (Phase 2 or if time): React Hook Form, TanStack Query, Zustand, shadcn/ui.

### Backend

| Package | Use |
|---------|-----|
| Node.js + Express 5 | API |
| Mongoose 9 | ODM |
| MongoDB | Database |
| bcryptjs | Password hashing |
| express-session + connect-mongo | Sessions |
| passport / passport-local (if used) OR custom session auth | Auth |
| Joi | Request validation (**add if not present**) |
| Nodemailer / @getbrevo/brevo | Email |
| dotenv | Config |
| multer | Uploads (when local) |
| cors | CORS |

### Auth note

**Current codebase:** cookie sessions + bcrypt User model.  
**Spec standard:** keep sessions for web MVP (simple with Axios credentials). JWT is optional for future mobile clients — see `AUTH_FLOW.md`.

### Infrastructure

| Service | Use |
|---------|-----|
| MongoDB Atlas | DB |
| Vercel | Frontend |
| Railway / Render | Backend |
| Cloudinary | Images/docs (target) |
| Brevo / SMTP | Email |

## Explicit non-stack (hackathon)

Next.js, Prisma, PostgreSQL, Clerk — do not migrate mid-hackathon.
