import { supabase } from './supabase';
import type { ContentItem, ContentType, SavedItem } from '../types/content';

interface FetchContentOptions {
  type?: ContentType;
  category?: string;
  audience?: string;
  language?: string;
  search?: string;
  featured?: boolean;
  limit?: number;
  status?: 'published' | 'draft';
}

export async function fetchContent(
  options: FetchContentOptions = {}
): Promise<ContentItem[]> {
  let query = supabase
    .from('content_items')
    .select('*')
    .order('created_at', { ascending: false });

  if (options.status) {
    query = query.eq('status', options.status);
  } else {
    query = query.eq('status', 'published');
  }

  if (options.type) query = query.eq('type', options.type);
  if (options.category) query = query.eq('category', options.category);
  if (options.audience)
    query = query.or(`audience.eq.${options.audience},audience.eq.all`);
  if (options.language) query = query.eq('language_code', options.language);
  if (options.featured) query = query.eq('is_featured', true);
  if (options.limit) query = query.limit(options.limit);
  if (options.search)
    query = query.or(
      `title.ilike.%${options.search}%,summary.ilike.%${options.search}%`
    );

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function fetchContentById(id: string): Promise<ContentItem | null> {
  const { data, error } = await supabase
    .from('content_items')
    .select('*')
    .eq('id', id)
    .single();
  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return data;
}

export async function fetchContentWithFallback(
  id: string,
  language: string
): Promise<ContentItem | null> {
  const item = await fetchContentById(id);
  if (!item) return null;

  if (item.language_code === language) return item;

  if (item.translation_group_id) {
    const { data } = await supabase
      .from('content_items')
      .select('*')
      .eq('translation_group_id', item.translation_group_id)
      .eq('language_code', language)
      .eq('status', 'published')
      .single();
    if (data) return data;
  }

  return item;
}

export async function fetchRelatedContent(
  item: ContentItem,
  limit = 3
): Promise<ContentItem[]> {
  const { data, error } = await supabase
    .from('content_items')
    .select('*')
    .eq('status', 'published')
    .eq('category', item.category)
    .eq('language_code', item.language_code)
    .neq('id', item.id)
    .limit(limit);
  if (error) throw error;
  return data ?? [];
}

export async function fetchAllContent(): Promise<ContentItem[]> {
  const { data, error } = await supabase
    .from('content_items')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function createContent(
  item: Omit<ContentItem, 'id' | 'created_at' | 'updated_at'>
): Promise<ContentItem> {
  const { data, error } = await supabase
    .from('content_items')
    .insert(item)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateContent(
  id: string,
  updates: Partial<ContentItem>
): Promise<ContentItem> {
  const { data, error } = await supabase
    .from('content_items')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteContent(id: string): Promise<void> {
  const { error } = await supabase.from('content_items').delete().eq('id', id);
  if (error) throw error;
}

export async function togglePublish(item: ContentItem): Promise<ContentItem> {
  const newStatus = item.status === 'published' ? 'draft' : 'published';
  return updateContent(item.id, { status: newStatus });
}

// Saved items
export async function fetchSavedItems(userId: string): Promise<SavedItem[]> {
  const { data, error } = await supabase
    .from('saved_items')
    .select('*, content_items(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function saveItem(
  userId: string,
  contentId: string
): Promise<void> {
  const { error } = await supabase
    .from('saved_items')
    .insert({ user_id: userId, content_id: contentId });
  if (error) throw error;
}

export async function unsaveItem(
  userId: string,
  contentId: string
): Promise<void> {
  const { error } = await supabase
    .from('saved_items')
    .delete()
    .eq('user_id', userId)
    .eq('content_id', contentId);
  if (error) throw error;
}

export async function isItemSaved(
  userId: string,
  contentId: string
): Promise<boolean> {
  const { data, error } = await supabase
    .from('saved_items')
    .select('id')
    .eq('user_id', userId)
    .eq('content_id', contentId)
    .maybeSingle();
  if (error) throw error;
  return !!data;
}
