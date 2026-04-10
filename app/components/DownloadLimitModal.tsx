'use client';

import React from 'react';
import { Zap, Check } from 'lucide-react';

interface DownloadLimitModalProps {
  isOpen: boolean;
  downloadsUsed: number;
  remainingDownloads: number;
  onUpgrade: () => void;
  onClose: () => void;
}

export const DownloadLimitModal: React.FC<DownloadLimitModalProps> = ({
  isOpen,
  downloadsUsed,
  remainingDownloads,
  onUpgrade,
  onClose,
}) => {
  if (!isOpen) return null;

  const isPremiumPrompt = remainingDownloads === 0;

  if (isPremiumPrompt) {
    return (
      <dialog className="modal modal-open">
        <div className="modal-box w-full max-w-md">
          <h3 className="font-bold text-lg mb-2">🎉 Unlock Unlimited Downloads!</h3>
          <p className="text-sm text-gray-600 mb-4">
            You&apos;ve used your {downloadsUsed} free PDF downloads. Upgrade to Premium to export unlimited CVs and access advanced features.
          </p>

          {/* Pricing Plans */}
          <div className="space-y-3 mb-6">
            {/* Free Plan */}
            <div className="border border-gray-300 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold">Free Plan</h4>
                <span className="text-xs text-gray-500">Current</span>
              </div>
              <ul className="text-sm space-y-1 text-gray-700">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  2 PDF downloads/month
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  13 templates
                </li>
              </ul>
            </div>

            {/* Premium Plan - Monthly */}
            <div className="border-2 border-primary rounded-lg p-4 bg-primary/5">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-primary">Premium - Monthly</h4>
                <span className="badge badge-primary">$4.99/mo</span>
              </div>
              <ul className="text-sm space-y-1 text-gray-700 mb-3">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  ✨ Unlimited downloads
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  Priority support
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  Cancel anytime
                </li>
              </ul>
              <button
                onClick={() => {
                  onUpgrade();
                  onClose();
                }}
                className="btn btn-primary btn-sm w-full"
              >
                <Zap className="w-4 h-4" />
                Upgrade Now
              </button>
            </div>

            {/* Premium Plan - Yearly */}
            <div className="border border-secondary rounded-lg p-4 bg-secondary/5">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-secondary">Premium - Yearly</h4>
                <span className="badge badge-secondary">$39.99/yr</span>
              </div>
              <ul className="text-sm space-y-1 text-gray-700 mb-3">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-secondary" />
                  ✨ Unlimited downloads
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-secondary" />
                  Priority support
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-secondary" />
                  Save 33% vs monthly
                </li>
              </ul>
              <button
                onClick={() => {
                  onUpgrade();
                  onClose();
                }}
                className="btn btn-secondary btn-sm w-full"
              >
                <Zap className="w-4 h-4" />
                Subscribe Yearly
              </button>
            </div>
          </div>

          <button
            onClick={onClose}
            className="btn btn-ghost btn-block btn-sm"
          >
            Maybe Later
          </button>
        </div>
        <form method="dialog" className="modal-backdrop" onClick={onClose}>
          <button>close</button>
        </form>
      </dialog>
    );
  }

  // Show info when user still has downloads
  return (
    <dialog className="modal modal-open">
      <div className="modal-box w-full max-w-md">
        <h3 className="font-bold text-lg mb-2">📊 Downloads Remaining</h3>
        <div className="bg-base-200 rounded-lg p-4 mb-4">
          <div className="text-center mb-3">
            <p className="text-sm text-gray-600">Free Downloads Used</p>
            <p className="text-4xl font-bold text-primary">{downloadsUsed}/2</p>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all"
              style={{ width: `${(downloadsUsed / 2) * 100}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-600 mt-2 text-center">
            {remainingDownloads} download{remainingDownloads !== 1 ? 's' : ''} remaining
          </p>
        </div>

        <div className="alert alert-info mb-4">
          <span className="text-sm">Upgrade to Premium for unlimited downloads!</span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm flex-1"
          >
            Close
          </button>
          <button
            onClick={() => {
              onUpgrade();
              onClose();
            }}
            className="btn btn-primary btn-sm flex-1"
          >
            <Zap className="w-4 h-4" />
            Upgrade
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop" onClick={onClose}>
        <button>close</button>
      </form>
    </dialog>
  );
};
