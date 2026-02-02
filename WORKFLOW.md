# Playto Workflow & UI System Notes

This file records the current product decisions and visual system for Playto. Update it whenever changes are made to UX, UI, flows, or architecture. Do not push this file to remote unless explicitly asked.

## Product Summary
- Playto is a modern, gamified community feed with short posts, threaded replies, public profiles, and a 24-hour leaderboard.
- Core interactions: create posts, like posts/comments, reply to comments, view karma/leaderboard, and visit public profiles.

## Routing & Pages
- `/` Home (feed + leaderboard + create post).
- `/login` Login (public route only if not authenticated).
- `/register` Register (public route only if not authenticated).
- `/profile` Profile (protected route; requires login).
- `/u/:username` Public profile (view any user profile).
- `/posts/:id` Post detail route (opens bottom drawer with full post + comments).

## Authentication & Access Rules
- Unauthenticated users can view posts, leaderboard, and public profiles.
- Only authenticated users can create posts, comment, or access the profile page.
- Login/Register pages are blocked for authenticated users and redirect to `/profile`.
- Auth tokens stored in localStorage; `access` is also stored as a cookie.
- Invalid tokens auto-clear on 401 responses, and requests retry once without auth.

## Backend Highlights
- Django + DRF with JWT auth.
- Posts, comments (MPTT), likes, and karma transactions.
- Posts list endpoint cached (30s). Leaderboard cached (60s).
- Public profile endpoints by `id` and `username`.
- Mention search endpoint for autocomplete (`users/search/?q=`).
- Pagination enabled: current `PAGE_SIZE = 2` (DRF PageNumberPagination).

## Frontend Data Fetching
- React Query.
- Posts use infinite scrolling (`useInfiniteQuery`) with `?page=`.
- Leaderboard refetches every 60s.
- Public profile fetched by username on `/u/:username`.
- Mention autocomplete uses `users/search/?q=`.

## UI/UX Visual System (Light Mode)
- Style direction: tactile, soft booking-flow inspired UI.
- Background: `canvas-bg` gradient haze on warm cream.
- Cards: `phone-frame` (rounded corners, subtle borders, soft shadow).
- Typography:
  - Display: `Playfair Display`
  - Body: `Manrope`
- Primary palette:
  - `canvas`: #f4eee6
  - `cream`: #fbf6ef
  - `ink`: #1f1e1c
  - `line`: #c7bfb4
  - `haze`: #dcd4c7
  - `accent`: #d88b6d
  - `accentDark`: #b36d52

## UI/UX Visual System (Dark Mode)
- Dark canvas: #0f1115
- Faded noise overlay to mimic textured background (SVG noise in CSS).
- Soft radial glows (warm + cool) layered over dark base.
- Card backgrounds: #151822
- Borders: rgba(255, 255, 255, 0.08-0.12)
- Text: `#f0ede6` with utility overrides for text-ink/60, /70, /80, /90.

## Theme Toggle
- Toggle switch with animated knob.
- Positioned last in header (desktop and mobile drawer).

## Header
- Minimal logo text (“Playto”).
- Home link always visible.
- Only shows Profile link when logged in.
- Login/Logout shown depending on auth (uppercase labels).
- Hamburger on mobile opens right-side drawer.

## Footer
- Shows attribution: “Designed and Created by Arbab Arshad”.
- GitHub icon links to https://github.com/Arbab-ofc.

## Home Page
- Hero split layout (copy + quick snapshot cards).
- Background thread SVGs with low z-index (visible behind content).
- Latest posts in a card.
- Sidebar shows leaderboard + notes.
- Section design details:
  - Hero: left column copy, right column “Quick snapshot” cards.
  - Latest posts: card with header + infinite scroll list.
  - Sidebar: leaderboard card + community notes card.

## Profile Page (Private)
- Redesigned layout: stats + highlights + bio.
- First name displayed instead of avatar circle.
- Real stats: total posts and total comments from backend.
- Section design details:
  - Left: profile header, stats grid, bio panel.
  - Right: highlights card with counters + user posts panel.
- User posts panel:
  - Infinite scroll inside a fixed-height container.
  - Shows likes, total comments, reply count, and latest thread snippet.
  - Clicking a post opens `/posts/:id` drawer view.

## Public Profile Page
- Route: `/u/:username`.
- Shows total karma, 24h karma, and total likes across posts.
- Highlights: total posts and total replies.
- Public bio section.
- User posts list (same panel pattern as private profile).

## Comments
- Nested comments enabled up to 50 levels.
- Each comment has Reply button (auth only) for nested replies.
- Comment tree has collapse/expand toggle per comment.
- On post cards: show only 1 comment; “Show all comments” opens bottom drawer with full post + comment tree.
- Mentions: `@username` links to public profiles.
- Mention autocomplete appears while typing `@` in comment/reply inputs.
- Section design details:
  - Comment cards: soft rounded panels with author + timestamp.
  - Reply action inline; nested replies indented.

## Anonymous Mode
- Logged-in users can toggle Anonymous mode in the Latest Posts section.
- When enabled, new posts and comments hide the author identity.
- Backend stores `is_anonymous` on posts and comments.
- UI displays `Anonymous` for author name when `is_anonymous` is true.
- Toggle state is stored in localStorage (`anonymous_mode`).
- Toggle is hidden when logged out.

## Post Detail Drawer
- Bottom sheet with overlay and close button.
- Shows full post content and nested comments.
- Comment form shown inside drawer if logged in.
- Section design details:
  - Slide-up sheet, rounded top, soft border, max height 85vh.

## Pagination / Infinite Scroll
- Infinite scroll for posts (IntersectionObserver sentinel).
- Smooth fade transitions between load states.
- Shows a minimal skeleton while loading.
- Post, comment, and like/unlike writes bust the posts cache so lists refresh immediately.

## Auth Forms
- Login and Register are redesigned as split-panel layouts.
- Full name required in register.
- Password rule: 8+ chars, uppercase, lowercase, number, symbol.
- Show/Hide password icons on both forms.
- Section design details:
  - Left/right split panels with soft circles and thread lines.
  - Form card uses same `phone-frame` style.

## CORS / Local Dev
- Allowed origins:
  - http://localhost:5173
  - http://127.0.0.1:5173
- `CSRF_TRUSTED_ORIGINS` includes both.

## Notes for Future Updates
- Update this file whenever UI layout, flows, or design tokens change.
- Do not push this file unless explicitly requested.
