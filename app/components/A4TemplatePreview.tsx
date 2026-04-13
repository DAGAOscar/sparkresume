'use client';

import React, { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { CVData } from '@/app/utils/templates';
import { getTemplateById, getTemplateInfo } from '@/app/components/templates';
import { Download, LogIn } from 'lucide-react';
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

  const handleDownloadPDF = async () => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }
    
    try {
      console.log('[PDF] Starting PDF generation...');
      const element = document.getElementById('template-content');
      if (!element) {
        alert('Template content not found');
        return;
      }

      console.log('[PDF] Element found, importing libraries...');
      // Dynamically import both libraries
      const html2canvas = (await import('html2canvas-pro')).default;
      const jsPDF = (await import('jspdf')).jsPDF;
      console.log('[PDF] Libraries imported successfully');
      
      // Clone element to avoid modifying original
      console.log('[PDF] Cloning element...');
      const clonedElement = element.cloneNode(true) as HTMLElement;
      
      // Generate canvas with high quality
      console.log('[PDF] Converting to canvas...');
      let canvas;
      try {
        canvas = await html2canvas(clonedElement, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          logging: true,
          backgroundColor: '#ffffff',
          imageTimeout: 5000,
        });
        console.log('[PDF] Canvas created successfully', canvas.width, 'x', canvas.height);
      } catch (canvasError) {
        console.error('[PDF] Failed to convert to canvas:', canvasError);
        throw new Error(`Canvas conversion failed: ${canvasError instanceof Error ? canvasError.message : String(canvasError)}`);
      }

      console.log('[PDF] Creating PDF document...');
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' } as const);
      console.log('[PDF] Converting canvas to image...');
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      
      console.log('[PDF] Adding images to PDF (width:', imgWidth, ', height:', imgHeight, ')');
      let heightLeft = imgHeight;
      let position = 0;
      
      // Add first page
      pdf.addImage(imgData, 'JPEG' as const, 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
      
      // Add additional pages if needed
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG' as const, 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }
      
      console.log('[PDF] Saving PDF file...');
      const templateName = templateInfo?.name.replace(/\s+/g, '-').toLowerCase() || 'resume';
      pdf.save(`resume-${templateName}.pdf`);
      console.log('[PDF] PDF downloaded successfully');
    } catch (error) {
      console.error('Error generating PDF:', error);
      console.error('Error type:', typeof error);
      console.error('Error toString:', String(error));
      if (error instanceof Error) {
        console.error('Error stack:', error.stack);
      }
      const errorMessage = error instanceof Error ? error.message : String(error) || 'Unknown error';
      alert(`Error generating PDF: ${errorMessage}. Please check browser console for details.`);
    }
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
      <div className="flex-1 overflow-auto p-8 flex items-start justify-center bg-gray-100">
        <div
          id="template-content"
          className="bg-white shadow-2xl overflow-hidden print:shadow-none"
          style={{
            width: '210mm',
            minHeight: '297mm',
            boxSizing: 'border-box',
            pageBreakAfter: 'always',
          }}
        >
          {TemplateComponent && <TemplateComponent data={cvData} />}
        </div>
      </div>

      {/* Footer with actions */}
      <div className="bg-white border-t p-4 flex gap-2 justify-end">
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
