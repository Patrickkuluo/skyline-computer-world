# AGENTS.md — Skyline Computer World

## 1. Purpose

This file defines the operating rules for AI coding agents and automated development assistants working on the Skyline Computer World codebase.

The product requirements are defined in `prd.md`.

**Read `prd.md` before making changes.**

`prd.md` defines **what the product must do**.  
`AGENTS.md` defines **how an agent must work on the codebase**.

When requirements conflict with an implementation shortcut, preserve the product requirements unless the user explicitly approves a change.

---

## 2. Project Identity

**Project:** Skyline Computer World

**Business:** Nairobi computer and electronics storefront.

**Primary customer journey:**

```text
Browse
  ↓
Search / Filter
  ↓
Product
  ↓
Configure
  ↓
Cart
  ↓
WhatsApp
```

**Primary admin journey:**

```text
Login
  ↓
Dashboard
  ↓
Add / Edit / Delete Product
  ↓
Upload Images
  ↓
Publish
  ↓
Public Catalogue
```

The project is intentionally a lightweight WhatsApp-commerce storefront, not a full marketplace.

---

## 3. Source of Truth

### Product requirements

`prd.md` is the primary product specification.

Do not silently change requirements because a different implementation appears easier.

### Catalogue data

Supabase is the source of truth for the live product catalogue.

Do not introduce or retain a separate hard-coded product catalogue that conflicts with Supabase.

If the database contains no products, the application should show an appropriate empty state rather than silently restoring old placeholder products.

### Visual identity

The supplied Skyline Computer World logo is the brand source of truth.

Do not replace it with an invented logo unless explicitly requested.

---

## 4. Core Technology

Use the existing approved stack:

- **Next.js**
- **TypeScript**
- **Supabase PostgreSQL**
- **Supabase Auth**
- **Supabase Storage**
- **Netlify**

Prefer the existing project architecture and dependencies.

Do not introduce a new framework, database, authentication provider, hosting provider, CMS, payment provider, or major third-party service without explicit approval.

Prefer native platform functionality where practical.

---

## 5. Development Principles

### Keep it simple

Do not turn the project into a full e-commerce platform.

Before implementing a feature, ask:

> Does this directly support the requirements in `prd.md`?

If not, do not add it merely because it is common in other e-commerce applications.

### Preserve working functionality

When implementing a new feature:

1. Understand the existing implementation.
2. Identify what currently works.
3. Make the smallest sensible change.
4. Verify that existing functionality still works.

Do not rewrite working sections unnecessarily.

### Avoid speculative architecture

Do not introduce abstractions, services, state-management libraries, database layers, or design systems simply because they might be useful later.

Build what the current requirements need.

### Free/low-cost first

The project is intended to operate with free/low-cost services.

Do not introduce paid services, subscriptions, APIs, SaaS dependencies, or infrastructure without explicit user approval.

---

## 6. Product Data Rules

Product information must be factual.

### Never invent

Do not invent:

- Product specifications.
- Model numbers.
- Processor details.
- RAM.
- Storage.
- GPU information.
- Display specifications.
- Warranty information.
- Condition.
- Availability.
- Product features.

If information is unknown, represent it as unknown, pending, or contact-us information according to the existing UI/data model.

### Product condition

Do not hide or soften relevant condition information.

For refurbished products, use the actual condition supplied by the admin.

### Pricing

Use the actual retail price stored for the product.

Do not automatically introduce:

- Fake discounts.
- Artificial sale prices.
- Strikethrough pricing.
- Countdown timers.
- Unsupported "best price" claims.

---

## 7. Catalogue Rules

The approved categories are:

### Computers
- Laptops
- Desktop Computers

### Computer Accessories
- Keyboards & Mice
- Headphones & Audio
- Speakers
- Adapters & Converters
- Splitters
- Networking

### Electronics
- Power & Electronic Accessories

### Security
- CCTV Cameras

### Phones and Tablets

- Phone accessories.
- Repairs.
- General technical support.

The category architecture should remain extensible.

---

## 8. Availability Rules

Supported states:

- `In Stock`
- `Available on Order`
- `Out of Stock`

### In Stock

- Display normally.
- Allow adding to cart.

### Available on Order

- Display normally.
- Allow adding to cart.

### Out of Stock

- Keep visible.
- Clearly display unavailable status.
- Do not allow normal purchase/cart behaviour unless the product requirements are explicitly changed.

Do not claim that inventory is real-time.

WhatsApp remains the final availability confirmation.

