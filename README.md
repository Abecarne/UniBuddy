# UniBuddy - International Student Support App (PoC)

A mobile PoC for a white-label international student onboarding and campus-life assistant, starting with Keimyung University in South Korea.

## What it does

- **Students** can browse campus announcements, practical guides, campus map, and save useful content
- **Admins** can create, publish, and manage content
- **Multilingual** support with English, French, and Korean
- **Language fallback** to English when translation is not available

## Tech Stack

- **Frontend**: React Native + Expo + TypeScript + Expo Router
- **Backend**: Supabase (Auth + Postgres + RLS)
- **State**: Zustand (language) + React hooks

## Project Structure

```
mobile-app/
├── app/                    # Expo Router screens
│   ├── (tabs)/             # Student tab screens
│   │   ├── home.tsx
│   │   ├── guides.tsx
│   │   ├── map.tsx
│   │   ├── saved.tsx
│   │   └── profile.tsx
│   ├── admin/              # Admin screens
│   │   ├── dashboard.tsx
│   │   ├── create-post.tsx
│   │   ├── create-guide.tsx
│   │   └── manage-content.tsx
│   ├── content/[id].tsx    # Content detail
│   ├── auth/sign-in.tsx    # Sign in
│   └── _layout.tsx         # Root layout
├── src/
│   ├── components/         # Reusable UI components
│   ├── constants/          # Theme, categories, languages
│   ├── hooks/              # Data fetching hooks
│   ├── services/           # Supabase service layer
│   └── types/              # TypeScript types
└── supabase/               # SQL files
    ├── schema.sql
    ├── rls.sql
    └── seed.sql
```

## Setup

### Prerequisites

- Node.js 18+ (LTS recommended)
- pnpm package manager
- Expo Go app on your phone (for quick testing)
- A Supabase account (free tier works)

### 1. Install dependencies

```bash
cd mobile-app
pnpm install
```

### 2. Set up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to initialize
3. Go to **SQL Editor** and run the SQL files in this order:
   - `supabase/schema.sql` — creates tables and indexes
   - `supabase/rls.sql` — sets up Row Level Security policies
   - `supabase/seed.sql` — inserts demo content
4. Copy your project URL and anon key from **Settings > API**

### 3. Create an admin user

1. In your Supabase dashboard, go to **Authentication > Users**
2. Click **Add user** > **Create new user**
3. Enter email (e.g., `admin@unibuddy.app`) and a password
4. After the user is created, go to **Table Editor > profiles**
5. Find the row for your admin user and change `role` from `student` to `admin`

### 4. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` and fill in your Supabase credentials:

```
EXPO_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJ...your-anon-key
```

### 5. Run the app

```bash
npx expo start
```

#### Option A: Expo Go (fastest)
- Install **Expo Go** on your phone (iOS App Store / Google Play)
- Scan the QR code from the terminal
- The app opens on your phone

#### Option B: iOS Simulator (Mac only)
- Install Xcode from the App Store
- Press `i` in the terminal to open iOS Simulator

#### Option C: Android Emulator
- Install Android Studio
- Set up an Android Virtual Device (AVD)
- Press `a` in the terminal to open the emulator

## Testing the app

### As a student (guest)
1. Open the app — you land on the Home screen
2. Browse announcements and quick access categories
3. Tap a guide to see the detail
4. Switch language using the language button (top right)
5. Go to Profile > Sign In to save content

### As an admin
1. Go to Profile > Sign In
2. Enter your admin credentials
3. Go to Profile > Admin Dashboard
4. Create announcements and guides
5. Manage content (publish/unpublish/delete)

### Test language fallback
1. Switch to French — French-translated content appears
2. Content without French translation falls back to English
3. Switch to Korean — Korean content appears where available

## Demo Data

The seed data includes:
- 4 announcements (EN) + 2 French + 1 Korean translations
- 8 practical guides (EN) + 2 French + 1 Korean translations
- 15 campus map locations
- Categories: visa, banking, insurance, campus, clubs, cafeteria, transport, apps, waste, safety

## Database Schema

| Table | Purpose |
|-------|---------|
| `profiles` | User profiles with role (admin/student) |
| `content_items` | Announcements and guides with translations |
| `saved_items` | User bookmarked content |
| `map_locations` | Campus building locations |

Translations share a `translation_group_id` — same content in different languages links together via this UUID.

## Architecture Decisions

- **Expo Router** for file-based routing (simpler than React Navigation config)
- **Supabase** for auth, database, and RLS (no custom backend needed)
- **Zustand** for language state only (minimal global state)
- **No Redux, GraphQL, or custom server** — kept simple for PoC
- **Translation via DB rows** — no AI translation pipeline, just manual seed data
- **Campus map as building list** — no interactive map for PoC, proven by searchable list
