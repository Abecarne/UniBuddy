export const CATEGORIES = [
  { key: 'visa', label: 'Visa & Immigration', icon: '🛂' },
  { key: 'banking', label: 'Banking', icon: '🏦' },
  { key: 'insurance', label: 'Insurance', icon: '🛡️' },
  { key: 'campus', label: 'Campus Services', icon: '🏫' },
  { key: 'clubs', label: 'Clubs & Activities', icon: '🎭' },
  { key: 'cafeteria', label: 'Cafeterias', icon: '🍽️' },
  { key: 'transport', label: 'Transportation', icon: '🚌' },
  { key: 'apps', label: 'Useful Apps', icon: '📱' },
  { key: 'waste', label: 'Waste Sorting', icon: '♻️' },
  { key: 'safety', label: 'Safety Tips', icon: '🆘' },
] as const;

export type CategoryKey = (typeof CATEGORIES)[number]['key'];

export const AUDIENCES = [
  { key: 'all', label: 'All Students' },
  { key: 'new', label: 'New Students' },
  { key: 'exchange', label: 'Exchange Students' },
  { key: 'degree', label: 'Degree Students' },
  { key: 'graduate', label: 'Graduate Students' },
] as const;

export type AudienceKey = (typeof AUDIENCES)[number]['key'];

export const MAP_CATEGORIES = [
  { key: 'classroom', label: 'Classrooms', icon: '📚' },
  { key: 'library', label: 'Library', icon: '📖' },
  { key: 'cafeteria', label: 'Cafeteria', icon: '🍽️' },
  { key: 'admin', label: 'Administration', icon: '🏢' },
  { key: 'dormitory', label: 'Dormitory', icon: '🏠' },
  { key: 'international', label: 'International Office', icon: '🌍' },
  { key: 'sports', label: 'Sports', icon: '⚽' },
  { key: 'medical', label: 'Medical', icon: '🏥' },
] as const;