---

## 9. Product Configuration Rules

Some products have selectable configurations.

Examples:

- Processor
- RAM
- Storage
- Screen
- Condition
- Other product-specific options

Configuration selections must travel with the cart item.

Never reduce a configured product to only its base product name when creating an order.

Example:

```text
Lenovo X390
Processor: Core i7
RAM: 16GB
Storage: 256GB SSD
```

must remain distinguishable from another X390 configuration.

---

## 10. Product Images

Products support 1–6 images.

The admin must be able to:

- Upload.
- Replace.
- Remove.
- Associate images with products.

Use Supabase Storage for production product images.

Temporary placeholders are acceptable during development/previews, but they are not the live catalogue source of truth.

Do not make the public site dependent on placeholder products.

---

## 11. Search and Filtering

Required search behaviour:

- Search button works.
- Enter submits the search.
- Search takes the user to/applies to the catalogue.
- Results reflect the search term.

Required filtering:

- Category.
- Brand.
- Relevant product-specific specifications.

A floating clear-filter control should be available when filter/search state is active.

### Mobile

Filters should be accessible through a retrievable drawer/bottom-sheet interaction.

Do not force mobile users to repeatedly scroll through a long filter area.

### Desktop

Preserve the desktop filter experience unless the user explicitly requests a redesign.

---

## 12. Product Pages

Each product must have a dedicated shareable URL.

Expected route:

```text
/products/[slug]
```

Product pages should include:

- Breadcrumbs.
- Product name.
- Product images.
- Price.
- Availability.
- Description.
- Specifications.
- Configuration controls where applicable.
- Add to cart.
- Share.

Use product-specific metadata where practical.

Do not break existing product URLs unnecessarily.

---

## 13. Cart Rules

The cart must support:

- Multiple products.
- Quantities.
- Quantity adjustment.
- Item removal.
- Product configurations.
- Total item count.
- Retail subtotal.

Cart state must preserve configuration selections.

Do not convert the cart into a checkout/payment system unless the user explicitly changes the scope.

---

## 14. WhatsApp Rules

Primary WhatsApp number:

```text
+254798321910
```

WhatsApp is the final order/enquiry channel.

The generated message must preserve the approved structure:

```text
Hello Skyline Computers, I'd like to order:

1 × Lenovo X390

Brand: Lenovo
Model: X390
Processor: Core i7
RAM: 16GB
Storage: 256GB SSD
Screen: 13.3"
Condition: Refurbished
Availability: In Stock
Price: KSh 27,000

TOTAL ITEMS: 1
RETAIL SUBTOTAL: KSh 27,000

Please confirm availability, delivery options and final price.
```

For multiple items, repeat the product/configuration block for each cart item.

### Do not add

Do not automatically add the countrywide-delivery sentence to the WhatsApp message.

Delivery information belongs on the website.

Do not silently change the destination WhatsApp number.

---

## 15. Store Information

Use the approved physical-store information:

```text
Terry House
Mfangano Street
Shop G15
Nairobi CBD
Kenya
```

The Google Maps link supplied for the project is:

```text
https://maps.app.goo.gl/9YKbF3SwdGFrBY8S6?g_st=aw
```

"Visit Our Store" should take users to the footer/location section.

Do not invent another address.

---

## 16. Delivery

The website should state:

> Countrywide delivery available. Delivery charges depend on destination.

SpeedAF is the stated delivery provider.

Do not build a delivery calculator unless explicitly requested.

Do not invent delivery prices.

Do not place the delivery sentence into the generated WhatsApp order unless the PRD is explicitly changed.

---

## 17. Admin Rules

Admin routes:

```text
/admin/login
/admin/dashboard
```

Admin functionality requires authentication.

The admin must be able to:

- View products.
- Add products.
- Edit products.
- Delete products.
- Upload product images.
- Set price.
- Set availability.
- Set category.
- Set brand.
- Enter descriptions.
- Enter specifications.
- Publish products.

Do not expose administrative write functionality to public users.

---

## 18. Authentication and Security

Use Supabase Auth for administrators.

Use the existing `admin_users` authorization model.

Use Supabase Row Level Security.

### Critical security rule

Never expose the Supabase:

```text
Secret / Service Role key
```

to:

- Client-side code.
- Browser bundles.
- Public environment variables.
- Git.
- Documentation intended for public use.
- WhatsApp messages.
- Source files committed to the repository.

The frontend may use the intended publishable/anonymous key through:

