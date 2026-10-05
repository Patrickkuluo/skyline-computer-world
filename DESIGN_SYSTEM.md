# Skyline Computer World — Design System
*Version 1.0 · October 2026*

---

## Table of Contents
1. [Brand Identity](#1-brand-identity)
2. [Color System](#2-color-system)
3. [Typography](#3-typography)
4. [Spacing System](#4-spacing-system)
5. [Iconography](#5-iconography)
6. [Component Library](#6-component-library)
7. [Motion & Animation](#7-motion--animation)
8. [Shadows & Elevation](#8-shadows--elevation)
9. [Accessibility](#9-accessibility)
10. [Responsive Breakpoints](#10-responsive-breakpoints)
11. [Patterns & Conventions](#11-patterns--conventions)
12. [CSS Custom Properties Reference](#12-css-custom-properties-reference)

---

## 1. Brand Identity

### 1.1 Mission Statement
> *Tech you can trust. Without the guesswork.*

### 1.2 Brand Pillars

| Pillar | Description |
|---|---|
| **Transparency** | Real prices, real specs, no hidden surprises |
| **Trust** | Verified products, physical store presence |
| **Accessibility** | WhatsApp-first, Nairobi-rooted service |
| **Clarity** | Clear condition labelling, no jargon |

### 1.3 Taglines

| Context | Copy |
|---|---|
| Hero / Primary | Tech you can trust. Without the guesswork. |
| Secondary / Wordmark | Good tech. Clear prices. No guesswork. |
| Social Proof | Real products. Real prices. Real people. |

### 1.4 Logo Construction

- **Mark:** Mountain/skyline SVG icon in `--color-primary` red
- **Wordmark — Line 1:** "SKYLINE" — weight 800, uppercase, white, tracked wide
- **Wordmark — Line 2:** "COMPUTER WORLD" — weight 400–500, uppercase, white, smaller (~60% of line 1 size)
- **Clear zone:** Minimum padding equal to the icon height on all sides
- **Minimum width:** Never render below 140px wide; use mark-only below 32px
- **Do not:** Recolour the mark, place on a light background without inversion, or alter the wordmark layout

---

## 2. Color System

### 2.1 Core Palette

| Token | Hex | RGB | Usage |
|---|---|---|---|
| `--color-primary` | `#E8001C` | 232, 0, 28 | Brand red — logo, primary CTAs, prices, active indicators |
| `--color-bg-base` | `#0B0B0B` | 11, 11, 11 | Page background |
| `--color-bg-surface` | `#161616` | 22, 22, 22 | Cards, panels, dropdowns |
| `--color-bg-elevated` | `#1F1F1F` | 31, 31, 31 | Sidebar, search inputs, hover states |
| `--color-bg-overlay` | `#2A2A2A` | 42, 42, 42 | Borders, dividers, unselected filter pill bg |
| `--color-text-primary` | `#FFFFFF` | 255, 255, 255 | Headings, primary body copy |
| `--color-text-secondary` | `#9CA3AF` | 156, 163, 175 | Subtitles, specs, meta information |
| `--color-text-muted` | `#6B7280` | 107, 114, 128 | Placeholders, disabled states |
| `--color-border` | `#252525` | 37, 37, 37 | Subtle card borders, section dividers |
| `--color-border-strong` | `#3A3A3A` | 58, 58, 58 | Active filter outlines, focused inputs |

### 2.2 Semantic / Functional Colors

| Token | Hex | Usage |
|---|---|---|
| `--color-success` | `#16C064` | In Stock badge, checkmarks, positive states |
| `--color-warning` | `#F97316` | Refurbished badge |
| `--color-info` | `#3B82F6` | New product badge |
| `--color-error` | `#EF4444` | Form errors, out-of-stock states |
| `--color-rating` | `#F59E0B` | Star ratings |

### 2.3 Brand Red Scale

| Token | Hex | Usage |
|---|---|---|
| `--red-50` | `#FFF1F1` | Light tinted backgrounds (rare) |
| `--red-100` | `#FFCCCC` | Hover tints on light surfaces |
| `--red-500` | `#E8001C` | Primary — default brand red |
| `--red-600` | `#C8001A` | Button hover / pressed state |
| `--red-700` | `#A80016` | Active / focused state |
| `--red-900` | `#640010` | Deep accent on dark overlays |

### 2.4 Neutral Scale

| Token | Hex | Notes |
|---|---|---|
| `--neutral-950` | `#0B0B0B` | Page base |
| `--neutral-900` | `#111111` | Near-black |
| `--neutral-800` | `#1A1A1A` | Surface level |
| `--neutral-700` | `#252525` | Border / divider |
| `--neutral-600` | `#3A3A3A` | Strong border |
| `--neutral-500` | `#6B7280` | Muted text |
| `--neutral-400` | `#9CA3AF` | Secondary text |
| `--neutral-300` | `#D1D5DB` | Disabled text |
| `--neutral-100` | `#F3F4F6` | Light surface (rarely used — light mode only) |
| `--neutral-50` | `#F9FAFB` | Off-white |

### 2.5 Color Usage Rules

- **Primary red** is used exclusively for: primary CTA buttons, the logo mark, active nav underlines, price text, selected filter pills, hero accent word
- **Never** use primary red for body text blocks — only for single accent words or numbers (e.g., `"trust."`, prices)
- **White text on red** must always pass minimum **4.5:1** contrast (WCAG AA)
- **Background z-axis:** base → surface → elevated — never invert this layering order
- **Green** (`--color-success`) is strictly reserved for stock status and positive confirmation messages
- **Brand logos (HP, Dell, etc.):** render in grayscale by default; reveal full color on hover

---

## 3. Typography

### 3.1 Font Family

```
Primary    : "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
Monospace  : "JetBrains Mono", "Fira Code", monospace  — specs & model numbers only
```

> Fallback strategy: Inter → System UI → Generic sans-serif. Load weights 400, 500, 600, 700, 800 via self-hosted or Google Fonts.

### 3.2 Type Scale

| Token | Size | Line Height | Weight | Letter Spacing | Usage |
|---|---|---|---|---|---|
| `--text-display-xl` | 56px / 3.5rem | 1.10 | 700 | −0.03em | Hero headline desktop |
| `--text-display-lg` | 40px / 2.5rem | 1.15 | 700 | −0.02em | Hero headline tablet/mobile |
| `--text-display-md` | 32px / 2rem | 1.20 | 700 | −0.02em | Page section titles |
| `--text-heading-xl` | 24px / 1.5rem | 1.30 | 700 | −0.01em | Card section headings (e.g., "Latest Arrivals") |
| `--text-heading-lg` | 20px / 1.25rem | 1.35 | 600 | 0 | Product name on PDP |
| `--text-heading-md` | 18px / 1.125rem | 1.40 | 700 | 0 | Product card price |
| `--text-heading-sm` | 16px / 1rem | 1.40 | 600 | 0 | Filter category labels, card product name |
| `--text-body-lg` | 16px / 1rem | 1.60 | 400 | 0 | Hero sub-copy, descriptions |
| `--text-body-md` | 14px / 0.875rem | 1.50 | 400 | 0 | Product specs, meta, body |
| `--text-body-sm` | 12px / 0.75rem | 1.50 | 400 | 0 | Badges, captions, sub-labels |
| `--text-label-md` | 14px / 0.875rem | 1.00 | 500 | 0 | Button labels, nav items |
| `--text-label-sm` | 12px / 0.75rem | 1.00 | 600 | 0.01em | Filter pills, chip labels, trust badge titles |

### 3.3 Typography Rules

**Headline accent split:**
The hero headline uses a two-tone split — primary phrase in white, key word in `--color-primary`.
```
"Tech you can <white>trust.</white>" → "trust." renders in red
```

**Price text:**
- Always `--color-primary` (red), weight 700
- Format: `KSh 43,000` — never use `KES`, `Kes`, or no space after `KSh`

**Spec text:**
- Weight 400, `--text-body-sm`, `--color-text-secondary`
- One line max — truncate with ellipsis at overflow

**Brand names on cards:**
- Weight 500, `--text-body-sm`, `--color-text-secondary`
- Always above the product name

**Section headings (e.g., "Latest Arrivals"):**
- Paired with a subtitle in `--color-text-secondary`
- Frequently accompanied by a right-aligned red "View all →" link in `--color-primary`

---

## 4. Spacing System

### 4.1 Base Unit
**Base: 4px.** All spacing values are multiples of 4.

| Token | Value | Common Use |
|---|---|---|
| `--space-1` | 4px | Minimal gaps, icon-text pairs |
| `--space-2` | 8px | Inline element gaps, tag spacing |
| `--space-3` | 12px | Small component padding |
| `--space-4` | 16px | Standard padding, list item gaps |
| `--space-5` | 20px | Card inner padding |
| `--space-6` | 24px | Section inner padding, nav height offset |
| `--space-8` | 32px | Component vertical rhythm |
| `--space-10` | 40px | Inter-section spacing |
| `--space-12` | 48px | Large component padding |
| `--space-16` | 64px | Hero padding, page sections |
| `--space-20` | 80px | Major section breaks |
| `--space-24` | 96px | Top-level layout spacing |

### 4.2 Layout Grid

**Desktop (1280px+)**
- Columns: 12
- Gutter: 24px
- Margin: 32px
- Max content width: 1440px (centered)

**Tablet (768px–1279px)**
- Columns: 8
- Gutter: 16px
- Margin: 24px

**Mobile (< 768px)**
- Columns: 4
- Gutter: 12px
- Margin: 16px

### 4.3 Border Radius

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | 4px | Badges, small chips, status pills |
| `--radius-md` | 8px | Buttons, filter pills, input fields |
| `--radius-lg` | 12px | Product cards, panels, dropdowns |
| `--radius-xl` | 16px | Image containers, hero blocks, showroom card |
| `--radius-full` | 9999px | Pill buttons (hero CTAs), search bar, cart badge |

---

## 5. Iconography

### 5.1 Icon Library
- **Primary:** Lucide Icons (open-source, consistent 1.5px stroke)
- **Stroke width:** 1.5px default, 2px for emphasis/large contexts
- **Sizes:** 16px (inline/small), 20px (standard), 24px (primary/nav), 32px (feature callouts)

### 5.2 Category Navigation Icons

| Category | Icon (Lucide) | Subtext |
|---|---|---|
| Computers | `monitor` or `laptop` | Laptops · Desktops |
| Phones & Tablets | `smartphone` | Phones · Tablets |
| Accessories | `headphones` | Keyboards · Audio · Networking |
| Electronics | `zap` | Power · Cables · Adapters |
| Security | `shield` | CCTV Cameras |

### 5.3 Trust Badge Icons

| Trust Signal | Icon | Tint |
|---|---|---|
| Verified Products | `shield-check` | `--color-primary` |
| Physical Store | `map-pin` | `--color-primary` |
| WhatsApp Support | `message-circle` | `--color-primary` |
| Countrywide Delivery | `truck` | `--color-primary` |
| 6-Month Warranty | `award` | `--color-primary` |

### 5.4 UI Action Icons

| Action | Icon | Context |
|---|---|---|
| Search | `search` | Header search bar button |
| Cart | `shopping-cart` | Header cart — with badge |
| Wishlist | `heart` | Product card top-right |
| Account | `user` | Header right cluster |
| Location | `map-pin` | Header store selector |
| Add to Cart | `shopping-cart` | CTA button (left-leading) |
| WhatsApp | Custom SVG / brand icon | All WhatsApp CTAs |
| Arrow → | `chevron-right` or `arrow-right` | "View all" links, category rows |
| Filter | `sliders-horizontal` | "Apply filters" button |
| Reset | `rotate-ccw` | "Reset" filter button |

### 5.5 Icon Rules

- Icons are **never used alone** without a visible label in primary navigation
- Trust icons use a red-tinted fill variant to match brand color
- Wishlist heart: outline stroke default → filled red on hover/active
- Cart icon always carries a red count badge on top-right
- WhatsApp icon always uses the official WhatsApp green (`#25D366`) — never recolored

---

## 6. Component Library

### 6.1 Buttons

#### Primary Button (Red Fill)
```
Background    : --color-primary (#E8001C)
Text          : #FFFFFF, --text-label-md, weight 600
Border        : none
Border-radius : --radius-full (hero CTAs) / --radius-md (standard)
Padding       : 12px 24px
Icon          : 20px, left-leading, gap 8px
Hover         : --red-600, transform: scale(1.02)
Active        : --red-700, transform: scale(0.97)
Disabled      : opacity 0.4, cursor not-allowed
Transition    : all 200ms --ease-default
```

#### Secondary / Ghost Button
```
Background    : transparent
Text          : #FFFFFF, --text-label-md, weight 500
Border        : 1.5px solid --color-border-strong
Border-radius : --radius-full / --radius-md
Padding       : 12px 24px
Hover         : background --color-bg-elevated, border-color #FFFFFF
```

#### WhatsApp Button
```
Background    : transparent
Text          : #FFFFFF, --text-label-md, weight 500
Border        : 1.5px solid --color-border-strong
Icon          : WhatsApp SVG in #25D366 (green), left-leading
Border-radius : --radius-full
Padding       : 12px 20px
Hover         : border-color #FFFFFF, background --color-bg-elevated
```

#### Add to Cart Button
```
Width         : 100% (full card width)
Background    : --color-primary
Text          : #FFFFFF, --text-label-md, weight 600
Border-radius : --radius-md
Padding       : 12px 0
Icon          : shopping-cart 20px, left-leading
Hover         : --red-600
```

#### Filter Pill
```
Background    : --color-bg-overlay (unselected) / --color-primary (selected)
Text          : --text-label-sm, weight 500 — white both states
Border        : 1.5px solid --color-border (unselected) / transparent (selected)
Border-radius : --radius-md
Padding       : 6px 12px
Transition    : background 150ms ease
```

#### Icon Button (Wishlist, Cart, Account)
```
Background    : transparent / --color-bg-elevated on hover
Border-radius : --radius-full
Padding       : 8px
Icon          : 20–24px
Transition    : background 150ms ease
```

---

### 6.2 Navigation / Header

**Desktop Structure**
```
Height        : 64px
Background    : --color-bg-base
Border-bottom : 1px solid --color-border
Sticky        : top: 0, z-index: 1000
Layout        : [Logo] ——— [Nav Links] ——— [Search] [Location] [Account] [Cart]
```

**Logo**
- Left-aligned, min-width 140px
- Mark + wordmark in line

**Navigation Links**
```
Font          : --text-label-md, weight 500
Color         : --color-text-secondary (default)
Hover         : --color-text-primary
Active        : --color-text-primary + 2px --color-primary underline (bottom)
Dropdowns     : Chevron icon, right of label
Gap between items : --space-6
```

**Search Bar**
```
Background    : --color-bg-elevated
Border        : 1px solid --color-border
Border-radius : --radius-full
Height        : 40px
Min-width     : 280px, flex-grow: 1, max-width 480px
Placeholder   : "Search for laptops, phones, accessories..."
Submit icon button : --color-primary bg, white search icon, right-attached, radius right side pill
Focus         : border-color --color-border-strong
```

**Cart Badge**
```
Background    : --color-primary
Color         : #FFFFFF
Font          : 10px, weight 700
Shape         : Circle, 18px diameter
Position      : absolute, top-right of cart icon, offset -4px / -4px
```

**Location Selector**
```
Icon          : map-pin 16px, --color-primary
Text          : "Nairobi CBD", --text-label-sm
Dropdown      : Chevron icon
```

---

### 6.3 Product Card

```
Background    : --color-bg-surface
Border        : 1px solid --color-border
Border-radius : --radius-lg
Overflow      : hidden
Transition    : border-color 200ms ease, box-shadow 200ms ease
Hover         : border-color --color-border-strong, box-shadow --shadow-md
```

**Card Anatomy (top → bottom)**

**1. Image Container**
```
Height        : 200px
Background    : --color-bg-elevated
Position      : relative
```

- **Stock Badge** (absolute, top: 8px, left: 8px)

| Variant | Background | Text |
|---|---|---|
| IN STOCK | `#16C064` | White |
| REFURBISHED | `#F97316` | White |
| NEW | `#3B82F6` | White |

```
Font          : --text-body-sm, weight 700, uppercase, tracking 0.05em
Padding       : 4px 8px
Border-radius : --radius-sm
```

- **Wishlist Button** (absolute, top: 8px, right: 8px)
```
Icon-button style (see 6.1)
Heart icon: outline default → filled --color-primary on active
```

**2. Content Area**
```
Padding       : 12px 16px 16px
```

| Element | Style |
|---|---|
| Brand name | --text-body-sm, --color-text-secondary, weight 500 |
| Product name | --text-heading-sm, white, weight 600, 2-line max clamp |
| Specs | --text-body-sm, --color-text-secondary, single line truncated |
| Price | --text-heading-md, --color-primary, weight 700 |
| Condition row | 8px green dot + condition text, --text-body-sm, --color-success |

**3. CTA Area**
```
Padding       : 0 12px 12px
```
- Full-width "Add to cart" Primary Button (see 6.1)

---

### 6.4 Filter Sidebar

```
Width         : 220px (desktop)
Background    : --color-bg-surface
Border-right  : 1px solid --color-border
Padding       : --space-6
Overflow-y    : auto
```

**Filter Section Block**
```
Section label : --text-heading-sm, weight 600, white
Label margin-bottom : --space-3
Section gap   : --space-6
Collapse icon : chevron-up/-down, 16px, --color-text-secondary
```

**Checkbox Row**
```
Checkbox      : Custom — 16px sq., --radius-sm, unchecked: --color-bg-overlay border
               Checked: --color-primary fill, white checkmark
Label         : --text-body-md, --color-text-secondary
Active label  : --color-text-primary
Tap target    : full row (label included)
```

**Pill Group** (Processor, RAM, Storage, Generation)
```
Display       : flex, flex-wrap: wrap, gap: --space-2
```
See Filter Pill in 6.1.

**Buttons Row**
```
Apply Filters : Full-width Primary Button, sliders icon
Reset         : Full-width Ghost Button, rotate-ccw icon
Gap           : --space-2
Margin-top    : --space-4
```

**Mobile Behavior**
- Filter becomes a bottom drawer, triggered by "Filters" chip in catalog header
- Overlay: `rgba(0,0,0,0.7)` backdrop, drawer slides up from bottom
- Close button: X icon, top-right of drawer

---

### 6.5 Badges & Status Tags

| Badge | Background | Text Color | Font | Border-radius |
|---|---|---|---|---|
| IN STOCK | `#16C064` | White | --text-body-sm 700 uppercase | --radius-sm |
| REFURBISHED | `#F97316` | White | --text-body-sm 700 uppercase | --radius-sm |
| NEW | `#3B82F6` | White | --text-body-sm 700 uppercase | --radius-sm |
| Condition dot label | transparent | `--color-success` | --text-body-sm 400 | N/A |

**Condition Dot**
```
Size          : 8px circle
Color         : --color-success (#16C064)
Display       : inline-flex, gap --space-1 with label text
```

---

### 6.6 Hero Section

```
Min-height    : 480px desktop / 360px tablet / auto mobile
Background    : Dark photo overlay (dark-to-transparent gradient left side)
Layout        : 2-column — Left 55% text / Right 45% laptop image
Padding       : --space-12 --space-16 (desktop), --space-8 (mobile)
```

**Headline Treatment**
```
"Tech you can "   → white, --text-display-xl, weight 700
"trust."          → --color-primary, --text-display-xl, weight 700
"Without the guesswork." → white, --text-display-xl, weight 700
Line break between first and second sentence
```

**Sub-copy**
```
Color         : --color-text-secondary
Font          : --text-body-lg
Max-width     : 420px
Margin-top    : --space-4
```

**CTA Row**
```
Display       : flex, gap --space-3, flex-wrap: wrap
Margin-top    : --space-6
"Shop Laptops"      → Primary Button (pill) with laptop icon
"Chat on WhatsApp"  → WhatsApp Button (pill)
```

**Hero Trust Badges (right panel)**
```
Position      : Right side of hero, vertical stack
Item layout   : Icon left + text right (label + sub-label)
Background    : rgba(0,0,0,0.4), blur: 8px
Padding       : --space-3 --space-4
Border-radius : --radius-md
Gap           : --space-3 between items
```

Items: Verified products, Physical store (Nairobi CBD), Countrywide delivery (Via SpeedAF), WhatsApp support

---

### 6.7 Category Navigation Bar

```
Background    : --color-bg-surface
Border-top    : 1px solid --color-border
Border-bottom : 1px solid --color-border
Height        : 64px
Layout        : 5 equal flex columns, dividers between each
```

**Each Category Item**
```
Layout        : [24px icon] gap [title ↵ subtitle] gap [chevron-right 16px]
Icon          : 24px, --color-text-secondary default → --color-primary hover
Title         : --text-label-md, weight 500, --color-text-primary
Subtitle      : --text-body-sm, --color-text-muted
Chevron       : --color-text-muted → --color-primary hover
Divider       : 1px vertical --color-border
Padding       : 0 --space-5
Hover         : background --color-bg-elevated
Cursor        : pointer
Transition    : background 150ms, color 150ms
```

---

### 6.8 Trust Bar (Footer / Bottom of Page)

```
Background    : --color-bg-surface
Border-top    : 1px solid --color-border
Padding       : --space-6 0
Layout        : 5 equal flex columns
```

**Each Trust Item**
```
Layout        : vertical stack — icon / title / subtitle — center aligned
Icon          : 24px, --color-primary
Title         : --text-label-sm, weight 600, white
Subtitle      : --text-body-sm, --color-text-secondary
```

| # | Title | Subtitle |
|---|---|---|
| 1 | Verified Products | Checked before sale |
| 2 | Physical Store | Nairobi CBD |
| 3 | WhatsApp Support | Quick responses |
| 4 | Countrywide Delivery | Via SpeedAF |
| 5 | 6-Month Warranty | On selected products |

---

### 6.9 Product Detail Page (PDP)

**Breadcrumb**
```
Font          : --text-body-sm, --color-text-secondary
Separator     : " › " in --color-text-muted
Current page  : --color-text-primary
```

**Image Gallery**
```
Main image    : Fluid width, --color-bg-elevated bg, --radius-lg
Thumbnails    : 64×64px, --radius-md, 4-up row
Active thumb  : 2px solid --color-primary border
Navigation    : Ghost icon buttons, absolute left/right center
```

**Product Info Column**

| Element | Style |
|---|---|
| Brand | --text-body-sm, --color-text-secondary, weight 500 |
| Product name | --text-heading-xl, white, weight 700 |
| Star rating | Yellow #F59E0B stars + review count in --color-text-secondary |
| Price | --text-display-md, --color-primary, weight 700 |
| Stock status | Green dot 8px + "In Stock", --text-body-md |

**Quantity & Actions**
```
Quantity      : [−] [1] [+] — bordered, --color-bg-elevated, --radius-md
Add to Cart   : Full-width Primary Button
Chat WhatsApp : Full-width WhatsApp Button
Gap           : --space-3 between each
Margin-top    : --space-5 after price
```

**Detail Tabs**
```
Tab bar       : border-bottom 1px --color-border
Active tab    : 2px --color-primary bottom border, white text, weight 600
Inactive tab  : --color-text-secondary, weight 500
Padding       : --space-4 --space-6 per tab
Tab transition: border-color 150ms ease
```

Tab content panels:
- **Overview:** Key Features bullet list (checkmark icon in `--color-success` + text)
- **Specifications:** Two-column label/value table
- **Warranty & Returns:** Plain text policy

**Specifications Table**
```
Label column  : --color-text-secondary, weight 400
Value column  : --color-text-primary, weight 400
Row bg odd    : --color-bg-surface
Row bg even   : --color-bg-elevated
Row padding   : --space-3 --space-4
Row border    : border-bottom 1px --color-border
```

---

### 6.10 Catalogue / Search Results Page

**Page Header**
```
Title         : "Catalogue" — --text-display-md, weight 700, white
Subtitle      : "Find the right tech for your needs." — --color-text-secondary
Results count : "123 products" — --text-body-md, --color-text-secondary
Sort dropdown : Ghost select, right-aligned, --radius-md
```

**Product Grid**
| Breakpoint | Columns | Gap |
|---|---|---|
| Desktop (1280px+) | 4 | --space-6 |
| Tablet (768–1279px) | 3 | --space-4 |
| Mobile (<768px) | 2 | --space-3 |

**Pagination**
```
Style         : Numbered pills, --radius-md
Active        : --color-primary bg, white text
Default       : --color-bg-surface border, --color-text-secondary
Prev/Next     : chevron icons
```

---

### 6.11 Showroom Section

```
Background    : --color-bg-surface
Border-radius : --radius-xl
Padding       : --space-8
Layout        : [Info 40%] | [Photo 30%] | [Quote 30%]
Gap           : --space-6
```

**Info Column**
- Red "VISIT OUR SHOWROOM" micro-label (--text-body-sm, weight 700, uppercase, --color-primary)
- Heading "Skyline Computer World" (--text-heading-xl)
- Location block: map-pin icon + address text
- Two CTAs: "Get Directions" (ghost) + "Chat on WhatsApp" (WhatsApp)

**Photo Column**
- Showroom exterior image
- --radius-lg, `object-fit: cover`

**Quote Column**
- Large opening `"` in --color-primary
- Quote text: italic, --text-heading-sm, white
- Attribution: --text-body-sm, --color-text-secondary

---

### 6.12 Featured Brands

```
Display       : Grid — 3 columns × 2 rows (desktop) / 2 × 3 (mobile)
Gap           : --space-4
```

Each brand cell:
```
Background    : --color-bg-surface
Border        : 1px solid --color-border
Border-radius : --radius-lg
Padding       : --space-4 --space-6
Display       : flex, center align
Logo          : grayscale(100%) default → grayscale(0%) on hover
Transition    : filter 200ms ease
```

Brands: HP · Dell · Lenovo · Samsung · Microsoft · ASUS

---

### 6.13 Footer

```
Background    : --color-bg-base
Border-top    : 1px solid --color-border
Padding       : --space-8 0 --space-6
```

**Footer Anatomy**
1. Logo + tagline ("Good tech. Clear prices. No guesswork.")
2. Navigation links row (Home / Shop / Categories / About / Contact / Terms / Privacy)
3. Social icons row (WhatsApp · TikTok · Instagram · Facebook · YouTube)
4. Copyright line: "© 2025 Skyline Computer World. All rights reserved."

**Social Icons**
```
Icon-button style (see 6.1)
Size          : 20px icons
Use brand SVGs for each platform — no recoloring
```

---

## 7. Motion & Animation

### 7.1 Duration Tokens

| Token | Value | Usage |
|---|---|---|
| `--duration-fast` | 100ms | Icon fills, micro-interactions |
| `--duration-base` | 200ms | Button states, card hovers, filter pills |
| `--duration-slow` | 350ms | Drawers, modals, dropdowns |
| `--duration-xl` | 500ms | Page transitions, hero elements |

### 7.2 Easing Functions

| Token | Value | Usage |
|---|---|---|
| `--ease-default` | `cubic-bezier(0.4, 0, 0.2, 1)` | General-purpose transitions |
| `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Elements leaving the screen |
| `--ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Elements entering the screen |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Wishlist toggle, badge pop, button bounce |

### 7.3 Interaction Animation Reference

| Interaction | Animation | Duration | Easing |
|---|---|---|---|
| Card hover | `translateY(-2px)` + border brighten | 200ms | --ease-default |
| Button hover | `scale(1.02)` | 200ms | --ease-default |
| Button press | `scale(0.97)` | 100ms | --ease-in |
| Wishlist toggle | Heart fill + `scale(1.2)` → `scale(1)` | 300ms | --ease-spring |
| Filter pill select | Background swap | 150ms | --ease-default |
| Drawer/modal open | Slide up + fade in | 350ms | --ease-out |
| Drawer/modal close | Slide down + fade out | 250ms | --ease-in |
| Badge on image load | Fade in | 300ms | --ease-out |
| Product grid filter | Shimmer skeleton → content | 400ms | --ease-out |
| Add to cart | Button pulse + scale | 200ms | --ease-spring |

---

## 8. Shadows & Elevation

| Token | Value | Usage |
|---|---|---|
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.4)` | Subtle card depth |
| `--shadow-md` | `0 4px 12px rgba(0,0,0,0.5)` | Card hover, dropdowns, tooltips |
| `--shadow-lg` | `0 8px 24px rgba(0,0,0,0.6)` | Modals, bottom drawers |
| `--shadow-xl` | `0 16px 48px rgba(0,0,0,0.7)` | Full-screen overlays |
| `--shadow-brand` | `0 4px 20px rgba(232,0,28,0.25)` | Primary button hover glow |

### Elevation Hierarchy

```
Level 0 (base)      : --color-bg-base     + no shadow
Level 1 (surface)   : --color-bg-surface  + --shadow-sm
Level 2 (elevated)  : --color-bg-elevated + --shadow-md
Level 3 (overlay)   : --color-bg-elevated + --shadow-lg
Level 4 (modal)     : --color-bg-surface  + --shadow-xl
```

---

## 9. Accessibility

### 9.1 Contrast Targets

| Pair | Contrast | WCAG |
|---|---|---|
| `#FFFFFF` on `--color-bg-base` (#0B0B0B) | ~21:1 | AAA ✓ |
| `--color-text-secondary` (#9CA3AF) on #0B0B0B | ~8:1 | AAA ✓ |
| `#FFFFFF` on `--color-primary` (#E8001C) | ~4.8:1 | AA ✓ |
| `--color-success` (#16C064) on #161616 | ~5.2:1 | AA ✓ |

### 9.2 Focus States
```css
/* Applied to all interactive elements */
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 3px;
  border-radius: /* match component radius */;
}
```
- Never remove default focus outlines — only replace with a brand-styled equivalent
- Test all interactive components with keyboard-only navigation

### 9.3 Touch Target Minimums
- Minimum: **44×44px** on all interactive elements
- Product cards: Entire card surface is clickable
- Filter checkboxes: Full row (including label) is part of the tap target
- Cart icon with badge: Minimum 44×44px hit area around the combined element

### 9.4 ARIA Conventions
- All icon-only buttons: `aria-label="..."` required (e.g., `aria-label="Add to wishlist"`)
- Cart badge: `aria-label="Cart, 2 items"` on the cart button
- Filter dropdowns: `aria-expanded`, `aria-controls`
- Product status badges: Include text content (screen-reader visible), not purely color-coded
- Stock status: Never rely on color alone — always include "In Stock" / "Out of Stock" text

### 9.5 Motion Preferences
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 10. Responsive Breakpoints

| Token | Value | Alias |
|---|---|---|
| `--bp-xs` | 375px | Small mobile |
| `--bp-sm` | 480px | Large mobile |
| `--bp-md` | 768px | Tablet |
| `--bp-lg` | 1024px | Small desktop |
| `--bp-xl` | 1280px | Desktop |
| `--bp-2xl` | 1440px | Wide desktop |

### Key Layout Shifts

| Breakpoint | Layout Change |
|---|---|
| < 480px | Single-column product grid, stacked hero, full-width CTAs |
| < 768px | Hamburger nav replaces desktop nav; filter sidebar becomes bottom drawer |
| 768–1023px | 2-column product grid; compact layout; filter collapsed by default |
| ≥ 1024px | 3-column product grid; filter sidebar always visible |
| ≥ 1280px | 4-column product grid; full desktop nav; extended hero layout |

---

## 11. Patterns & Conventions

### 11.1 Price Formatting

```
Currency prefix  : KSh (not KES, Kes, or ksh)
Separator        : One space after prefix — "KSh 43,000"
Thousands sep    : Comma — "KSh 43,000" not "KSh 43000"
Color            : --color-primary (red)
Weight           : 700
Decimals         : Omit for whole numbers — never "KSh 43,000.00"
```

### 11.2 Product Condition Convention

| Condition | Card Image Badge | Card Label Dot |
|---|---|---|
| New | Blue badge "NEW" | Green dot + "New" |
| Refurbished | Orange badge "REFURBISHED" | Green dot + "Refurbished" |
| Used | Gray badge "USED" | Gray dot + "Used" |

### 11.3 WhatsApp CTA Pattern

WhatsApp is the **primary conversion path** across the site. It appears in:
1. Hero section (secondary CTA)
2. Product card (on hover — optional reveal)
3. Product Detail Page (below "Add to Cart")
4. Showroom section
5. Mobile sticky footer bar

**Pre-filled message format:**
```
"Hi, I'm interested in the [Product Name] (KSh [Price]). Is it still available?"
```
This is passed as the `text` URL parameter in the WhatsApp deep-link.

### 11.4 Section Header Pattern

Recurring across all listing sections:
```
[Section Title]       [View all products →]   (red link, right-aligned)
[Subtitle in muted]
```

- Title: `--text-heading-xl`, weight 700, white
- Subtitle: `--text-body-md`, `--color-text-secondary`
- "View all" link: `--color-primary`, `--text-label-md`, weight 500, with `→` arrow

### 11.5 Loading / Skeleton States

```
Skeleton color 1 : --color-bg-elevated
Skeleton color 2 : --color-bg-overlay
Animation        : Gradient shimmer left → right
Duration         : 1.5s, infinite loop
Border-radius    : Match the element's actual radius
```

Apply to: product card image, product name line, price line, badge.

### 11.6 Empty States

```
Icon     : Outline Lucide icon, 48px, --color-text-muted
Heading  : --text-heading-sm, white, "No products found"
Sub-copy : --text-body-md, --color-text-secondary — helpful action text
CTA      : Primary button leading to browseable content
```

### 11.7 Spec String Format

```
Pattern : [Processor] · [RAM] · [Storage]
Example : "Core i5 10th Gen · 8GB · 512GB SSD"
Font    : --text-body-sm, --color-text-secondary
```

### 11.8 Delivery Partner

SpeedAF is the named delivery partner. Always refer to countrywide delivery as "Via SpeedAF."

---

## 12. CSS Custom Properties Reference

```css
:root {
  /* ─── Brand Colors ─── */
  --color-primary       : #E8001C;
  --color-bg-base       : #0B0B0B;
  --color-bg-surface    : #161616;
  --color-bg-elevated   : #1F1F1F;
  --color-bg-overlay    : #2A2A2A;
  --color-text-primary  : #FFFFFF;
  --color-text-secondary: #9CA3AF;
  --color-text-muted    : #6B7280;
  --color-border        : #252525;
  --color-border-strong : #3A3A3A;

  /* ─── Semantic Colors ─── */
  --color-success       : #16C064;
  --color-warning       : #F97316;
  --color-info          : #3B82F6;
  --color-error         : #EF4444;
  --color-rating        : #F59E0B;

  /* ─── Red Scale ─── */
  --red-500             : #E8001C;
  --red-600             : #C8001A;
  --red-700             : #A80016;

  /* ─── Typography ─── */
  --font-sans           : "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-mono           : "JetBrains Mono", "Fira Code", monospace;

  /* ─── Spacing ─── */
  --space-1 : 4px;
  --space-2 : 8px;
  --space-3 : 12px;
  --space-4 : 16px;
  --space-5 : 20px;
  --space-6 : 24px;
  --space-8 : 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;

  /* ─── Border Radius ─── */
  --radius-sm  : 4px;
  --radius-md  : 8px;
  --radius-lg  : 12px;
  --radius-xl  : 16px;
  --radius-full: 9999px;

  /* ─── Shadows ─── */
  --shadow-sm   : 0 1px 3px rgba(0, 0, 0, 0.40);
  --shadow-md   : 0 4px 12px rgba(0, 0, 0, 0.50);
  --shadow-lg   : 0 8px 24px rgba(0, 0, 0, 0.60);
  --shadow-xl   : 0 16px 48px rgba(0, 0, 0, 0.70);
  --shadow-brand: 0 4px 20px rgba(232, 0, 28, 0.25);

  /* ─── Motion ─── */
  --duration-fast  : 100ms;
  --duration-base  : 200ms;
  --duration-slow  : 350ms;
  --duration-xl    : 500ms;
  --ease-default   : cubic-bezier(0.4, 0, 0.2, 1);
  --ease-in        : cubic-bezier(0.4, 0, 1, 1);
  --ease-out       : cubic-bezier(0, 0, 0.2, 1);
  --ease-spring    : cubic-bezier(0.34, 1.56, 0.64, 1);

  /* ─── Breakpoints (for reference — use in @media queries) ─── */
  /* --bp-xs : 375px   */
  /* --bp-sm : 480px   */
  /* --bp-md : 768px   */
  /* --bp-lg : 1024px  */
  /* --bp-xl : 1280px  */
  /* --bp-2xl: 1440px  */
}
```

---

*Skyline Computer World — DESIGN_SYSTEM.md v1.0*
*Extracted from live design screens · October 2026*
*Maintained by the Design & Development Team*
