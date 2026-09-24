# ARCHITECTURE.md

# Skyline Computer World — System Architecture

## 1. Purpose

This document describes how the Skyline Computer World website is structured technically and how its major parts communicate.

It complements:

- `prd.md` — product requirements, business rules, customer experience, and acceptance criteria.
- `AGENTS.md` — rules for AI coding agents and developers modifying the project.

This document describes the intended architecture for the current release. It should remain simple, reliable, inexpensive to operate, and easy to maintain.

---

## 2. System Overview

Skyline Computer World is a lightweight catalogue and WhatsApp-commerce website.

The current architecture uses:

- **Next.js** — web application and routing
- **TypeScript** — application code
- **Supabase PostgreSQL** — product catalogue and related data
- **Supabase Auth** — administrator authentication
- **Supabase Storage** — product images
- **Netlify** — hosting/deployment
- **WhatsApp** — customer order/inquiry channel

The website is not currently designed as a full marketplace or traditional online store with customer accounts and integrated online payments.

### High-level architecture

```text
                         ┌──────────────────────┐
                         │      Customer        │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │      Next.js         │
                         │  Public Web App      │
                         └───────┬───────┬──────┘
                                 │       │
                    Read product │       │ Create order message
                         data    │       │
                                 ▼       ▼
                    ┌──────────────┐   ┌──────────────┐
                    │   Supabase   │   │   WhatsApp   │
                    │  PostgreSQL  │   │   +254...    │
                    └──────┬───────┘   └──────┬───────┘
                           │                  │
                           │ images           │
                           ▼                  ▼
                    ┌──────────────┐   ┌────────────────┐
                    │   Supabase   │   │ Skyline staff  │
                    │   Storage    │   │ confirms order │
                    └──────────────┘   └────────────────┘


                         ┌──────────────────────┐
                         │       Admin          │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │ Next.js Admin Area   │
                         │ /admin/*             │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   Supabase Auth      │
                         │   + PostgreSQL       │
                         │   + Storage          │
                         └──────────────────────┘
```

---

## 3. Core Architectural Principle

The system should use the simplest architecture that reliably satisfies the requirements.

Do not introduce:

- a separate backend server without a demonstrated need
- a separate product API service
- a customer account system
- a payment gateway
- unnecessary state-management frameworks
- unnecessary microservices
- unnecessary third-party SaaS products
- duplicated product databases

The project should remain a small Next.js application backed by Supabase.

---

## 4. Application Layers

The application can be understood as four logical layers.

### 4.1 Presentation Layer

Responsible for:

- homepage
- catalogue
- category navigation
- search
- filters
- product cards
- product detail pages
- cart
- mobile navigation/filter UI
- admin interface

Primary location:

```text
app/
```

The presentation layer should not contain duplicated business data where that data belongs in Supabase.

---

### 4.2 Application / Business Logic

Responsible for:

- product filtering
- cart behaviour
- product configuration handling
- WhatsApp message construction
- availability rules
- navigation behaviour
- share links
- admin CRUD operations

Primary reusable logic may live in:

```text
lib/
```

Client-specific UI behaviour should remain close to the component that owns it unless it is genuinely reusable.

---

### 4.3 Data Layer

Supabase provides:

- PostgreSQL database
- authentication
- object storage

The database is the source of truth for the public product catalogue.

The application should retrieve products from Supabase rather than maintaining a second manually duplicated catalogue.

---

### 4.4 Hosting Layer

Netlify hosts the Next.js application.

The deployment architecture should remain compatible with the Next.js features actually used by the project.

Deployment configuration belongs in:

```text
netlify.toml
```

---

## 5. Customer Data Flow

### 5.1 Browsing

```text
Customer
   ↓
Next.js homepage/catalogue
   ↓
Supabase products
   ↓
Product cards
```

Customers do not need to sign in to browse products.

---

### 5.2 Product Details

```text
Customer selects product
   ↓
/products/[slug]
   ↓
Product record
   ↓
Product images + specifications + availability
```

Every public product should have a stable, shareable URL.

Example:

```text
/products/lenovo-x390
```

The exact slug is determined by the product record.

---

### 5.3 Search and Filtering

Search and category/filter state should determine which products are displayed.

Expected behaviour:

```text
Search input
   ↓
User presses Enter
   ↓
Catalogue/product section
   ↓
Search applied
```

