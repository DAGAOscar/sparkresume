'use client';

import React, { useMemo } from 'react';
import { CVData } from '@/app/utils/templates';
import { REACT_TEMPLATES } from '@/app/components/templates';
import { Check, Eye } from 'lucide-react';

interface TemplateGalleryProps {
  cvData: CVData;
  onSelectTemplate: (templateId: number) => void;
  selectedTemplate: number;
}

export default function TemplateGallery({
  cvData,
  onSelectTemplate,
  selectedTemplate,
}: TemplateGalleryProps) {
  const templates = useMemo(() => REACT_TEMPLATES, []);

  return (
    <div className="w-full">
      <div className="mb-6 sticky top-0 bg-white p-4 rounded-lg z-10 border shadow-sm">
        <h2 className="text-xl font-bold mb-1">Professional Templates</h2>
        <p className="text-sm text-gray-600">
          {templates.length} templates available - Select one to preview
        </p>
      </div>

      <div className="space-y-3">
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            isSelected={selectedTemplate === template.id}
            onSelect={() => onSelectTemplate(template.id)}
          />
        ))}
      </div>
    </div>
  );
}

interface TemplateCardProps {
  template: (typeof REACT_TEMPLATES)[0];
  isSelected: boolean;
  onSelect: () => void;
}

function TemplateCard({ template, isSelected, onSelect }: TemplateCardProps) {
  return (
    <button
      onClick={onSelect}
      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
        isSelected
          ? 'border-blue-600 bg-blue-50'
          : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-base text-gray-900 flex items-center gap-2">
            {template.name}
            {isSelected && <Check size={18} className="text-blue-600" />}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{template.description}</p>
        </div>
        <Eye size={18} className="text-gray-400 ml-4 flex-shrink-0" />
      </div>
    </button>
  );
}
