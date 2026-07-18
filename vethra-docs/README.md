# Vethra Documentation

> **Source of truth** for product, architecture, API, UI, and hackathon delivery.
> Every implementation decision should trace back to these documents.

> **Start here for hackathon coding:** [`12-hackathon/mvp.md`](./12-hackathon/mvp.md) → [`12-hackathon/build-order.md`](./12-hackathon/build-order.md) → [`01-product/appointments.md`](./01-product/appointments.md) → [`06-api/appointments.md`](./06-api/appointments.md).

**Vethra** is a shared digital healthcare platform for pets: pet owners and veterinary clinics manage profiles, appointments, medical records, prescriptions, and follow-up care in one system.

---

## How to use this repo (AI agents & humans)

1. Start with [`12-hackathon/mvp.md`](./12-hackathon/mvp.md) for what to build *now*.
2. Read [`00-project/vision.md`](./00-project/vision.md) and [`00-project/scope.md`](./00-project/scope.md) for boundaries.
3. Implement one feature at a time using its file under `01-product/`, matching schemas in `03-database/` and endpoints in `06-api/`.
4. Follow stack conventions in `02-system-design/tech-stack.md` and folder layout in `02-system-design/folder-structure.md`.
5. Do **not** build Future/Phase 2 features during the hackathon unless listed as stretch goals.

### Phase labels

| Label | Meaning |
|-------|---------|
| **MVP** | Must ship for AnimalHack 2026 |
| **Phase 2** | Immediately after hackathon |
| **Future** | Long-term SaaS roadmap |

---

## Tech stack (canonical)

| Layer | Choice |
|-------|--------|
| Frontend | React 19 + Vite + React Router |
| HTTP client | Axios |
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |
| Validation | Joi (target; add if missing) |
| Auth | Session cookies + Passport Local (current) / bcrypt |
| Email | Nodemailer / Brevo |
| File storage | URL fields now; Cloudinary target |
| Deploy | Vercel (FE) + Railway/Render (BE) + MongoDB Atlas |

---

## Document map

| Folder | Purpose |
|--------|---------|
| [`00-project/`](./00-project/) | Vision, problem, goals, personas, scope |
| [`01-product/`](./01-product/) | Feature specs (stories, rules, AC) |
| [`02-system-design/`](./02-system-design/) | Architecture, stack, folders, errors |
| [`03-database/`](./03-database/) | Mongoose collections, indexes, relationships |
| [`04-backend/`](./04-backend/) | Controllers, middleware, validators, services |
| [`05-frontend/`](./05-frontend/) | Pages, state, routing, components |
| [`06-api/`](./06-api/) | REST contracts |
| [`07-ui-ux/`](./07-ui-ux/) | Design system, branding, accessibility |
| [`08-workflows/`](./08-workflows/) | End-to-end user flows |
| [`09-security/`](./09-security/) | AuthZ, ownership, hardening |
| [`10-testing/`](./10-testing/) | Test strategy & acceptance cases |
| [`11-deployment/`](./11-deployment/) | Envs, deploy, checklist |
| [`12-hackathon/`](./12-hackathon/) | MVP cut, demo, build order |
| [`13-roadmap/`](./13-roadmap/) | Phases, AI, monetization |

### Cross-cutting guides (root)

- [`CONTRIBUTING.md`](./CONTRIBUTING.md)
- [`CODE_STYLE.md`](./CODE_STYLE.md)
- [`API_STYLE_GUIDE.md`](./API_STYLE_GUIDE.md)
- [`COMPONENT_GUIDE.md`](./COMPONENT_GUIDE.md)
- [`DATABASE_DECISIONS.md`](./DATABASE_DECISIONS.md)
- [`ERROR_CODES.md`](./ERROR_CODES.md)
- [`STATE_MANAGEMENT.md`](./STATE_MANAGEMENT.md)
- [`ROUTING.md`](./ROUTING.md)
- [`AUTH_FLOW.md`](./AUTH_FLOW.md)
- [`EMAILS.md`](./EMAILS.md)
- [`FILE_STORAGE.md`](./FILE_STORAGE.md)
- [`SEARCH.md`](./SEARCH.md)
- [`NOTIFICATIONS.md`](./NOTIFICATIONS.md)
- [`LOGGING.md`](./LOGGING.md)
- [`PERFORMANCE.md`](./PERFORMANCE.md)
- [`ACCESSIBILITY.md`](./ACCESSIBILITY.md)

---

## Relationship to `docs/`

Legacy notes live in `/docs/FEATURES.md` and `/docs/PROJECT_OVERVIEW.md`.
**Prefer `vethra-docs/` for all new work.** Keep legacy docs as historical context only.

---

## One-line product question

> Can a pet owner find a clinic, book a visit with a clear reason, and can the clinic accept that visit and start care—all in one platform?