Category links should similarly take the user to the catalogue with the relevant category filter applied.

`View All` clears catalogue filters.

---

## 6. Product Model

The product record is the central entity of the application.

A product should support, as applicable:

- id
- name
- slug
- description
- price
- category
- stock/availability
- images
- brand
- model
- specifications
- created_at
- updated_at

Category-specific fields may be represented inside a reusable specifications structure where appropriate.

### Important rule

Do not invent product specifications.

If the source information does not establish a specification, the UI should not present an invented value as fact.

---

## 7. Product Availability

The architecture recognizes three important states:

```text
In Stock
Available on Order
Out of Stock
```

### In Stock

- Product is displayed.
- Product can be added to cart.

### Available on Order

- Product is displayed.
- Product can be added to cart.
- Final availability is confirmed through WhatsApp.

### Out of Stock

- Product remains visible.
- Product should communicate that it is unavailable.
- It should not be treated as currently purchasable through the normal cart flow.

Stock is not intended to be a real-time inventory system.

WhatsApp confirmation is the final availability check.

---

## 8. Product Configurations

Some products have selectable configurations.

Examples may include:

- processor
- RAM
- storage
- condition
- screen/display configuration
- other product-specific options

A configuration selected by the customer must travel with the cart item.

The cart must not retain only the generic product name when a specific configuration has been selected.

Conceptually:

```text
Product
  +
Selected configuration
  +
Quantity
  +
Price at selection
  =
Cart item
```

This ensures that the WhatsApp order identifies what the customer actually selected.

---

## 9. Product Images

Product images are stored in Supabase Storage.

A product may have multiple images, with the intended range being:

```text
1–6 images per product
```

The public product page should present the available images without implying that unavailable views exist.

Images should be factual representations of the actual product whenever possible.

Placeholder images may be used temporarily for products that do not yet have real photographs, but they should eventually be replaced with actual product photographs.

---

## 10. Cart Architecture

The cart is a customer-side shopping mechanism.

Customers do not need an account to use it.

The cart must support:

- multiple products
- quantities
- configured products
- quantity changes
- removal
- subtotal calculation
- clearing the cart

Conceptually:

```text
Product
   ↓
Customer selects configuration
   ↓
Add to cart
   ↓
Cart item
   ↓
Quantity
   ↓
Subtotal
   ↓
WhatsApp order message
```

The cart is not an order database.

The current release does not create a server-side customer order record at checkout.

---

## 11. WhatsApp Order Flow

WhatsApp is the current order/inquiry channel.

Primary number:

```text
+254798321910
```

The website constructs a message containing:

- product number/identifier where applicable
- product name
- quantity
- selected configuration
- availability
- price
- total items
- retail subtotal

The message ends with:

```text
Please confirm availability, delivery options and final price.
```

The countrywide delivery sentence belongs on the website and should not be appended to the WhatsApp order message.

### Order flow

```text
Customer
   ↓
Cart
   ↓
Review selected products/configurations
   ↓
Generate WhatsApp message
   ↓
Open WhatsApp
   ↓
Skyline confirms availability
   ↓
Skyline confirms delivery options
   ↓
Skyline confirms final price
   ↓
Payment/delivery handled privately
```

---

## 12. No Customer Authentication

The public customer journey does not require:

- account creation
- email login
- password
- customer profile

Authentication is reserved for the administration side.

This reduces friction and avoids maintaining unnecessary customer identity data.

---

## 13. Admin Architecture

The admin area is a protected part of the same Next.js application.

Expected routes include:

```text
/admin/login
/admin/dashboard
```

The admin dashboard is responsible for product catalogue management.

Core operations:

- create product
- edit product
- delete product
- upload product images
- update price
- update availability
- update specifications

---

## 14. Admin Authentication

Supabase Auth handles administrator authentication.

The intended flow is:

```text
Admin
   ↓
/admin/login
   ↓
Supabase Auth
   ↓
Authenticated session
   ↓
Admin authorization check
   ↓
/admin/dashboard
```

An authenticated Supabase user is not automatically assumed to be an administrator.

Administrative authorization should use the project's admin authorization mechanism, including the `admin_users` table where implemented.

---

## 15. Database Security

Supabase Row Level Security (RLS) is part of the security model.

General principle:

