'use client';

import React, { useState } from 'react';
import { CVData } from '@/app/utils/templates';
import { REACT_TEMPLATES, getTemplateInfo } from '@/app/components/templates';
import EditableCVBuilder from '@/app/components/EditableCVBuilder';
import {
  educationsPreset,
  experiencesPreset,
  languagesPreset,
  personalDetailsPreset,
  skillsPreset,
} from '@/presets';
import { ArrowLeft, Eye, Check } from 'lucide-react';

export default function TemplatesPage() {
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  // Initialize CV data with presets
  const initializeCVData = () => {
    const data: CVData = {
      name: personalDetailsPreset.fullName,
      email: personalDetailsPreset.email,
      phone: personalDetailsPreset.phone,
      location: personalDetailsPreset.address,
      summary: personalDetailsPreset.description,
      experience: experiencesPreset.map(exp => ({
        title: exp.jobTitle,
        company: exp.companyName,
        startDate: exp.startDate,
        endDate: exp.endDate,
        description: exp.description,
        current: false,
      })),
      education: educationsPreset.map(edu => ({
        degree: edu.degree,
        school: edu.school,
        field: edu.description || '',
        graduationDate: edu.endDate,
        gpa: undefined,
      })),
      skills: skillsPreset.map(skill => skill.name),
      languages: languagesPreset.map(lang => ({
        name: lang.language,
        level: lang.proficiency as 'Beginner' | 'Intermediate' | 'Advanced' | 'Fluent',
      })),
      certifications: [],
      projects: [],
    };
    setCvData(data);
  };

  // Show template gallery if no template selected yet
  if (!selectedTemplate || !cvData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Header */}
        <div className="bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <h1 className="text-3xl font-bold text-gray-900">Choose Your CV Template</h1>
            <p className="text-gray-600 mt-2">Select a professional template and customize your resume</p>
          </div>
        </div>

        {/* Templates Gallery */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REACT_TEMPLATES.map((template) => (
              <div
                key={template.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden group cursor-pointer"
                onClick={() => {
                  setSelectedTemplate(template.id);
                  initializeCVData();
                }}
              >
                {/* Template Preview Area */}
                <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden group-hover:from-blue-50 group-hover:to-blue-100 transition-colors">
                  <div className="text-center">
                    <div className="text-4xl mb-2">
                      {template.id === 1 && '📄'}
                      {template.id === 2 && '🎨'}
                      {template.id === 3 && '💼'}
                      {template.id === 4 && '📋'}
                      {template.id === 5 && '✨'}
                      {template.id === 6 && '⭐'}
                      {template.id === 7 && '🎯'}
                      {template.id === 8 && '👑'}
                      {template.id === 9 && '💻'}
                      {template.id === 10 && '🚀'}
                      {template.id === 11 && '⚕️'}
                      {template.id === 12 && '🎭'}
                      {template.id === 13 && '💰'}
                    </div>
                    <p className="text-sm text-gray-600 font-medium">{template.name}</p>
                  </div>

                  {/* Hover overlay with button */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                    <button
                      className="opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTemplate(template.id);
                        initializeCVData();
                      }}
                    >
                      <Eye size={18} /> View & Edit
                    </button>
                  </div>
                </div>

                {/* Template Info */}
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">{template.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                  <button
                    onClick={() => {
                      setSelectedTemplate(template.id);
                      initializeCVData();
                    }}
                    className="w-full py-2 px-4 bg-blue-50 text-blue-600 rounded-lg font-semibold hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <Check size={18} /> Select Template
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Show editor with selected template
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={() => {
              setSelectedTemplate(null);
              setCvData(null);
            }}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-3"
          >
            <ArrowLeft size={18} /> Back to Templates
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {getTemplateInfo(selectedTemplate)?.name}
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              {getTemplateInfo(selectedTemplate)?.description}
            </p>
          </div>
        </div>
      </div>

      {/* Editor */}
      <EditableCVBuilder
        initialData={cvData}
        onDataChange={(newData) => setCvData(newData)}
        selectedTemplateId={selectedTemplate}
      />
    </div>
  );
}
