# Skyline Computer World

Next.js + Supabase catalogue with WhatsApp ordering.

## Setup

1. **Supabase**: SQL Editor → paste and run `supabase/schema.sql`.
2. Authentication → Users → **Add user** (email + password) for the admin.
3. Run this once in the SQL Editor (your email):
   `insert into public.admin_users (user_id) select id from auth.users where email = 'you@example.com';`
4. Copy `.env.example` to `.env.local` and fill in the Supabase URL, anon key and site URL (**never** use the service-role key).
5. `npm install` then `npm run dev` → http://localhost:3000. Admin: `/admin/login`.

## Deploy (Netlify)

Push to Git, import the repo in Netlify, add the three environment variables from `.env.example`, deploy. After deploying, test:
`/`, a product page, `/admin/login`, `/admin/dashboard`, and Catalogue → Cart → WhatsApp.

## Notes

- Public pages refresh from Supabase every 30 seconds (`revalidate = 30`).
- Products sharing the same **brand + model** are automatically grouped on the product page as "Other configurations".
- Fonts: Inter (headings/body) + JetBrains Mono (prices).
- Icons: `lucide-react`.
- Design: refined light + dark theme, red brand accent, black/white toggle.