```text
Public users
    ↓
Read permitted catalogue data

Administrators
    ↓
Authenticated + authorized
    ↓
Create / update / delete catalogue data
```

Policies must be tested whenever they are changed.

Never weaken RLS simply to make a feature work.

---

## 16. Supabase Storage Security

Product images are stored in Supabase Storage.

The application should permit:

- public viewing of images required by the catalogue
- authorized administrative uploads/changes

Storage policies should prevent unauthorized users from modifying product assets.

---

## 17. Environment Variables

Client-safe Supabase configuration uses environment variables such as:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

These may be exposed to the browser because they are intended for the public Supabase client.

The Supabase Secret/Service Role key must never be:

- committed to the repository
- placed in client-side code
- placed in `NEXT_PUBLIC_*`
- exposed through browser JavaScript
- pasted into public documentation

---

## 18. Public vs Admin Responsibilities

### Public application

Can:

- read catalogue information
- view product images
- search/filter products
- create local cart state
- generate WhatsApp messages
- share product URLs

Cannot:

- modify catalogue data
- upload images
- modify availability
- manage administrators

### Admin application

Can, when authorized:

- manage products
- manage product images
- update availability
- update specifications
- update prices

---

## 19. Routing Architecture

The application uses Next.js App Router conventions.

Conceptual structure:

```text
app/
├── layout.tsx
├── page.tsx
├── globals.css
│
├── products/
│   └── [slug]/
│       ├── page.tsx
│       └── ProductClient.tsx
│
└── admin/
    ├── login/
    │   └── page.tsx
    └── dashboard/
        └── page.tsx
```

The exact structure may evolve, but new routes should follow Next.js App Router conventions.

---

## 20. Repository Responsibilities

### `app/`

Routes, pages, layouts, and route-specific UI.

### `lib/`

Reusable application logic and Supabase client utilities.

### `public/`

Static assets that genuinely belong in the repository.

### Supabase

Persistent catalogue data, authentication, and product image storage.

### Root configuration

Includes files such as:

```text
package.json
netlify.toml
tsconfig.json
```

as applicable to the current implementation.

---

## 21. Store Information

The website's store/location information is:

```text
Skyline Computer World
Terry House
Mfangano Street
Shop G15
Ground Floor
Nairobi CBD, Kenya
```

Google Maps:

```text
https://maps.app.goo.gl/9YKbF3SwdGFrBY8S6?g_st=aw
```

The `Visit Our Store` interaction should take the user to the site's location/footer area and provide the Maps destination.

---

## 22. Delivery

The website communicates:

```text
Countrywide delivery available.
Delivery charges depend on destination.
```

Delivery is handled outside the website's current transaction system.

SpeedAF is the stated delivery service.

The site does not currently calculate delivery charges automatically.

---

## 23. Categories

The architecture supports the catalogue categories defined by the product requirements.

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

The current scope explicitly excludes:

- phone accessories
- repairs/support services

Do not add excluded categories without updating the product requirements first.

---

## 24. Sharing Architecture

Products have individual URLs so that a customer can share a specific product.

The application should:

1. Generate a stable product URL.
2. Use the browser's native share API where supported.
3. Provide a clipboard fallback where native sharing is unavailable.

Sharing should identify the actual product page rather than merely linking to the homepage.

---

## 25. Responsive Architecture

The application must work on:

- mobile
- tablet
- desktop

Desktop and mobile may use different presentation mechanisms while sharing the same underlying catalogue/filter logic.

### Filters

Desktop:

- persistent/visible filter layout as appropriate.

Mobile:

- drawer or bottom-sheet style filter interface.

When filters/search are active:

- a clear-filter control should be available without requiring excessive scrolling.

---

## 26. Design Architecture

The visual system is based on the Skyline Computer World brand.

Primary visual direction:

- red
- blue
- black
- one dominant colour at a time where appropriate

The interface should communicate:

- trust
- affordability
- straightforward product information
- after-sale presence

The UI should not make unsupported claims about product quality or condition.

The principle is:

> What people see is what they get.

---

## 27. SEO and Product URLs

Each product page should be independently addressable and suitable for sharing.

Where supported by the implementation, product pages should provide:

- product-specific title
- product-specific description
- relevant metadata
- Open Graph/share metadata

SEO content must be derived from actual product information.

Do not generate exaggerated or fabricated specifications for search-engine purposes.

---

## 28. Error Handling

