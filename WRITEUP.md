# Catalox — Dynamic Multi-Category Catalog
## Submission Write-Up

---

### Technologies Used

| Layer | Tech |
|-------|------|
| UI Framework | React 18 (functional components + hooks) |
| State Management | Redux Toolkit (RTK) |
| Build Tool | Vite 5 |
| Styling | CSS Modules + CSS custom properties |
| Data | Static JSON import via ES module |
| Fonts | Google Fonts — Bebas Neue (display) + DM Sans (body) + DM Mono |

**No external UI libraries** (no MUI, no Tailwind) — pure CSS Modules for full control.

---

### Time Taken

~2.5–3 hours total:
- ~20 min — Architecture planning, Redux slice design
- ~40 min — Component structure + Redux wiring
- ~90 min — UI design, CSS Modules, animations, responsive layout
- ~20 min — QA, edge cases (broken images, empty states, mobile)

---

### Approach & Architecture

#### State Management (Redux Toolkit)
A single `catalogSlice` manages:
- `items` — the raw JSON data (imported once)
- `selectedItem` — the currently viewed item (null = home, non-null = detail)
- `activeCategory` — active filter tab
- `searchQuery` — live search string

Navigation is **state-driven** (not URL-based): `selectedItem !== null` renders `<ItemDetail>`, otherwise `<Home>`. This avoids router dependencies while keeping the logic clean.

Selectors (`selectItemsByCategory`, `selectFilteredItems`) derive computed views from slice state — keeping components pure and testable.

#### Dynamic Rendering
The detail page iterates `item.itemprops[]` generically — no hardcoded field names. Every category (Cars, Bikes, Phones, Computers) renders its specific properties automatically. Color theming is also driven by category name via CSS class maps.

#### Component Breakdown
```
src/
├── data/
│   └── data.json               # Source of truth
├── store/
│   ├── index.js                # configureStore
│   └── catalogSlice.js         # RTK slice + selectors
├── components/
│   ├── Navbar.jsx / .module.css
│   ├── CategoryFilter.jsx / .module.css
│   └── ItemCard.jsx / .module.css
├── pages/
│   ├── Home.jsx / .module.css
│   └── ItemDetail.jsx / .module.css
├── styles/
│   └── globals.css             # CSS variables, animations, resets
├── App.jsx                     # State-based router
└── main.jsx                    # ReactDOM + Provider
```

#### Design Direction
Dark editorial aesthetic — Bebas Neue display font, monospace spec values, per-category accent colors (orange for Cars, yellow-green for Bikes, cyan for Phones, purple for Computers). Staggered `fadeUp` animations on card render, scale-in on detail view. Fully responsive via CSS Grid `auto-fill / minmax`.

---

### Setup Instructions

```bash
cd catalog-app
npm install
npm run dev
```

Runs on `http://localhost:5173`
