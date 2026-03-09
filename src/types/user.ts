export type UserRole = 'admin' | 'student';

export interface Profile {
  id: string;
  email: string;
  role: UserRole;
  full_name: string | null;
  campus_code: string | null;
  preferred_language: string;
  created_at: string;
}
