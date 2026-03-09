export type ContentType = 'announcement' | 'guide';
export type ContentStatus = 'draft' | 'published';

export interface ContentItem {
  id: string;
  type: ContentType;
  status: ContentStatus;
  title: string;
  slug: string | null;
  summary: string | null;
  body: string | null;
  category: string | null;
  subcategory: string | null;
  audience: string | null;
  campus_code: string | null;
  language_code: string;
  translation_group_id: string | null;
  event_date: string | null;
  is_featured: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface SavedItem {
  id: string;
  user_id: string;
  content_id: string;
  created_at: string;
  content_items?: ContentItem;
}
