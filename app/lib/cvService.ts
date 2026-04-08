import { supabase } from './supabase';
import { CVData } from '@/app/utils/templates';

// ============================================
// CV Service - Manage user's CVs
// ============================================

export interface CV {
  id: string;
  user_id: string;
  name: string;
  template_id: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Fetch all CVs for the current user
 */
export async function getUserCVs(): Promise<CV[]> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('cvs')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error('Error fetching CVs:', err);
    return [];
  }
}

/**
 * Create a new CV
 */
export async function createCV(name: string, templateId: number = 1): Promise<CV | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('cvs')
      .insert([
        {
          user_id: user.id,
          name,
          template_id: templateId,
          is_active: false,
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Error creating CV:', err);
    return null;
  }
}

/**
 * Update CV metadata
 */
export async function updateCV(cvId: string, updates: Partial<CV>): Promise<CV | null> {
  try {
    const { data, error } = await supabase
      .from('cvs')
      .update(updates)
      .eq('id', cvId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Error updating CV:', err);
    return null;
  }
}

/**
 * Delete a CV and its associated data
 */
export async function deleteCV(cvId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('cvs')
      .delete()
      .eq('id', cvId);

    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Error deleting CV:', err);
    return false;
  }
}

// ============================================
// CV Data Service - Manage CV content
// ============================================

export interface CVDataRecord {
  id: string;
  cv_id: string;
  personal_details: Record<string, unknown> | null;
  experiences: Record<string, unknown>[] | null;
  educations: Record<string, unknown>[] | null;
  skills: Record<string, unknown>[] | null;
  languages: Record<string, unknown>[] | null;
  certifications: Record<string, unknown>[] | null;
  projects: Record<string, unknown>[] | null;
  links: Record<string, unknown>[] | null;
  hobbies: Record<string, unknown>[] | null;
  awards: Record<string, unknown>[] | null;
  courses: Record<string, unknown>[] | null;
  organizations: Record<string, unknown>[] | null;
  publications: Record<string, unknown>[] | null;
  references: Record<string, unknown>[] | null;
  interests: Record<string, unknown>[] | null;
  declaration: Record<string, unknown> | null;
  updated_at: string;
}

/**
 * Fetch CV data for a specific CV
 */
export async function getCVData(cvId: string): Promise<CVDataRecord | null> {
  try {
    const { data, error } = await supabase
      .from('cv_data')
      .select('*')
      .eq('cv_id', cvId)
      .single();

    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Error fetching CV data:', err);
    return null;
  }
}

/**
 * Save CV data (create or update)
 */
export async function saveCVData(cvId: string, cvData: CVData): Promise<CVDataRecord | null> {
  try {
    // Check if CV data exists
    const existing = await getCVData(cvId);

    const payload = {
      personal_details: cvData.name ? { name: cvData.name, email: cvData.email, phone: cvData.phone, location: cvData.location, summary: cvData.summary } : null,
      experiences: cvData.experience || [],
      educations: cvData.education || [],
      skills: cvData.skills || [],
      languages: cvData.languages || [],
      certifications: cvData.certifications || [],
      projects: cvData.projects || [],
      links: cvData.links || [],
    };

    if (existing) {
      // Update existing
      const { data, error } = await supabase
        .from('cv_data')
        .update(payload)
        .eq('cv_id', cvId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } else {
      // Create new
      const { data, error } = await supabase
        .from('cv_data')
        .insert([
          {
            cv_id: cvId,
            ...payload,
          }
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    }
  } catch (err) {
    console.error('Error saving CV data:', err);
    return null;
  }
}

// ============================================
// Template Tracking Service
// ============================================

/**
 * Track template usage
 */
export async function trackTemplateUsage(templateId: number): Promise<boolean> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    // Check if template usage record exists
    const { data: existing } = await supabase
      .from('templates_used')
      .select('*')
      .eq('user_id', user.id)
      .eq('template_id', templateId)
      .single();

    if (existing) {
      // Update existing
      await supabase
        .from('templates_used')
        .update({
          used_count: (existing.used_count || 0) + 1,
          last_used: new Date().toISOString(),
        })
        .eq('id', existing.id);
    } else {
      // Create new record
      await supabase
        .from('templates_used')
        .insert([
          {
            user_id: user.id,
            template_id: templateId,
            used_count: 1,
          }
        ]);
    }

    return true;
  } catch (err) {
    console.error('Error tracking template usage:', err);
    return false;
  }
}
