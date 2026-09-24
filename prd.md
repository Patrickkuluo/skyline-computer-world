# Product Requirements Document --- Skyline Computer World

**Version:** 1.0\
**Status:** Green-lit\
**Market:** Kenya\
**Language:** English\
**Currency:** KSh

## 1. Product Summary

Skyline Computer World is a lightweight commercial storefront for a
Nairobi computer and electronics business. It is intentionally not a
full marketplace such as Jumia or Kilimall.

The customer journey is:

**Browse → Search/Filter → Product → Configure → Cart → WhatsApp**

Customers do not need an account. Payment, delivery arrangements,
availability confirmation, negotiation, and final pricing happen through
WhatsApp.

The site must be fast, mobile-friendly, factual, and trust-oriented:
**what people see is what they get.**

## 2. Business Information

-   **Brand:** Skyline Computer World
-   **Physical store:** Terry House, Mfangano Street, Shop G15, Nairobi
    CBD
-   **Primary WhatsApp:** +254798321910
-   **Google Maps:** https://maps.app.goo.gl/9YKbF3SwdGFrBY8S6?g_st=aw
-   **Delivery:** Countrywide via SpeedAF; delivery charges depend on
    destination
-   **Hosting:** Netlify
-   **Primary language:** English
-   **Currency:** KSh

The site should provide WhatsApp contact only, not a phone-call button.

## 3. Goals

-   Provide a professional online catalogue.
-   Allow the admin to maintain products without editing source code.
-   Let customers search, filter, browse, and share products.
-   Support multiple products and quantities in a cart.
-   Convert the cart into a structured WhatsApp order.
-   Avoid customer account creation.
-   Work well on mobile and desktop.
-   Build trust through accurate information, visible pricing,
    condition, availability, and physical-store details.
-   Keep the system free/low-cost and technically lightweight.
-   Keep AEO and GEO in mind. 

## 4. Non-Goals

The current release does **not** include:

-   Full marketplace functionality.
-   Customer accounts or customer login.
-   Online payment gateway or M-Pesa checkout.
-   Automated delivery-price calculation.
-   Automated stock synchronisation.
-   Phone-call CTA.
-   Price sorting.
-   Newest-product sorting.
-   Featured/deals section.
-   Phone accessories category.
-   Repairs/support-services category.

## 5. Catalogue Categories

### Computers

-   Laptops
-   Desktop Computers

### Tablets

-   Tablets
-   Phones


### Computer Accessories

-   Keyboards & Mice
-   Headphones & Audio
-   Speakers
-   Adapters & Converters
-   Splitters
-   Networking

### Electronics

-   Power & Electronic Accessories

### Security

-   CCTV Cameras

The category system should remain extensible.

## 6. Product Model

Minimum product fields:

-   `id`
-   `name`
-   `slug`
-   `description`
-   `price`
-   `category`
-   `stock`
-   `availability`
-   `images`
-   `brand`
-   `specifications`
-   `created_at`
-   `updated_at`

Availability states:

-   **In Stock**
-   **Available on Order**
-   **Out of Stock**

In Stock and Available on Order products can be added to the cart.
Out-of-stock products remain visible but are not purchasable.

The website does not claim real-time physical inventory; WhatsApp is the
final confirmation point.

## 7. Product Data Rules

Product information must be factual.

Do: - Show actual retail prices. - Show known specifications. - Identify
condition and availability. - Use temporary practical names when a
product has not yet been formally labelled. - Use unspecified/contact-us
values where a specification is genuinely unknown.

Do not: - Invent specifications or model numbers. - Claim unverified
features. - Exaggerate product quality. - Hide relevant condition
information.

Temporary placeholders may be used for previews, but real admin-created
products must replace them. If the Supabase catalogue is empty, the
storefront should show an empty state rather than silently displaying
old placeholder products.

## 8. Product Configurations

Products may have selectable configurations, such as processor, RAM,
storage, screen, or condition.

Selected configurations must be stored with the cart item and included
in the WhatsApp message. A configured product must not be reduced to
only its base product name.

## 9. Product Images

Each product supports **1--6 images**.

Admin requirements: - Upload images. - Replace/update images. - Remove
images. - Associate images with products.

Supabase Storage holds product images. Product deletion should clean up
associated image files where applicable.

## 10. Laptop Fields

Laptop products should support:

-   Name
-   Brand
-   Model
-   Price
-   Condition
-   Processor
-   RAM
-   Storage
-   Display
-   Availability
-   Images
-   Description

Additional fields may include:

