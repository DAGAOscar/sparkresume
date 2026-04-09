'use client';

import React from 'react';
import { Layout } from 'lucide-react';

interface CVModelSelectorProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
}

const models = [
  { id: 'modern', name: 'Modern', description: 'Two-column layout with sidebar' },
  { id: 'minimal', name: 'Minimal', description: 'Clean and simple design' },
  { id: 'creative', name: 'Creative', description: 'Colorful and modern' },
  { id: 'professional', name: 'Professional', description: 'Corporate style' },
];

export default function CVModelSelector({ selectedModel, onModelChange }: CVModelSelectorProps) {
  return (
    <div className="w-full">
      <label className="label">
        <span className="label-text font-semibold flex items-center gap-2">
          <Layout size={18} />
          CV Layout
        </span>
      </label>
      <div className="grid grid-cols-2 gap-2">
        {models.map((model) => (
          <button
            key={model.id}
            onClick={() => onModelChange(model.id)}
            className={`p-3 rounded-lg border-2 transition-all text-left ${
              selectedModel === model.id
                ? 'border-primary bg-primary/10'
                : 'border-base-300 hover:border-primary'
            }`}
          >
            <p className="font-semibold text-sm">{model.name}</p>
            <p className="text-xs text-base-content/60">{model.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
