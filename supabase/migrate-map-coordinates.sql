-- Run this if you already have the old seed data with arbitrary map_x/map_y values.
-- This updates them to real GPS coordinates (longitude/latitude) for the satellite map.
-- After running this, map_x = longitude, map_y = latitude.

-- Option 1: Delete and re-seed
delete from map_locations where campus_code = 'keimyung';

-- Then re-run the map_locations section from seed.sql

-- Option 2: If you prefer, just drop and re-run the full seed:
-- truncate map_locations;
-- Then run seed.sql again.