-   Screen Size
-   Refresh Rate
-   Screen Ratio
-   HDD Capacity
-   Processor Frequency
-   GPU Brand
-   Card Description
-   Ports
-   Battery Capacity
-   WLAN
-   Warranty
-   Screen Material
-   Resolution
-   Drive Type
-   Processor Core
-   CPU Model
-   OS
-   CPU Speed
-   Human Interface Input
-   Thickness

Only verified values should be populated.

## 11. Search and Filtering

Search requirements: - Search button works. - Pressing Enter submits the
search. - Submission takes the user to the catalogue/product section. -
Search is applied to catalogue results.

Category requirements: - Shop by Category links directly to the selected
category. - View All clears category restrictions.

Filters should support: - Category - Brand - Relevant product-specific
specifications

A floating **Clear Filter** control should appear when filtering/search
state is active.

Desktop filters remain visible/usable. Mobile filters use a retrievable
drawer/bottom-sheet interaction so users do not have to scroll through a
long filter area.

## 12. Catalogue Cards

Product cards should show, as appropriate:

-   Image
-   Product name
-   Brand
-   Price
-   Availability
-   Key specification highlights
-   Add-to-cart action

Real products must use the same card/catalogue structure as the former
placeholders.

## 13. Product Detail Pages

Every product has a dedicated URL:

`/products/[slug]`

The page includes: - Home → Category → Product breadcrumbs. - Product
images. - Price. - Availability. - Description. - Specifications. -
Configuration selectors where applicable. - Add to cart. - Share action.

Opening a product should provide a useful larger gallery/detail
presentation for multiple images.

Product sharing should use the native share API where available, with
clipboard fallback.

## 14. Cart

The cart is an order-building mechanism, not a checkout system.

Required: - Multiple products. - Quantity controls. - Remove item. -
Preserve selected configurations. - Total item count. - Retail
subtotal. - WhatsApp order generation.

## 15. WhatsApp Order

Primary destination: **+254798321910**

Message format:

``` text
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

For multiple products, every item gets its own quantity,
specifications/configuration, availability, and price.

Do **not** put the countrywide-delivery sentence in the WhatsApp
message. That information belongs on the website.

WhatsApp is where final availability, delivery, delivery charges,
payment, location, negotiation, and final price are confirmed.

## 16. Store Location

**Visit Our Store** should take the user to the footer/location section.

Display:

**Terry House, Mfangano Street, Shop G15, Nairobi CBD**

Provide the supplied Google Maps link.

## 17. Trust and UX

Trust should come from: - Accurate product information. - Clear
prices. - Visible condition. - Visible availability. - Real photos when
available. - Physical store information. - Google Maps location. - Clear
delivery information. - Direct WhatsApp contact. - Simple ordering.

Avoid unsupported guarantees, artificial urgency, and exaggerated
marketing language.

## 18. Responsive Design

The site must be: - Mobile-friendly. - Desktop-friendly. - Fast and
lightweight. - Touch-friendly. - Usable without horizontal scrolling.

Mobile browsing, filtering, and WhatsApp ordering are priority use
cases.

## 19. Theme

The supplied Skyline Computer World logo is the official visual
identity.


## 20. Technical Architecture

### Frontend

**Next.js**

Contains: - Public storefront. - Catalogue. - Product pages. - Cart. -
WhatsApp ordering. - Admin login. - Admin dashboard.

### Database

**Supabase PostgreSQL**

Supabase is the source of truth for the live catalogue.

### Authentication

**Supabase Auth**

Only admins authenticate. Customers do not need accounts.

### Admin authorization

An `admin_users` table identifies authenticated users authorized to
manage products.

### Storage

**Supabase Storage** stores product images.

### Security

Use Supabase Row Level Security (RLS): - Public users can read
appropriate catalogue data. - Authorized admins can create, update, and
delete products and manage product images. - Unauthorized users cannot
perform administrative writes.

### Hosting

**Netlify**

Required frontend environment variables:

``` text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

The Supabase Secret/Service Role key must never be exposed to the
browser.

## 21. Admin

Routes:

``` text
/admin/login
/admin/dashboard
```

Admin must be able to: - Log in. - View products. - Add products. - Edit
products. - Delete products. - Upload up to 6 images. - Set price. - Set
category/brand. - Set availability. - Enter
descriptions/specifications. - Publish products to the storefront.

Expected lifecycle:

``` text
Admin → Supabase products table → Public storefront
```

Admin changes must be reflected in the public catalogue.

## 22. Source of Truth

Supabase is authoritative for the live product catalogue.

