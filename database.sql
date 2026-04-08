-- ============================================
-- SparkResume Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Create profiles table (linked to auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create CVs table
CREATE TABLE cvs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  template_id INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create CV data table (stores actual CV content)
CREATE TABLE cv_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cv_id UUID REFERENCES cvs(id) ON DELETE CASCADE NOT NULL UNIQUE,
  personal_details JSONB,
  experiences JSONB,
  educations JSONB,
  skills JSONB,
  languages JSONB,
  certifications JSONB,
  projects JSONB,
  links JSONB,
  hobbies JSONB,
  awards JSONB,
  courses JSONB,
  organizations JSONB,
  publications JSONB,
  "references" JSONB,
  interests JSONB,
  declaration JSONB,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Create templates usage tracking table
CREATE TABLE templates_used (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  template_id INTEGER NOT NULL,
  used_count INTEGER DEFAULT 1,
  last_used TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- ROW LEVEL SECURITY (RLS) - Protect user data
-- ============================================

-- 1. Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE cvs ENABLE ROW LEVEL SECURITY;
ALTER TABLE cv_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates_used ENABLE ROW LEVEL SECURITY;

-- 2. Profiles: Users can only read/update their own profile
CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Allow trigger to create profile on signup"
  ON profiles FOR INSERT
  WITH CHECK (true);

-- 3. CVs: Users can only access their own CVs
CREATE POLICY "Users can view their own CVs"
  ON cvs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create CVs"
  ON cvs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own CVs"
  ON cvs FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own CVs"
  ON cvs FOR DELETE
  USING (auth.uid() = user_id);

-- 4. CV_data: Users can only access CV data for their own CVs
CREATE POLICY "Users can view their own CV data"
  ON cv_data FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM cvs WHERE cvs.id = cv_data.cv_id AND cvs.user_id = auth.uid()
  ));

CREATE POLICY "Users can create CV data for their CVs"
  ON cv_data FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM cvs WHERE cvs.id = cv_data.cv_id AND cvs.user_id = auth.uid()
  ));

CREATE POLICY "Users can update their own CV data"
  ON cv_data FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM cvs WHERE cvs.id = cv_data.cv_id AND cvs.user_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM cvs WHERE cvs.id = cv_data.cv_id AND cvs.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete their own CV data"
  ON cv_data FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM cvs WHERE cvs.id = cv_data.cv_id AND cvs.user_id = auth.uid()
  ));

-- 5. Templates: Users can only access their own template usage
CREATE POLICY "Users can view their template usage"
  ON templates_used FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create template usage records"
  ON templates_used FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their template usage"
  ON templates_used FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- Indexes for better performance
-- ============================================

CREATE INDEX idx_cvs_user_id ON cvs(user_id);
CREATE INDEX idx_cvs_created_at ON cvs(created_at DESC);
CREATE INDEX idx_cv_data_cv_id ON cv_data(cv_id);
CREATE INDEX idx_templates_used_user_id ON templates_used(user_id);
CREATE INDEX idx_templates_used_last_used ON templates_used(last_used DESC);

-- ============================================
-- Function to create profile on user signup
-- ============================================

CREATE OR REPLACE FUNCTION create_profile_on_signup()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_profile_on_signup();
