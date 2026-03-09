import { useEffect } from 'react';
import { create } from 'zustand';
import { supabase } from '../services/supabase';
import { getProfile } from '../services/authService';
import type { Profile } from '../types/user';
import type { Session } from '@supabase/supabase-js';

interface AuthStore {
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  isAdmin: boolean;
  setSession: (session: Session | null) => void;
  loadProfile: (userId: string) => Promise<void>;
  clear: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  session: null,
  profile: null,
  loading: true,
  isAdmin: false,

  setSession: (session) => {
    set({ session, loading: false });
  },

  loadProfile: async (userId: string) => {
    const profile = await getProfile(userId);
    set({ profile, isAdmin: profile?.role === 'admin' });
  },

  clear: () => {
    set({ session: null, profile: null, isAdmin: false });
  },
}));

export function useAuthListener() {
  const { setSession, loadProfile, clear } = useAuthStore();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        loadProfile(session.user.id);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        loadProfile(session.user.id);
      } else {
        clear();
      }
    });

    return () => subscription.unsubscribe();
  }, [setSession, loadProfile, clear]);
}