-   If products exist in Supabase, the storefront displays them.
-   If the database is empty, the storefront displays an appropriate
    empty state.
-   Admin-created products appear in the same catalogue/card structure
    as all other products.
-   The public site must not maintain a conflicting hard-coded
    catalogue.

## 23. SEO and Sharing Metadata

Dedicated product pages should support, where practical: -
Product-specific title. - Meta description. - Open Graph title. - Open
Graph description. - Open Graph image. - Canonical URL - Keep AEO and GEO in mind too. 

## 24. Error and Empty States

Handle: - No products. - No search results. - No filter results. -
Supabase/database errors. - Product not found. - Image loading
failure. - Invalid/deleted product URLs.

Errors should produce clear user-facing states rather than broken pages.

## 25. Performance

Prioritize: - Fast initial loading. - Optimized images. - Minimal
unnecessary client-side JavaScript. - Efficient Supabase reads. - Good
performance on mobile networks. - Minimal third-party dependencies.

## 26. Acceptance Criteria

### Public catalogue

-   [ ] Website loads.
-   [ ] Logo displays.
-   [ ] Correct categories display.
-   [ ] Products load from Supabase.
-   [ ] Empty Supabase catalogue produces an empty state.
-   [ ] Out-of-stock products remain visible.
-   [ ] Available-on-order products can be added to cart.

### Search/filter

-   [ ] Search button works.
-   [ ] Enter submits search.
-   [ ] Search moves to/applies to catalogue.
-   [ ] Category links filter correctly.
-   [ ] View All clears category filtering.
-   [ ] Brand filter works.
-   [ ] Relevant specification filters work.
-   [ ] Floating clear-filter control works.
-   [ ] Mobile filters are retrievable.
-   [ ] Desktop filters remain usable.

### Product pages

-   [ ] Unique product URL.
-   [ ] Breadcrumbs.
-   [ ] Product images.
-   [ ] Multiple-image gallery.
-   [ ] Specifications.
-   [ ] Configurations where applicable.
-   [ ] Share action.
-   [ ] Clipboard fallback.

### Cart

-   [ ] Multiple products.
-   [ ] Quantity controls.
-   [ ] Remove item.
-   [ ] Configurations preserved.
-   [ ] Retail subtotal.
-   [ ] Total item count.

### WhatsApp

-   [ ] Correct primary number.
-   [ ] Correct product names.
-   [ ] Correct quantities.
-   [ ] Configurations included.
-   [ ] Prices included.
-   [ ] Retail subtotal included.
-   [ ] Final confirmation wording included.
-   [ ] Delivery sentence excluded from message.

### Admin

-   [ ] `/admin/login` works.
-   [ ] Valid admin can authenticate.
-   [ ] Unauthorized users cannot manage products.
-   [ ] Add works.
-   [ ] Edit works.
-   [ ] Delete works.
-   [ ] Image upload works.
-   [ ] Availability works.
-   [ ] Specifications work.
-   [ ] Public catalogue reflects admin changes.

### Supabase

-   [ ] Products persist in Supabase.
-   [ ] Images persist in Supabase Storage.
-   [ ] RLS protects admin writes.
-   [ ] Admin authorization is enforced.
-   [ ] Product deletion handles associated images appropriately.

### Store

-   [ ] Visit Our Store reaches location/footer.
-   [ ] Terry House / Mfangano Street / Shop G15 is shown.
-   [ ] Google Maps link works.
-   [ ] Countrywide delivery information is shown.
-   [ ] SpeedAF is identified.

## 27. Future Scope

The architecture should leave room for: - More category-specific product
schemas. - Inventory management. - Order records. - Customer accounts. -
Online M-Pesa payment. - Automated order notifications. - Delivery
tracking. - Analytics. - Product reviews. - Promotions. - Custom
domain. - Additional locations.

These are not part of the current release.

## 28. Product Principles

1.  **Simple over complex.**
2.  **WhatsApp over unnecessary checkout infrastructure.**
3.  **Real product data over placeholders.**
4.  **Facts over hype.**
5.  **Mobile usability is essential.**
6.  **Supabase is the catalogue source of truth.**
7.  **Customers do not need an account to browse or order through
    WhatsApp.**
8.  **The admin maintains the catalogue without editing code.**
9.  **The physical store and direct contact information stay easy to
    find.**
10. **Transparency builds trust.**

## 29. Release Definition

The release is functionally ready when both flows work reliably:

**Customer:**\
Browse → Search/Filter → Product → Configure → Cart → WhatsApp

**Admin:**\
Login → Add/Edit/Delete → Upload Image → Publish → Public Catalogue
