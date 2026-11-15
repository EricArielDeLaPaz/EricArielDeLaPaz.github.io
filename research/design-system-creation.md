# Design System Creation Research Brief

## 1. Intake Flows: Onboarding in Leading Design Systems

Leading design systems and tools onboard users creating a design system through structured intake flows. Below is an analysis of how major systems structure this onboarding, the questions asked, their sequence, and how answers alter the system configuration.

### A. Material 3 Theme Builder (Google)
- **Source:** [Material 3 Design Tokens](https://m3.material.io/foundations/design-tokens/how-to-use-tokens), [Material Theme Builder README](https://github.com/material-foundation/material-theme-builder/blob/main/README.md), [Introducing Material Theme Builder](https://m3.material.io/blog/material-theme-builder)
- **Starting Point / Intake Questions:**
  1. **Source Selection:** Choose how to generate core colors (Source Image vs. Core Colors / Brand Color vs. Shuffle / Preset Theme).
  2. **Source Input:** If image, upload wallpaper/artwork and select algorithm (`Wallpaper` vs `Content`). If core colors, input primary brand hex (`Primary`). Optionally input secondary and tertiary brand colors.
  3. **Theme Name & Scope:** Provide a short theme name (acts as token prefix in Figma).
  4. **Advanced Settings / State Layers:** Checkboxes for "New theme color diagram" and "Generate State Layers" (essential for interactive components).
- **What Each Answer Changes:**
  - **Source image / Primary color:** Computes tonal palettes across the M3 color space (HCT color model: Hue, Chroma, Tone). Generates light and dark schemes, assigning dynamic color roles (`primary`, `on-primary`, `surface`, `on-surface`, `surface-container`, etc.).
  - **State layers toggle:** Generates distinct opacity overlays for hover, active, focus, and pressed states.
  - **Theme name:** Prefixes generated Figma variable collections and styles for easy multi-theme switching and code export.

### B. Shopify Polaris
- **Source:** [Shopify Polaris Tokens](https://github.com/Shopify/polaris-tokens), [Polaris Setup Guide Pattern](https://shopify.dev/docs/api/app-home/latest/patterns/compositions/setup-guide), [Color Tokens Documentation](https://github.com/Shopify/polaris/blob/main/polaris.shopify.com/content/design/colors/color-tokens.mdx)
- **Starting Point / Intake Questions:**
  1. **Platform Target:** React, CSS variables, or Shopify Admin app integration.
  2. **Library Inclusion:** Enable Polaris components, style library, and icon library in Figma or install `@shopify/polaris-tokens` via npm.
- **What Each Answer Changes:**
  - **Platform Selection:** Configures token output format (JS/JSON/CSS/SCSS).
  - **Figma Library Toggle:** Subscribes the workspace to centralized semantic tokens (`bg`, `bg-surface`, `text`, `border`, `icon`, and interaction state modifiers like `-hover`, `-active`, `-selected`, `-disabled`).

### C. IBM Carbon Design System
- **Source:** [Carbon Getting Started Overview](https://www.carbondesignsystem.com/getting-started/designing/overview), [Carbon Design Resources](https://www.carbondesignsystem.com/getting-started/designing/design-resources), [Carbon Themes Overview](https://v10.carbondesignsystem.com/guidelines/themes/overview/)
- **Starting Point / Intake Questions:**
  1. **User Authentication & Role:** Sign into IBM SSO / organizational Figma organization.
  2. **Library Activation:** Add foundational libraries (`(v11) Carbon Design System`, `(v11) Type Sets`, `IBM Color Library`, `UI Icon Library`).
  3. **Theme Selection:** Choose default base theme (`White`, `Gray 10`, `Gray 90`, `Gray 100`).
- **What Each Answer Changes:**
  - **Theme Selection:** Assigns 52 universal color variables and global token maps (`$carbon--theme`) across components without modifying individual component files.

### D. shadcn/ui & Radix Themes
- **Source:** [shadcn/ui Theming Docs](https://ui.shadcn.com/docs/theming), [components.json Reference](https://ui.shadcn.com/docs/components-json), [Radix Themes Styling](https://www.radix-ui.com/themes/docs/overview/styling)
- **Starting Point / Intake Questions:**
  1. **Style / Shape Preset:** Choose component style variant (e.g., Nova, Vega, Lyra, Default).
  2. **Base Color / Grays Palette:** Select base gray family (`Neutral`, `Stone`, `Zinc`, `Mauve`, `Olive`, `Mist`, `Taupe`).
  3. **Accent Color:** Select primary brand accent or custom hex/OKLCH value.
  4. **Theming Mechanism:** Choose between CSS variables (`tailwind.cssVariables: true`) vs. utility classes (`false`).
  5. **Corner Radius Base:** Set base radius token (`--radius`).
- **What Each Answer Changes:**
  - **Base Color & Accent:** Generates `:root` and `.dark` CSS custom properties (`--background`, `--foreground`, `--primary`, `--muted`, `--card`, etc.) mapped into Tailwind v4 `@theme inline` utilities.
  - **Radius:** Automatically derives a full radius scale (`--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`, etc.) via mathematical multipliers.

---

## 2. Starting Points Comparison: Existing, Library, or Scratch

### Starting Point 1: Has an Existing Figma Design System
- **What to Read / Audit:**
  - **Variables & Collections:** Inspect local variables, primitive tokens, semantic tokens, and mode mappings (Light/Dark).
  - **Styles:** Review color styles, text styles, effect styles (shadows), and grid styles.
  - **Components:** Audit component variants, property naming conventions, slot structures, and instance override hygiene.
  - **Code Connect:** Check whether Figma Code Connect mappings link design components to React/Vue/iOS/Android code repositories.

### Starting Point 2: Picks a Preset from a Library
- **What to Read / Audit:**
  - **Preset Selection:** Choose established open-source or enterprise design system foundations (e.g., Material 3, Carbon v11, Polaris, shadcn/ui).
  - **Token Subscriptions:** Link upstream Figma libraries or install corresponding npm design token packages (`@radix-ui/themes`, `@shopify/polaris-tokens`).
  - **Override Strategy:** Establish governance for local overrides versus upstream library syncs.

### Starting Point 3: Starts from Scratch
- **What to Read / Audit:**
  - **Brand & Domain Foundation:** Define target product verticals, brand archetypes, and platform requirements.
  - **Token Architecture:** Establish 3-tier token taxonomy (Primitive/Global -> Semantic/Alias -> Component-specific).

---

## 3. From-Scratch Intake Flow & Decision Mapping

When initiating a design system from scratch, the intake flow must ask structured questions that map directly to underlying system tokens and generated code:

1. **Industry & Product Type:**
   - *Question:* What is your primary product category (e.g., Enterprise SaaS, E-commerce, Consumer Mobile, Fintech, Developer Tool)?
   - *Mapping:* Determines starter component presets, density defaults, and accessibility rigor.
2. **Brand Colors (Given vs. None):**
   - *Question:* Do you have exact brand hex codes, or should we generate a palette from scratch or source imagery?
   - *Mapping:* If given, establishes primary, secondary, and neutral anchors. If none, runs algorithmic generation (e.g., HCT color space or harmonious color theory).
3. **Personality & Feel:**
   - *Question:* What visual tone should the system convey (e.g., Clinical/Precise, Playful/Warm, Editorial, Minimalist/Technical)?
   - *Mapping:* Drives corner radius defaults, font pairing selection (Sans vs. Serif/Mono), and border weight.
4. **Target Platforms:**
   - *Question:* Where will this system live (Web/React, iOS, Android, Desktop/Electron)?
   - *Mapping:* Dictates token export formats (CSS custom properties, Design System Package JSON, Android XML, Swift/Compose tokens).
5. **Density & Spacing Model:**
   - *Question:* What is your default layout density (Compact/Data-dense, Comfortable/Standard, Spacious)?
   - *Mapping:* Establishes the underlying spatial scale baseline (4pt vs. 8pt grid multipliers).
6. **Color Scheme & Mode Support:**
   - *Question:* Do you require Light mode only, Dark mode only, or automatic system-preference switching?
   - *Mapping:* Generates paired semantic surface and text tokens across `:root` and `.dark` blocks.
7. **Accessibility Compliance Target:**
   - *Question:* What WCAG conformance level must be met (WCAG 2.1 AA vs. AAA)?
   - *Mapping:* Enforces strict contrast validation thresholds (4.5:1 for normal text, 3:1 for large text and UI components).

### Algorithmic Token Generation Rules:
- **Color Contrast:** Palettes are programmatically tested against WCAG AA standards using relative luminance calculations. Text tokens (`--*-foreground`) are dynamically paired with backgrounds to guarantee $\ge 4.5:1$ contrast. UI component borders and interactive states enforce $\ge 3:1$ contrast against adjacent surfaces.
- **Type Scale Ratios:** Standard typographic scales are generated using mathematical modular scale ratios (e.g., Minor Third 1.200 or Major Third 1.250) applied to a base body font size (typically 16px / 1rem).
- **4-Point Spacing Scale:** Spacing tokens follow a strict 4-point incremental baseline: `4px` (`0.25rem`), `8px` (`0.5rem`), `12px` (`0.75rem`), `16px` (`1rem`), `24px` (`1.5rem`), `32px` (`2rem`), `48px` (`3rem`), and `64px` (`4rem`).
- **Radius Scale:** A single base radius token (`--radius`, e.g., `8px` or `0.5rem`) is defined, with semantic multipliers deriving derived radii (`sm`: `0.6x`, `md`: `0.8x`, `lg`: `1x`, `xl`: `1.4x`, `full`: `9999px`).
- **Elevation & Motion:** Elevation is modeled via multi-layered shadow tokens or surface tinting (Material 3 surface tonal elevations 0–5). Motion is governed by duration tokens (`fast: 150ms`, `normal: 250ms`, `slow: 400ms`) and easing curves (`ease-in-out`, `cubic-bezier`).

---

## 4. Documentation & AI-Readable Formats

Top design systems combine human-readable documentation with structured, machine-readable formats optimized for AI consumption and automated tooling:

### A. Anatomy of Token and Component Documentation
- **Purpose:** High-level summary of what the token or component achieves.
- **When to Use & When NOT to Use:** Prescriptive guidance preventing misuse.
- **Anatomy:** Labeled breakdown of internal sub-elements (e.g., icon slot, label, badge, trailing action).
- **States:** Documentation of interactive states (`default`, `hover`, `active`, `focus`, `disabled`, `loading`).
- **Accessibility (a11y):** ARIA roles, keyboard navigation specs, focus trap rules, and contrast verification notes.
- **Content Guidelines:** Tone of voice, truncation rules, and max character limits.
- **Tokens Used:** Exhaustive list of underlying design tokens referenced by the component.

### B. AI-Readable Formats
1. **`llms.txt` / `llms-full.txt`:** Markdown-based index files placed at the root of documentation websites, providing LLM-optimized summaries and hierarchical links to all design system primitives and components.
2. **W3C Design Tokens Format (`design-tokens.json`):** Standardized JSON specification for cross-platform design tokens supporting type, value, description, and extensions, allowing AI agents to parse and validate token hierarchies.
3. **Figma Variable & Component Descriptions:** Rich markdown descriptions attached directly to Figma variables and component definitions, enabling AI design assistants (like Figma Make or Carbon MCP) to query live design intent.
4. **Code Connect (`code-connect.json` or `.figma/code-connect/`):** Official mapping configuration linking Figma component nodes directly to corresponding React/Vue/Code repository files and props.

---

## 5. Starter Component Sets & Icon Library Criteria

### A. Starter Component Presets by Product Type
- **Enterprise SaaS / Dashboard:** Data Table, Sidebar Navigation, Breadcrumbs, Tabs, Modal, Dropdown Menu, Badge, Tooltip, Pagination, Toast Notification.
- **E-Commerce:** Product Card, Image Gallery, Quantity Stepper, Checkout Stepper, Accordion, Rating / Star Display, Filter Sidebar, Drawer.
- **Consumer Mobile / App:** Bottom Navigation, Floating Action Button (FAB), Card, Avatar, Segmented Control, Action Sheet, Switch / Toggle.

### B. Icon Library Evaluation Criteria
1. **License & Open Source Rights:** Must permit commercial use and modification without attribution conflicts (e.g., MIT, Apache 2.0, SIL OFL).
2. **Visual Style Consistency:** Uniform stroke width (e.g., 1.5px or 2px), grid alignment (24x24px master bounding box), and corner rounding rules across the entire set.
3. **Stroke & Optical Adjustments:** Support for multiple weights (Thin, Light, Regular, Bold, Filled) and clear optical scaling.
4. **Coverage & Taxonomy:** Comprehensive icon coverage spanning navigation, action verbs, media, file types, devices, and domain-specific concepts. Popular industry choices include Lucide, Tabler Icons, Phosphor, and Remix Icon.

---
*Research compiled and verified against Material Design 3, Shopify Polaris, IBM Carbon, Radix Themes, and shadcn/ui documentation.*
