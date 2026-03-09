# CLAUDE.md — UniBuddy Project Guidelines

## Project Overview

UniBuddy is a white-label mobile PoC for international student onboarding, targeting Keimyung University (South Korea). It is NOT a social app, course-management app, or generic campus app. It is a practical information hub for overwhelmed international students.

## Tech Stack

- **Frontend**: React Native + Expo (SDK 55) + TypeScript + Expo Router (file-based routing)
- **Backend**: Supabase (Auth + Postgres + RLS) — no custom backend server
- **State**: Zustand for language only, React hooks for everything else
- **Package manager**: pnpm

## Commands

```bash
# Run the app
pnpm start             # or: npx expo start

# Type check
npx tsc --noEmit

# Install dependencies
pnpm install
```

There are no tests yet. Do not add test infrastructure unless explicitly asked.

## Project Structure

```
mobile-app/
├── app/                    # Expo Router — screens only, keep them thin
│   ├── (tabs)/             # Student tab screens (home, guides, map, saved, profile)
│   ├── admin/              # Admin screens (protected by role check in _layout)
│   ├── content/[id].tsx    # Content detail (dynamic route)
│   ├── auth/sign-in.tsx    # Authentication
│   ├── index.tsx           # Root redirect → /(tabs)/home
│   └── _layout.tsx         # Root layout (auth listener, language loader)
├── src/
│   ├── components/         # Reusable UI components
│   ├── constants/          # theme.ts, categories.ts, languages.ts
│   ├── hooks/              # Data fetching + state hooks
│   ├── services/           # Supabase service layer (all DB calls go here)
│   └── types/              # TypeScript interfaces
└── supabase/               # SQL files (schema, rls, seed)
```

## Architecture Rules

### Separation of concerns
- **Screens** (`app/`) should be thin — rendering + layout only
- **Hooks** (`src/hooks/`) handle data fetching, loading/error states, and business logic
- **Services** (`src/services/`) are the only layer that talks to Supabase directly
- **Components** (`src/components/`) are reusable, stateless where possible

### What NOT to introduce
- Redux, MobX, or any heavy state management
- GraphQL or custom API server
- Complex CMS workflows
- Payment systems, analytics, or SSO
- Over-abstraction (no factories, no DI containers, no generic utilities for single-use code)

### Styling
- Use `StyleSheet.create()` — no styled-components or external CSS-in-JS
- Colors, spacing, font sizes come from `src/constants/theme.ts`
- Mobile-first, clean, minimal — no flashy animations
- Every screen should answer one practical student question

### Database
- 4 tables: `profiles`, `content_items`, `saved_items`, `map_locations`
- Translations are separate `content_items` rows linked by `translation_group_id`
- Language fallback: if requested language not found, fall back to English
- RLS is enabled on all tables — always consider policies when changing queries

### Multilingual
- UI strings: `src/constants/languages.ts` (static, 3 languages: en/fr/ko)
- Content: fetched from DB with language fallback via `translation_group_id`
- Language state: Zustand store in `useLanguage`, persisted to AsyncStorage

## Coding Conventions

- TypeScript strict mode is on — no `any` unless truly unavoidable
- Prefer named exports for components and hooks
- Use `import type` for type-only imports
- File naming: PascalCase for components, camelCase for hooks/services/utils
- Keep imports relative (`../../src/...`) — no path aliases configured

## Environment Variables

Prefixed with `EXPO_PUBLIC_` to be accessible in the client bundle:
- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`

Never commit `.env` (it is gitignored). Use `.env.example` as reference.

## Git Practices

- Commit messages: short, imperative, focused on "why"
- Do not commit `.env`, `node_modules/`, or generated native folders (`/ios`, `/android`)
- Prefer small, focused commits over large batches
