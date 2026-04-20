
## HIPSTER — Luxury Salon App (React Port)

A faithful React + Tailwind port of your prototype. Mobile-first, capped at a 390px column, with the same cream/ink/gold aesthetic, Cormorant Garamond + DM Sans typography, and all 5 screens fully interactive. Email auth wraps the experience; everything else uses the prototype's demo content.

### Design system (locked in `index.css` + `tailwind.config.ts`)
- **Palette**: cream `#F5F0E8`, cream-dark `#EDE8DC`, ink `#1A1714`, ink-mid `#3D3830`, ink-light `#7A7268`, gold `#B8965A`, gold-light `#D4AF7A`, gold-pale `#F0E8D5`, white `#FDFAF5`, border `#D8D0BF` — all exposed as HSL CSS variables and Tailwind tokens (`bg-cream`, `text-ink`, `border-gold`, etc.).
- **Type**: Cormorant Garamond (serif headings, italic accents) + DM Sans (body). Loaded via Google Fonts in `index.html`.
- **Motifs**: 0.5px hairlines, 14–16px rounded cards, gold pill CTAs, ink primary buttons, faux phone status bar `9:41`, fade-in screen transitions.

### App shell
- Centered `max-w-[390px]` "phone" frame on every screen, cream background outside the frame on desktop.
- Persistent bottom nav (Home · Services · Book · Loyalty · Profile) with the raised dark circular Book FAB.
- React Router routes: `/`, `/services`, `/book`, `/loyalty`, `/profile`, `/auth`, `/reset-password`, `*` (NotFound).

### Screens (1:1 with the HTML)
1. **Home** — greeting ("Good morning, Julianne ✦"), gold-accented dark hero card with ₹400 weekday gift badge + Book/Learn CTAs, category chips (All/Hair/Skin/Spa/Nails), 2-col "Trending now" service grid with SVG icons, "Elevated membership / Now Open" gold strip.
2. **Services** — "The Art of Renewal" header, category chips, full-bleed service list with thumbnails, descriptions, and gold prices.
3. **Book** — back button, horizontal stylist carousel (selected = gold border), April 2026 calendar grid with today/selected/dim states, 3-col time-slot grid with available/selected/unavailable states, live "Your booking" summary card, full-width ink "Confirm appointment" CTA → toast confirmation.
4. **Loyalty** — dark Gold Member card with progress bar to Platinum, points/visits/saved stats, Enrich Wallet (₹3,450) with Add funds/Transfer/History, recent visits list.
5. **Profile** — dark hero with avatar, name, gold tier chip, 3-stat row, next appointment card with Reschedule/Cancel/Book again, settings list (Personal info, Payment methods, Preferences, Sign out → calls `supabase.auth.signOut`).

### Interactivity (local React state, no backend)
- Chip filters, stylist selection, calendar day selection, time-slot selection, screen-to-screen navigation via `<Link>`, "Confirm appointment" fires a sonner toast.

### Authentication (Lovable Cloud)
- `/auth` page styled to match the salon (cream bg, serif heading, gold CTA): tabs for **Sign in** and **Create account** with email + password, plus "Forgot password?" link.
- `signUp` uses `emailRedirectTo: window.location.origin` so confirmation lands back on the app. `onAuthStateChange` listener set up before `getSession` in a small `useAuth` hook.
- `/reset-password` public route handles the recovery flow and calls `updateUser({ password })`.
- All 5 main screens are gated: unauthenticated users are redirected to `/auth`.
- Zod validation on email/password fields with inline error messages.
- No `profiles` table — `auth.users` only. Loyalty/profile/wallet numbers stay as the prototype's demo content.

### Out of scope (call out for a later round)
- Real bookings persistence, stylist/service CRUD, payments, push notifications, admin dashboard, desktop layout. All easy follow-ups once the visual + auth shell is in.

### Files I'll add/change
- `index.html` (fonts, title)
- `src/index.css`, `tailwind.config.ts` (design tokens)
- `src/App.tsx` (routes + auth provider)
- `src/hooks/useAuth.tsx`
- `src/components/PhoneFrame.tsx`, `BottomNav.tsx`, `StatusBar.tsx`, `TopBar.tsx`, `ProtectedRoute.tsx`
- `src/pages/Home.tsx`, `Services.tsx`, `Book.tsx`, `Loyalty.tsx`, `Profile.tsx`, `Auth.tsx`, `ResetPassword.tsx`
- `src/data/mockData.ts` (services, stylists, invoices)
- Lovable Cloud enabled for email auth
