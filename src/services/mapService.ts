import { supabase } from './supabase';
import type { MapLocation } from '../types/map';

export async function fetchMapLocations(
  campusCode?: string
): Promise<MapLocation[]> {
  let query = supabase
    .from('map_locations')
    .select('*')
    .order('name', { ascending: true });

  if (campusCode) query = query.eq('campus_code', campusCode);

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function fetchMapLocationById(
  id: string
): Promise<MapLocation | null> {
  const { data, error } = await supabase
    .from('map_locations')
    .select('*')
    .eq('id', id)
    .single();
  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return data;
}

export async function fetchMapLocationsByCategory(
  category: string,
  campusCode?: string
): Promise<MapLocation[]> {
  let query = supabase
    .from('map_locations')
    .select('*')
    .eq('category', category)
    .order('name', { ascending: true });

  if (campusCode) query = query.eq('campus_code', campusCode);

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}
