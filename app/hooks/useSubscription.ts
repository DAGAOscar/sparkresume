import { useEffect, useState } from 'react';
import { getRemainingDownloads, canUserDownload, getUserSubscription, getDownloadCount } from '@/app/lib/subscriptionService';
import type { UserSubscription } from '@/app/lib/subscriptionService';

export function useSubscription() {
  const [remainingDownloads, setRemainingDownloads] = useState<number>(2);
  const [canDownload, setCanDownload] = useState<boolean>(true);
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [downloadCount, setDownloadCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [remaining, canDl, sub, count] = await Promise.all([
          getRemainingDownloads(),
          canUserDownload(),
          getUserSubscription(),
          getDownloadCount(),
        ]);

        setRemainingDownloads(remaining);
        setCanDownload(canDl);
        setSubscription(sub);
        setDownloadCount(count);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching subscription data');
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionData();
  }, []);

  const refreshSubscription = async () => {
    try {
      const [remaining, canDl, sub, count] = await Promise.all([
        getRemainingDownloads(),
        canUserDownload(),
        getUserSubscription(),
        getDownloadCount(),
      ]);

      setRemainingDownloads(remaining);
      setCanDownload(canDl);
      setSubscription(sub);
      setDownloadCount(count);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error refreshing subscription data');
    }
  };

  return {
    remainingDownloads,
    canDownload,
    subscription,
    downloadCount,
    loading,
    error,
    refreshSubscription,
  };
}
