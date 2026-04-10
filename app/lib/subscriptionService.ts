import { supabase } from './supabase';

export interface DownloadRecord {
  id: string;
  user_id: string;
  cv_id: string;
  file_name: string;
  downloaded_at: string;
}

export interface UserSubscription {
  subscription_tier: string;
  pdf_downloads_count: number;
  subscription_expires_at: string | null;
}

const MAX_FREE_DOWNLOADS = 2;

/**
 * Track a PDF download for the current user
 */
export async function trackPdfDownload(cvId: string, fileName: string): Promise<{ success: boolean; message: string }> {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user?.id) {
      return { success: false, message: 'Not authenticated' };
    }

    // Insert download record
    const { error } = await supabase
      .from('pdf_downloads')
      .insert({
        user_id: session.user.id,
        cv_id: cvId,
        file_name: fileName,
      });

    if (error) throw error;

    // Update download count in user profile
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ pdf_downloads_count: await getDownloadCount(session.user.id) + 1 })
      .eq('id', session.user.id);

    if (updateError) throw updateError;

    return { success: true, message: 'Download tracked successfully' };
  } catch (error) {
    console.error('Error tracking PDF download:', error);
    return { success: false, message: 'Failed to track download' };
  }
}

/**
 * Get the total number of PDF downloads for the current user
 */
export async function getDownloadCount(userId?: string): Promise<number> {
  try {
    let targetUserId = userId;

    if (!targetUserId) {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user?.id) return 0;
      targetUserId = session.user.id;
    }

    const { data, error } = await supabase
      .from('pdf_downloads')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', targetUserId);

    if (error) throw error;
    return data?.length || 0;
  } catch (error) {
    console.error('Error getting download count:', error);
    return 0;
  }
}

/**
 * Get remaining free downloads for the current user
 */
export async function getRemainingDownloads(userId?: string): Promise<number> {
  try {
    let targetUserId = userId;

    if (!targetUserId) {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user?.id) return MAX_FREE_DOWNLOADS;
      targetUserId = session.user.id;
    }

    // Get user's subscription info
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('subscription_tier, pdf_downloads_count, subscription_expires_at')
      .eq('id', targetUserId)
      .single();

    if (profileError) throw profileError;

    // Premium users have unlimited downloads
    if (profile?.subscription_tier === 'premium') {
      return Infinity;
    }

    // Free users have 2 downloads
    const downloadCount = profile?.pdf_downloads_count || 0;
    return Math.max(0, MAX_FREE_DOWNLOADS - downloadCount);
  } catch (error) {
    console.error('Error getting remaining downloads:', error);
    return 0;
  }
}

/**
 * Check if user can download (free users: max 2, premium: unlimited)
 */
export async function canUserDownload(userId?: string): Promise<boolean> {
  const remaining = await getRemainingDownloads(userId);
  return remaining > 0 || remaining === Infinity;
}

/**
 * Get user subscription details
 */
export async function getUserSubscription(userId?: string): Promise<UserSubscription | null> {
  try {
    let targetUserId = userId;

    if (!targetUserId) {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user?.id) return null;
      targetUserId = session.user.id;
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('subscription_tier, pdf_downloads_count, subscription_expires_at')
      .eq('id', targetUserId)
      .single();

    if (error) throw error;
    return data as UserSubscription;
  } catch (error) {
    console.error('Error getting user subscription:', error);
    return null;
  }
}

/**
 * Get download history for the current user
 */
export async function getDownloadHistory(limit: number = 10): Promise<DownloadRecord[]> {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user?.id) return [];

    const { data, error } = await supabase
      .from('pdf_downloads')
      .select('*')
      .eq('user_id', session.user.id)
      .order('downloaded_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return (data as DownloadRecord[]) || [];
  } catch (error) {
    console.error('Error getting download history:', error);
    return [];
  }
}

/**
 * Upgrade user to premium subscription
 */
export async function upgradeToPremium(userId: string, expiresIn: 30 | 365 = 30): Promise<{ success: boolean; message: string }> {
  try {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + expiresIn);

    const { error } = await supabase
      .from('profiles')
      .update({
        subscription_tier: 'premium',
        subscription_expires_at: expiryDate.toISOString(),
        pdf_downloads_count: 0, // Reset count for premium
      })
      .eq('id', userId);

    if (error) throw error;
    return { success: true, message: 'Successfully upgraded to premium' };
  } catch (error) {
    console.error('Error upgrading to premium:', error);
    return { success: false, message: 'Failed to upgrade subscription' };
  }
}