```text
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

and the project URL through:

```text
NEXT_PUBLIC_SUPABASE_URL
```

Never ask the user to paste passwords or secret credentials into source code.

Never print secret credentials in logs.

---

## 19. Environment Variables

Expected public frontend variables:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

If additional environment variables become necessary:

1. Explain why.
2. Prefer non-secret configuration where possible.
3. Do not expose secrets to the browser.
4. Update project documentation.

Never hard-code environment-specific credentials.

---

## 20. Database Changes

Before changing the Supabase schema:

1. Inspect the existing schema.
2. Understand current tables and RLS policies.
3. Determine whether the change is actually required.
4. Prefer backward-compatible changes.
5. Update the relevant SQL/documentation.
6. Do not casually destroy or reset existing production data.

Never tell the user to run destructive SQL without clearly explaining its effect.

Avoid destructive migrations such as:

```sql
DROP TABLE
TRUNCATE
DROP COLUMN
```

unless explicitly required and approved.

---

## 21. RLS Changes

Treat RLS policies as security-critical code.

When modifying RLS:

- Understand who needs SELECT access.
- Understand who needs INSERT access.
- Understand who needs UPDATE access.
- Understand who needs DELETE access.
- Ensure public users cannot obtain admin write privileges.
- Ensure authenticated admin access is tied to the intended authorization model.

Never disable RLS simply to make an error disappear.

---

## 22. File and Project Structure

Respect the existing Next.js App Router architecture.

Expected major areas include:

```text
app/
  admin/
  products/
  ...
lib/
  ...
public/
  ...
```

Do not reorganize the entire project merely for stylistic preference.

Before moving files, determine whether imports, routes, deployment, or generated metadata depend on the existing location.

---

## 23. Next.js Rules

Use the installed Next.js version unless there is a concrete reason to upgrade.

Do not upgrade major dependencies automatically.

Before upgrading:

1. Identify why the upgrade is needed.
2. Check compatibility.
3. Check affected APIs.
4. Build/test the project.
5. Document meaningful changes.

Avoid introducing client components where server components are sufficient.

Do not move logic client-side simply because it is easier.

---

## 24. TypeScript Rules

Prefer strongly typed data structures.

Avoid unnecessary:

```ts
any
```

If an `any` is unavoidable, understand and document why.

Do not suppress TypeScript errors with broad casts merely to make a build pass.

Prefer fixing the underlying type mismatch.

---

## 25. UI and Design Rules

The site should be:

- Clean.
- Elegant.
- Fast.
- Product-focused.
- Mobile-friendly.
- Trustworthy.

Do not over-design the storefront.

Avoid unnecessary:

- Animations.
- Carousels.
- Decorative effects.
- Popups.
- Marketing gimmicks.
- Artificial urgency.

The product information should remain the focus.

Use the supplied logo.

The approved interface includes a Black/White theme toggle.

---

## 26. Accessibility

Maintain basic accessible web behaviour:

- Buttons should have meaningful labels.
- Images should have useful alt text.
- Form controls should have labels.
- Keyboard navigation should remain possible.
- Focus states should not be removed without replacement.
- Colour should not be the only way to communicate state.
- Interactive elements should be large enough to use comfortably on mobile.

Do not sacrifice accessibility for visual effects.

---

## 27. SEO

Product pages should have product-specific:

- Title.
- Description.
- Open Graph metadata.
- Open Graph image where available.
- Canonical URL where appropriate.

Do not create duplicate or misleading metadata.

Do not invent product information for SEO purposes.

---

## 28. Performance

Prioritize:

- Optimized images.
- Efficient Supabase queries.
- Minimal unnecessary JavaScript.
- Appropriate server/client boundaries.
- Fast mobile loading.
- Avoiding unnecessary dependencies.

Do not optimize prematurely by making the code significantly harder to maintain.

---

## 29. Error Handling

Handle errors explicitly.

Important cases include:

- Supabase unavailable.
- Product not found.
- Empty catalogue.
- Empty search results.
- Empty filter results.
- Image failure.
- Authentication failure.
- Unauthorized admin access.
- Product mutation failure.

Never silently swallow important errors.

Do not show users raw stack traces or secret/database details.

---

## 30. Development Workflow

For every meaningful change:

### Step 1 — Understand

Read:

```text
prd.md
AGENTS.md
```

Inspect the relevant existing implementation.

### Step 2 — Plan

Identify:

- Requirement being implemented.
- Files likely to change.
- Existing functionality affected.
- Data/security implications.

### Step 3 — Implement

Make the smallest sensible change.

Avoid unrelated refactoring.

### Step 4 — Verify

At minimum, verify:

- TypeScript/build correctness where possible.
- Relevant UI behaviour.
- Relevant database behaviour.
- Existing functionality that could have been affected.

### Step 5 — Report

Tell the user:

- What changed.
- What was tested.
- What was not tested.
- Any remaining issue.
- Any action required from the user.

Never claim something was tested when it was not.

---

## 31. Debugging Rules

When something fails:

1. Read the actual error.
2. Identify the failing layer.
3. Reproduce if possible.
4. Change one logical thing at a time.
5. Re-run the relevant check.
6. Confirm whether the error changed.
7. Avoid unrelated changes.

Do not repeatedly make speculative changes.

### Build failures

If `npm run build` fails:

- Capture the actual error.
- Separate warnings from errors.
- Identify whether the failure is application code, dependency, configuration, environment, or infrastructure.
- Do not treat a warning as a build failure.
- Do not repeatedly modify unrelated CSS/configuration just because the same warning appears.

---

## 32. Deployment Rules

The production host is Netlify.

Before deployment:

- Ensure the production build is expected to work.
- Confirm required environment variables exist.
- Confirm no secret credentials are committed.
- Confirm routes are compatible with the deployment configuration.
- Confirm Supabase is configured for the production application.

After deployment, test:

```text
/
 /products/[slug]
 /admin/login
 /admin/dashboard
