import { useContent } from './useContent';

export function useGuides(category?: string) {
  return useContent({ type: 'guide', category });
}
