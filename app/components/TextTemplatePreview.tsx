'use client';

import React from 'react';
import { CVData, CVTemplates } from '@/app/utils/templates';
import { Copy, Download } from 'lucide-react';

interface TextTemplatePreviewProps {
  templateId: number;
  cvData: CVData;
}

export default function TextTemplatePreview({
  templateId,
  cvData,
}: TextTemplatePreviewProps) {
  const template = CVTemplates.getTemplateById(templateId);
  const renderedCV = template ? template.render(cvData) : '';

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(renderedCV);
    alert('CV copied to clipboard!');
  };

  const handleDownloadText = () => {
    const element = document.createElement('a');
    const file = new Blob([renderedCV], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `cv_${templateId}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (!template) {
    return <div className="alert alert-error">Template not found</div>;
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex gap-2 mb-4">
        <button
          onClick={handleCopyToClipboard}
          className="btn btn-sm btn-outline gap-2"
        >
          <Copy size={16} />
          Copy
        </button>
        <button
          onClick={handleDownloadText}
          className="btn btn-sm btn-outline gap-2"
        >
          <Download size={16} />
          Download as Text
        </button>
      </div>
      <div className="flex-1 bg-base-200 rounded-lg p-6 overflow-auto">
        <pre className="whitespace-pre-wrap break-words font-mono text-sm leading-relaxed text-base-content">
          {renderedCV}
        </pre>
      </div>
    </div>
  );
}
