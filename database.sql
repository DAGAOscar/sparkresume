-- ============================================
-- SparkResume Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- Clean up first (safe to run multiple times)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS create_profile_on_signup();
DROP TABLE IF EXISTS templates_used CASCADE;
DROP TABLE IF EXISTS cv_data CASCADE;
DROP TABLE IF EXISTS cvs CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- 1. Create profiles table (linked to auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create CVs table
CREATE TABLE IF NOT EXISTS cvs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  template_id INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create CV data table (stores actual CV content)
CREATE TABLE IF NOT EXISTS cv_data (
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
CREATE TABLE IF NOT EXISTS templates_used (
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
-- Drop old policies first
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
DROP POLICY IF EXISTS "Allow trigger to create profile on signup" ON profiles;
DROP POLICY IF EXISTS "Allow insert for signup" ON profiles;

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Very permissive INSERT policy for signup and trigger
CREATE POLICY "Allow insert for anyone"
  ON profiles FOR INSERT
  WITH CHECK (true);

-- 3. CVs: Users can only access their own CVs
DROP POLICY IF EXISTS "Users can view their own CVs" ON cvs;
DROP POLICY IF EXISTS "Users can create CVs" ON cvs;
DROP POLICY IF EXISTS "Users can update their own CVs" ON cvs;
DROP POLICY IF EXISTS "Users can delete their own CVs" ON cvs;

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
DROP POLICY IF EXISTS "Users can view their own CV data" ON cv_data;
DROP POLICY IF EXISTS "Users can create CV data for their CVs" ON cv_data;
DROP POLICY IF EXISTS "Users can update their own CV data" ON cv_data;
DROP POLICY IF EXISTS "Users can delete their own CV data" ON cv_data;

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
DROP POLICY IF EXISTS "Users can view their template usage" ON templates_used;
DROP POLICY IF EXISTS "Users can create template usage records" ON templates_used;
DROP POLICY IF EXISTS "Users can update their template usage" ON templates_used;

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

CREATE INDEX IF NOT EXISTS idx_cvs_user_id ON cvs(user_id);
CREATE INDEX IF NOT EXISTS idx_cvs_created_at ON cvs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_cv_data_cv_id ON cv_data(cv_id);
CREATE INDEX IF NOT EXISTS idx_templates_used_user_id ON templates_used(user_id);
CREATE INDEX IF NOT EXISTS idx_templates_used_last_used ON templates_used(last_used DESC);

-- ============================================
-- Function to create profile on user signup
-- ============================================

-- Drop old version if exists
DROP FUNCTION IF EXISTS public.create_profile_on_signup() CASCADE;

-- Create improved function with better error handling
CREATE OR REPLACE FUNCTION public.create_profile_on_signup()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  -- Insert profile for new auth user
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email)
  ON CONFLICT (id) DO NOTHING;
  
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- Log error but don't fail the auth signup
  RAISE WARNING 'Error creating profile for user %: %', NEW.id, SQLERRM;
  RETURN NEW;
END;
$$;

-- Drop old trigger if exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users CASCADE;

-- Create trigger with proper settings
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.create_profile_on_signup();
