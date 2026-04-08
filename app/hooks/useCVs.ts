import { useState, useEffect } from 'react';
import { getUserCVs, createCV, updateCV, deleteCV, getCVData, saveCVData, trackTemplateUsage } from '@/app/lib/cvService';
import { CVData } from '@/app/utils/templates';
import type { CV, CVDataRecord } from '@/app/lib/cvService';

/**
 * Hook to manage CVs for the current user
 */
export function useCVs() {
  const [cvs, setCvs] = useState<CV[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial CVs
  useEffect(() => {
    fetchCVs();
  }, []);

  async function fetchCVs() {
    try {
      setLoading(true);
      setError(null);
      const data = await getUserCVs();
      setCvs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch CVs');
    } finally {
      setLoading(false);
    }
  }

  async function addCV(name: string, templateId: number = 1) {
    try {
      setError(null);
      const newCV = await createCV(name, templateId);
      if (newCV) {
        setCvs([newCV, ...cvs]);
        return newCV;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create CV');
    }
    return null;
  }

  async function updateCVItem(cvId: string, updates: Partial<CV>) {
    try {
      setError(null);
      const updated = await updateCV(cvId, updates);
      if (updated) {
        setCvs(cvs.map(cv => cv.id === cvId ? updated : cv));
        return updated;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update CV');
    }
    return null;
  }

  async function removeCVItem(cvId: string) {
    try {
      setError(null);
      const success = await deleteCV(cvId);
      if (success) {
        setCvs(cvs.filter(cv => cv.id !== cvId));
        return true;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete CV');
    }
    return false;
  }

  return {
    cvs,
    loading,
    error,
    fetchCVs,
    addCV,
    updateCVItem,
    removeCVItem,
  };
}

/**
 * Hook to manage CV data
 */
export function useCVData(cvId: string | null) {
  const [cvData, setCVData] = useState<CVDataRecord | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch CV data when cvId changes
  useEffect(() => {
    if (!cvId) return;

    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getCVData(cvId);
        setCVData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch CV data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [cvId]);

  async function refetch() {
    if (!cvId) return;
    try {
      setLoading(true);
      setError(null);
      const data = await getCVData(cvId);
      setCVData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch CV data');
    } finally {
      setLoading(false);
    }
  }

  async function saveCVContent(data: CVData) {
    if (!cvId) return null;
    try {
      setError(null);
      const saved = await saveCVData(cvId, data);
      if (saved) {
        setCVData(saved);
        return saved;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save CV data');
    }
    return null;
  }

  return {
    cvData,
    loading,
    error,
    saveCVContent,
    refetch,
  };
}

/**
 * Hook to track template usage
 */
export function useTemplateTracking() {
  const trackUsage = async (templateId: number) => {
    try {
      await trackTemplateUsage(templateId);
    } catch (err) {
      console.error('Failed to track template usage:', err);
    }
  };

  return { trackUsage };
}
