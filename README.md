# Portfolio + Admin Panel

A fully customizable portfolio with a built-in admin panel to edit **every** section —
hero, about, work, contact, theme colors, fonts, SEO — without touching code.

- **Next.js 16** (App Router) + React 19 + Tailwind CSS 4
- **MongoDB** via **Mongoose** (all site content lives in one `sitecontent` doc)
- **JWT** auth (signed `admin_token` HttpOnly cookie, verified with `jsonwebtoken` +
  an Edge-compatible Web Crypto check in `proxy.ts` — Next 16's renamed middleware)
- **bcryptjs** password hashing
- **Cloudinary** image / PDF uploads (URLs stored in MongoDB)

## Setup

### 1. Environment variables

Copy `.env.example` to `.env` and fill in your credentials:

```bash
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/portfolio
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
JWT_SECRET=<any long random string>
ADMIN_EMAIL=admin@rashid.dev
ADMIN_PASSWORD=admin12345
```

> Note: `MONGODB_URI`, `CLOUDINARY_*` and `JWT_SECRET` must also be added to your
> **Vercel project settings — Environment Variables** before deploying.

### 2. Install & seed

```bash
npm install
npm run seed       # creates the admin account + seeds the default portfolio
npm run dev        # http://localhost:3000
```

The seed is idempotent — it skips anything that already exists.

### 3. Open the admin panel

Visit **http://localhost:3000/admin/login** and sign in with the credentials from
your `.env`. You're redirected there automatically if you open any `/admin/*` page.

## Admin features

| Page | What you can edit |
| --- | --- |
| **Profile** | Logo text, nav links, hero greeting / title / subtitle, profile photo (Cloudinary), resume PDF |
| **About** | Bio, skills list, stats ("By The Numbers"), experience timeline |
| **Work** | Project cards — cover image, date, title, description |
| **Contact** | Heading, description, image, CTA button, contact links |
| **Settings** | SEO meta, footer text, **theme colors** (color pickers), fonts, custom CSS |

Changes are saved to MongoDB and appear on the site on the next visit.

## Common scripts

```bash
npm run dev        # development server (port 3000)
npm run build      # production build
npm run start      # production server
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
npm run seed       # seed admin + default content
```

## Architecture

```
Browser /            (portfolio, server-rendered from MongoDB)
        /admin/*    (protected editors)
             |
             |-- PUT /api/admin/content --> Mongoose (SiteContent)
             |-- POST /api/admin/upload --> Cloudinary --> URL stored in Mongo
             +-- /api/auth/* --> Mongoose (AdminUser) + JWT HttpOnly cookie
```

- `proxy.ts` — guards `/admin/*`, redirects to `/admin/login`.
- `(panel)/layout.tsx` — real authorization (JWT verify + DB lookup).
- `lib/content.ts` — `getContent()` (with `DEFAULT_CONTENT` fallback so the site
  always renders even if MongoDB is unreachable) and `saveContent()`.
- `lib/validate.ts` — whitelists and sanitizes every admin save + upload.

## Deploying to Vercel

1. Push this repo to GitHub and import it in Vercel.
2. Add all env vars (including `MONGODB_URI`, `CLOUDINARY_*`, `JWT_SECRET`).
3. Create the MongoDB collection + admin account by running the seed **once**
   against the same cluster:
   ```bash
   MONGODB_URI=... ADMIN_EMAIL=... ADMIN_PASSWORD=... npx tsx scripts/seed.ts
   ```
4. Deploy. The admin panel lives at `your-site.vercel.app/admin/login`.

> Serverless-safe: sessions are stateless JWTs in cookies, the Mongoose connection
> is cached per instance, and uploads go straight to Cloudinary (no server disk writes).