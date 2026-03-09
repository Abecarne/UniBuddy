import { useCallback, useEffect, useState } from 'react';
import {
  fetchSavedItems,
  saveItem,
  unsaveItem,
  isItemSaved,
} from '../services/contentService';
import type { SavedItem } from '../types/content';
import { useAuthStore } from './useAuth';

export function useSaved() {
  const [items, setItems] = useState<SavedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const session = useAuthStore((s) => s.session);
  const userId = session?.user?.id;

  const load = useCallback(async () => {
    if (!userId) {
      setItems([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const data = await fetchSavedItems(userId);
      setItems(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    load();
  }, [load]);

  const toggle = useCallback(
    async (contentId: string) => {
      if (!userId) return;
      const saved = await isItemSaved(userId, contentId);
      if (saved) {
        await unsaveItem(userId, contentId);
      } else {
        await saveItem(userId, contentId);
      }
      await load();
    },
    [userId, load]
  );

  return { items, loading, error, refresh: load, toggle };
}

export function useIsSaved(contentId: string) {
  const [saved, setSaved] = useState(false);
  const session = useAuthStore((s) => s.session);
  const userId = session?.user?.id;

  useEffect(() => {
    if (!userId || !contentId) return;
    isItemSaved(userId, contentId).then(setSaved);
  }, [userId, contentId]);

  return saved;
}