The application should handle predictable failures clearly.

Examples:

- product cannot be loaded
- Supabase request fails
- image upload fails
- authentication fails
- product does not exist
- cart is empty
- WhatsApp cannot be opened through the preferred mechanism

Errors should provide useful next steps where possible.

Do not hide actual errors behind generic success messages.

---

## 29. Performance

The site is intended to be a fast catalogue.

Prefer:

- Next.js built-in optimizations
- appropriately sized images
- limited unnecessary JavaScript
- simple components
- minimal dependencies
- efficient Supabase queries

Do not add performance infrastructure before there is a demonstrated performance problem.

---

## 30. Deployment Architecture

The intended deployment path is:

```text
Developer changes
       ↓
Local verification
       ↓
Git/repository or deployment workflow
       ↓
Netlify build
       ↓
Production Next.js site
```

Netlify provides hosting and the production deployment environment.

Environment variables required by the application must be configured in the Netlify site environment.

A deployment is not considered complete merely because the build command starts.

The deployed site should be checked for:

- homepage
- catalogue
- product pages
- search/filtering
- cart
- WhatsApp flow
- admin login
- admin product CRUD
- image upload
- Supabase connectivity

---

## 31. Security Boundaries

The main security boundaries are:

```text
Browser
   │
   ├── Public catalogue access
   │
   └── Admin session
          │
          ▼
      Supabase Auth
          │
          ▼
    Admin authorization
          │
          ▼
      Database/Storage
```

The browser should never receive privileged Supabase credentials.

Customer-controlled values must not be trusted as authorization signals.

Admin authorization must be enforced server-side/database-side as appropriate, not merely by hiding UI controls.

---

## 32. Architectural Decisions

### Decision: Supabase instead of a custom backend

Reason:

- PostgreSQL is sufficient for the catalogue.
- Supabase provides authentication and storage.
- It reduces infrastructure and maintenance requirements.

### Decision: WhatsApp instead of integrated checkout

Reason:

- Fits the business's current sales workflow.
- Avoids unnecessary payment and order-management infrastructure.
- Allows final availability, delivery, and price confirmation.

### Decision: No customer accounts

Reason:

- Browsing and ordering can happen without account friction.
- Customer identity management is unnecessary for the current business flow.

### Decision: Manual stock status

Reason:

- Current business process does not require real-time inventory synchronization.
- WhatsApp remains the final availability confirmation.

### Decision: Single Next.js application

Reason:

- Small project scope.
- Lower maintenance overhead.
- Easier deployment.
- No demonstrated need for multiple services.

---

## 33. Future Architecture

Potential future additions should be introduced only when the business actually needs them.

Possible future capabilities include:

- online M-Pesa checkout
- customer accounts
- server-side orders
- inventory synchronization
- order history
- delivery tracking
- analytics
- automated notifications
- richer category-specific product schemas

These are future scope, not requirements for the current release.

When adding one, update:

1. `prd.md`
2. `ARCHITECTURE.md`
3. `AGENTS.md`

where the change affects requirements, system design, or development rules.

---

## 34. Architectural Change Rules

Before making a significant architectural change:

1. Identify the problem being solved.
2. Check whether the current architecture already supports it.
3. Prefer the smallest change that solves the problem.
4. Consider security and data implications.
5. Update relevant documentation.
6. Test the affected customer and admin flows.

Do not replace working infrastructure merely because another technology is newer or more fashionable.

---

## 35. Definition of Architectural Consistency

The implementation is architecturally consistent when:

- Supabase remains the catalogue source of truth.
- Public users can browse without accounts.
- Admin functions are protected.
- Product configurations survive into the cart and WhatsApp message.
- Product images are stored appropriately.
- Product pages have stable URLs.
- WhatsApp remains the current order channel.
- No privileged Supabase credentials reach the browser.
- RLS and authorization protect administrative operations.
- Netlify can deploy the Next.js application.
- The system remains simple enough for the project to be maintained without unnecessary infrastructure.

---

## 36. Final Principle

The Skyline Computer World architecture should serve the business rather than become the business.

Prefer:

**simple → reliable → understandable → secure → maintainable**

over:

**complex → impressive → difficult to maintain**

When a new feature is proposed, first ask:

> What business problem does this solve, and can the existing architecture solve it without adding another system?

If the existing architecture is sufficient, keep it.
