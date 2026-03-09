import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEFAULT_LANGUAGE, UI_STRINGS } from '../constants/languages';
import type { LanguageCode } from '../constants/languages';

const LANGUAGE_KEY = 'unibuddy_language';

interface LanguageStore {
  language: LanguageCode;
  loaded: boolean;
  setLanguage: (lang: LanguageCode) => void;
  loadLanguage: () => Promise<void>;
  t: (key: string) => string;
}

export const useLanguage = create<LanguageStore>((set, get) => ({
  language: DEFAULT_LANGUAGE,
  loaded: false,

  setLanguage: (lang: LanguageCode) => {
    set({ language: lang });
    AsyncStorage.setItem(LANGUAGE_KEY, lang);
  },

  loadLanguage: async () => {
    const stored = await AsyncStorage.getItem(LANGUAGE_KEY);
    if (stored && (stored === 'en' || stored === 'fr' || stored === 'ko')) {
      set({ language: stored, loaded: true });
    } else {
      set({ loaded: true });
    }
  },

  t: (key: string) => {
    const { language } = get();
    return UI_STRINGS[language]?.[key] ?? UI_STRINGS.en[key] ?? key;
  },
}));
