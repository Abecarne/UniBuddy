import { useCallback, useEffect, useState } from 'react';
import {
  fetchContent,
  fetchContentById,
  fetchContentWithFallback,
  fetchRelatedContent,
  fetchAllContent,
} from '../services/contentService';
import type { ContentItem, ContentType } from '../types/content';
import { useLanguage } from './useLanguage';

interface UseContentOptions {
  type?: ContentType;
  category?: string;
  audience?: string;
  search?: string;
  featured?: boolean;
  limit?: number;
}

export function useContent(options: UseContentOptions = {}) {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const language = useLanguage((s) => s.language);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchContent({ ...options, language });
      let fallbackData: ContentItem[] = [];
      if (language !== 'en') {
        fallbackData = await fetchContent({ ...options, language: 'en' });
      }
      const merged = mergeWithFallback(data, fallbackData);
      setItems(merged);
    } catch (e: any) {
      setError(e.message ?? 'Failed to load content');
    } finally {
      setLoading(false);
    }
  }, [
    language,
    options.type,
    options.category,
    options.audience,
    options.search,
    options.featured,
    options.limit,
  ]);

  useEffect(() => {
    load();
  }, [load]);

  return { items, loading, error, refresh: load };
}

function mergeWithFallback(
  primary: ContentItem[],
  fallback: ContentItem[]
): ContentItem[] {
  if (fallback.length === 0) return primary;

  const primaryGroupIds = new Set(
    primary
      .map((i) => i.translation_group_id)
      .filter(Boolean)
  );
  const primaryIds = new Set(primary.map((i) => i.id));

  const extras = fallback.filter(
    (f) =>
      !primaryIds.has(f.id) &&
      (!f.translation_group_id || !primaryGroupIds.has(f.translation_group_id))
  );

  return [...primary, ...extras];
}

export function useContentDetail(id: string | undefined) {
  const [item, setItem] = useState<ContentItem | null>(null);
  const [related, setRelated] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const language = useLanguage((s) => s.language);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    fetchContentWithFallback(id, language)
      .then(async (data) => {
        setItem(data);
        if (data) {
          const rel = await fetchRelatedContent(data);
          setRelated(rel);
        }
      })
      .catch((e: any) => setError(e.message ?? 'Failed to load'))
      .finally(() => setLoading(false));
  }, [id, language]);

  return { item, related, loading, error };
}

export function useAllContent() {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAllContent();
      setItems(data);
    } catch (e: any) {
      setError(e.message ?? 'Failed to load');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { items, loading, error, refresh: load };
}
