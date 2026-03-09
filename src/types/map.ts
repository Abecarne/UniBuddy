export interface MapLocation {
  id: string;
  campus_code: string | null;
  name: string;
  category: string | null;
  description: string | null;
  image_url: string | null;
  map_x: number | null;
  map_y: number | null;
  building_code: string | null;
  created_at: string;
}
