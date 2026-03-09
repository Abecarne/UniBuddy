-- ============================================
-- UniBuddy PoC - Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Profiles table
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  role text check (role in ('admin', 'student')) default 'student',
  full_name text,
  campus_code text,
  preferred_language text default 'en',
  created_at timestamp with time zone default now()
);

-- 2. Content items table (announcements + guides)
create table if not exists content_items (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('announcement', 'guide')),
  status text not null check (status in ('draft', 'published')) default 'draft',
  title text not null,
  slug text unique,
  summary text,
  body text,
  category text,
  subcategory text,
  audience text,
  campus_code text,
  language_code text default 'en',
  translation_group_id uuid,
  event_date timestamp with time zone,
  is_featured boolean default false,
  created_by uuid references profiles(id),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- 3. Saved items table
create table if not exists saved_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  content_id uuid references content_items(id) on delete cascade,
  created_at timestamp with time zone default now(),
  unique(user_id, content_id)
);

-- 4. Map locations table
create table if not exists map_locations (
  id uuid primary key default gen_random_uuid(),
  campus_code text,
  name text not null,
  category text,
  description text,
  image_url text,
  map_x numeric,
  map_y numeric,
  building_code text,
  created_at timestamp with time zone default now()
);

-- 5. Indexes
create index if not exists idx_content_type on content_items(type);
create index if not exists idx_content_status on content_items(status);
create index if not exists idx_content_category on content_items(category);
create index if not exists idx_content_language on content_items(language_code);
create index if not exists idx_content_translation on content_items(translation_group_id);
create index if not exists idx_saved_user on saved_items(user_id);
create index if not exists idx_map_campus on map_locations(campus_code);

-- 6. Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'student');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
