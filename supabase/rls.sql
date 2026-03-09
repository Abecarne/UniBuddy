-- ============================================
-- UniBuddy PoC - Row Level Security Policies
-- Run this AFTER schema.sql in Supabase SQL Editor
-- ============================================

-- Enable RLS on all tables
alter table profiles enable row level security;
alter table content_items enable row level security;
alter table saved_items enable row level security;
alter table map_locations enable row level security;

-- ============================================
-- PROFILES
-- ============================================

-- Anyone can read profiles (needed for display)
create policy "Profiles are viewable by everyone"
  on profiles for select
  using (true);

-- Users can update their own profile
create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

-- ============================================
-- CONTENT_ITEMS
-- ============================================

-- Anyone can read published content (including anonymous)
create policy "Published content is viewable by everyone"
  on content_items for select
  using (status = 'published');

-- Admins can read all content (including drafts)
create policy "Admins can read all content"
  on content_items for select
  using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

-- Admins can insert content
create policy "Admins can create content"
  on content_items for insert
  with check (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

-- Admins can update content
create policy "Admins can update content"
  on content_items for update
  using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

-- Admins can delete content
create policy "Admins can delete content"
  on content_items for delete
  using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

-- ============================================
-- SAVED_ITEMS
-- ============================================

-- Users can read their own saved items
create policy "Users can read own saved items"
  on saved_items for select
  using (auth.uid() = user_id);

-- Users can save items
create policy "Users can save items"
  on saved_items for insert
  with check (auth.uid() = user_id);

-- Users can unsave items
create policy "Users can delete own saved items"
  on saved_items for delete
  using (auth.uid() = user_id);

-- ============================================
-- MAP_LOCATIONS
-- ============================================

-- Anyone can read map locations (including anonymous)
create policy "Map locations are viewable by everyone"
  on map_locations for select
  using (true);

-- Admins can manage map locations
create policy "Admins can manage map locations"
  on map_locations for all
  using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );
