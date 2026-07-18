# Architecture

**Phase:** MVP (Hackathon) — designed to scale to SaaS

## High-level

```
React (Vite)  --HTTPS/JSON-->  Express API  -->  Controllers
                                      |              |
                                      v              v
                                 Middleware      Services
                                      |              |
                                      v              v
                                 Session/Auth    Mongoose Models
                                                      |
                                                      v
                                                   MongoDB
```

Email and file storage are side effects from Services (Nodemailer/Brevo, Cloudinary/URL).

## Request lifecycle

1. Client calls `/api/...` via Axios (credentials: include for cookies).
2. CORS + JSON body parser + session middleware.
3. Route matches → auth/role middleware → Joi validator (target) → controller.
4. Controller calls service / model methods.
5. Controller returns JSON `{ data }` or `{ error, code, details }`.
6. Side effects (email) after successful persist; errors logged, not thrown to client unless critical.

## Layers

| Layer | Responsibility |
|-------|----------------|
| Routes | Path + method + middleware chain |
| Validators | Joi schemas |
| Controllers | HTTP in/out, status codes |
| Services | Business logic, emails, aggregation |
| Models | Mongoose schemas, simple helpers |
| Middleware | Auth, roles, errors |

## Monolith boundary

MVP is a modular monolith. Do not split microservices for hackathon.