```

and the core:

```text
Catalogue → Cart → WhatsApp
```

flow.

Do not claim deployment succeeded without verifying the deployment result.

---

## 33. Git and Repository Hygiene

Do not commit:

- `.env`
- `.env.local`
- Supabase secret/service-role credentials.
- Passwords.
- Authentication tokens.
- Private keys.
- Temporary dumps.
- Large generated build directories unless explicitly required.

Keep environment-specific values outside source control.

Do not modify `.gitignore` to expose sensitive files.

---

## 34. Dependency Rules

Before adding a dependency, ask:

1. Is it necessary?
2. Can Next.js/browser APIs already do this?
3. Can the existing project dependencies do it?
4. Does it increase bundle size?
5. Does it introduce a paid service?
6. Does it create a security/privacy concern?
7. Does it complicate deployment?

Prefer the smallest solution.

Do not install packages merely to solve a problem that can be solved with existing APIs.

---

## 35. What Agents Must Not Do

Without explicit approval, an agent must not:

- Change the product scope.
- Add customer accounts.
- Add online payments.
- Add M-Pesa checkout.
- Add phone accessories.
- Add repairs/support.
- Add a second database.
- Replace Supabase.
- Replace Netlify.
- Replace the logo.
- Change the WhatsApp destination.
- Invent product data.
- Expose secret keys.
- Disable RLS.
- Delete production data.
- Introduce paid infrastructure.
- Rewrite the application wholesale.
- Remove existing working features to simplify implementation.

---

## 36. Handling Ambiguity

When requirements are unclear:

1. Check `prd.md`.
2. Check the existing implementation.
3. Prefer the smallest interpretation consistent with both.
4. If the ambiguity could materially affect data, security, money, or user experience, ask the user before making a consequential decision.
5. Do not invent business rules.

For low-risk implementation details, use sensible engineering judgment while preserving the product requirements.

---

## 37. Change Documentation

When an architectural or product-level decision changes:

- Update `prd.md` if the product requirement changed.
- Update `AGENTS.md` if the development rule changed.
- Keep the two documents consistent.

Do not use `AGENTS.md` to silently override `prd.md`.

---

## 38. Definition of Done

A change is not complete merely because code was written.

A change is complete when:

- The requested requirement is implemented.
- Existing relevant functionality still works.
- TypeScript/build checks pass where applicable.
- Relevant runtime behaviour has been tested.
- Security implications have been considered.
- No credentials have been exposed.
- Documentation is updated when necessary.
- Known limitations are reported honestly.

---

## 39. Final Principles

When choosing between a complicated solution and a simple solution that satisfies the requirements:

> **Choose the simplest reliable solution.**

When choosing between impressive marketing and accurate information:

> **Choose accuracy.**

When choosing between adding a feature and preserving the product's simplicity:

> **Preserve simplicity unless the requirement calls for the feature.**

When a bug appears:

> **Diagnose first. Change second.**

When uncertain about product facts:

> **Do not invent them.**

When working with customer or admin data:

> **Protect it by default.**
