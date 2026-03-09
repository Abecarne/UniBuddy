import { useContent } from './useContent';

export function useAnnouncements(category?: string) {
  return useContent({ type: 'announcement', category });
}

export function useFeaturedAnnouncements(limit = 5) {
  return useContent({ type: 'announcement', featured: true, limit });
}
