'use client';

import React from 'react';
import { CVTemplates } from '@/app/utils/templates';
import { ChevronDown } from 'lucide-react';

interface TemplateSelectorProps {
  selectedTemplate: number;
  onTemplateChange: (templateId: number) => void;
}

export default function TemplateSelector({
  selectedTemplate,
  onTemplateChange,
}: TemplateSelectorProps) {
  const templates = CVTemplates.getAllTemplates();
  const currentTemplate = templates.find((t) => t.id === selectedTemplate);

  return (
    <div className="w-full">
      <label className="label">
        <span className="label-text font-semibold">CV Template</span>
      </label>
      <div className="dropdown dropdown-hover w-full">
        <button
          tabIndex={0}
          className="btn btn-outline w-full justify-between"
        >
          <span className="truncate text-left">
            {currentTemplate?.name || 'Select Template'}
          </span>
          <ChevronDown size={18} />
        </button>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-50 w-full max-h-96 overflow-y-auto shadow border border-gray-200"
        >
          {templates.map((template) => (
            <li key={template.id}>
              <a
                onClick={() => onTemplateChange(template.id)}
                className={selectedTemplate === template.id ? 'active' : ''}
              >
                <div className="flex flex-col">
                  <span className="font-medium">{template.name}</span>
                  <span className="text-xs opacity-75">
                    {template.description}
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
