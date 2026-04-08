'use client';

import React, { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { CVData } from '@/app/utils/templates';
import { getTemplateById, getTemplateInfo } from '@/app/components/templates';
import { Printer, Download, LogIn } from 'lucide-react';
import { supabase } from '@/app/lib/supabase';

interface A4TemplatePreviewProps {
  cvData: CVData;
  selectedTemplate: number;
}

export default function A4TemplatePreview({
  cvData,
  selectedTemplate,
}: A4TemplatePreviewProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    // Check if user is logged in with Supabase
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };

    checkAuth();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription?.unsubscribe();
  }, []);

  const TemplateComponent = useMemo(
    () => getTemplateById(selectedTemplate),
    [selectedTemplate]
  );

  const templateInfo = useMemo(
    () => getTemplateInfo(selectedTemplate),
    [selectedTemplate]
  );

  const handleDownloadPDF = () => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }
    window.print();
  };

  return (
    <div className="w-full h-full flex flex-col bg-gray-100">
      {/* Header */}
      <div className="bg-white p-4 border-b shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg text-gray-900">
              {templateInfo?.name}
            </h3>
            <p className="text-sm text-gray-600">{templateInfo?.description}</p>
          </div>
          <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
            A4 Format
          </span>
        </div>
      </div>

      {/* A4 Page Preview */}
      <div className="flex-1 overflow-auto p-8 flex items-start justify-center">
        <div
          id="template-content"
          className="bg-white shadow-2xl overflow-hidden print:shadow-none"
          style={{
            width: '210mm',
            minHeight: '297mm',
            boxSizing: 'border-box',
          }}
        >
          {TemplateComponent && <TemplateComponent data={cvData} />}
        </div>
      </div>

      {/* Footer with actions */}
      <div className="bg-white border-t p-4 flex gap-2 justify-end">
        <button
          onClick={() => window.print()}
          className="btn btn-outline btn-sm gap-2"
        >
          <Printer size={16} />
          Print
        </button>
        <button
          onClick={handleDownloadPDF}
          className={"btn btn-sm gap-2 " + (isLoggedIn ? "btn-primary" : "btn-disabled")}
          title={isLoggedIn ? "Download PDF" : "You must be logged in to download"}
        >
          <Download size={16} />
          Download PDF
        </button>
      </div>

      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm mx-4">
            <div className="flex items-center gap-3 mb-4">
              <LogIn size={24} className="text-blue-600" />
              <h3 className="text-lg font-bold">Authentication Required</h3>
            </div>
            <p className="text-gray-600 mb-6">
              You must be logged in to download your CV. Please log in to your account to continue.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLoginPrompt(false)}
                className="btn btn-outline flex-1"
              >
                Cancel
              </button>
              <Link href="/login" className="btn btn-primary flex-1">
                Log In
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
