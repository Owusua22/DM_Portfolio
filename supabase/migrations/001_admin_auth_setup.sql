-- ============================================================
-- STEP 1: Create the admin user via the Supabase Dashboard
-- ============================================================
-- DO NOT run raw INSERTs into auth.users — the schema varies
-- between Supabase versions.
--
-- Instead:
--   1. Go to Supabase Dashboard → Authentication → Users
--   2. Click "Add user" → "Create new user"
--   3. Email:    admin@sarahnkansah.com
--   4. Password: ChangeMe@12345  (or your preferred password)
--   5. Check "Auto Confirm User" if available
--   6. Click "Create User"
--
-- This is the only safe way to create auth users across all
-- Supabase versions.
-- ============================================================


-- ============================================================
-- STEP 2: Run the RLS policies below in the SQL Editor
-- (Dashboard → SQL Editor → New query)
-- ============================================================

-- Projects
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read access" ON projects;
CREATE POLICY "Public read access" ON projects FOR SELECT USING (true);
DROP POLICY IF EXISTS "Authenticated write access" ON projects;
CREATE POLICY "Authenticated write access" ON projects FOR ALL USING (auth.role() = 'authenticated');

-- Case Studies
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read access on case_studies" ON case_studies;
CREATE POLICY "Public read access on case_studies" ON case_studies FOR SELECT USING (true);
DROP POLICY IF EXISTS "Authenticated write access on case_studies" ON case_studies;
CREATE POLICY "Authenticated write access on case_studies" ON case_studies FOR ALL USING (auth.role() = 'authenticated');

-- Graphic Designs
ALTER TABLE graphic_designs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read access on graphic_designs" ON graphic_designs;
CREATE POLICY "Public read access on graphic_designs" ON graphic_designs FOR SELECT USING (true);
DROP POLICY IF EXISTS "Authenticated write access on graphic_designs" ON graphic_designs;
CREATE POLICY "Authenticated write access on graphic_designs" ON graphic_designs FOR ALL USING (auth.role() = 'authenticated');

-- UGC Videos
ALTER TABLE ugc_videos ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read access on ugc_videos" ON ugc_videos;
CREATE POLICY "Public read access on ugc_videos" ON ugc_videos FOR SELECT USING (true);
DROP POLICY IF EXISTS "Authenticated write access on ugc_videos" ON ugc_videos;
CREATE POLICY "Authenticated write access on ugc_videos" ON ugc_videos FOR ALL USING (auth.role() = 'authenticated');

-- Gallery
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read access on gallery" ON gallery;
CREATE POLICY "Public read access on gallery" ON gallery FOR SELECT USING (true);
DROP POLICY IF EXISTS "Authenticated write access on gallery" ON gallery;
CREATE POLICY "Authenticated write access on gallery" ON gallery FOR ALL USING (auth.role() = 'authenticated');


-- ============================================================
-- STEP 3: Create storage buckets via the Dashboard
-- ============================================================
-- Go to Dashboard → Storage → New bucket for each:
--   - projects        (Public: Yes)
--   - case-studies    (Public: Yes)
--   - graphic-designs (Public: Yes)
--   - ugc-videos      (Public: Yes)
--   - gallery         (Public: Yes)
