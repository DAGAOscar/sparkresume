'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CVData } from '@/app/utils/templates';
import { REACT_TEMPLATES, getTemplateInfo } from '@/app/components/templates';
import EditableCVBuilder from '@/app/components/EditableCVBuilder';
import {
  educationsPreset,
  experiencesPreset,
  languagesPreset,
  personalDetailsPreset,
  skillsPreset,
  certificatesPreset,
  awardsPreset,
  coursesPreset,
  organizationsPreset,
  publicationsPreset,
  referencesPreset,
  interestsPreset,
  declarationPreset,
  linksPreset,
} from '@/presets';
import { ArrowLeft, Eye, Check, Palette, LogIn } from 'lucide-react';
import Header from '@/app/components/Header';
import { useAuth } from '@/app/hooks/useAuth';

export default function TemplatesPage() {
  const { isLoggedIn, loading } = useAuth();
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
      links: linksPreset,
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
      certifications: certificatesPreset,
      awards: awardsPreset,
      courses: coursesPreset,
      organizations: organizationsPreset,
      publications: publicationsPreset,
      references: referencesPreset,
      interests: interestsPreset,
      declaration: declarationPreset,
      projects: [],
      customSections: [],
    };
    setCvData(data);
  };

  // Show template gallery if no template selected yet
  if (isLoggedIn === null) {
    // Loading state while checking authentication
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Vérification de l'authentification...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    // Redirect is handled by useEffect, but show message as fallback
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center max-w-md">
            <LogIn size={48} className="mx-auto mb-4 text-blue-600" />
            <h2 className="text-2xl font-bold mb-2 text-gray-900">Connexion requise</h2>
            <p className="text-gray-600 mb-6">
              Vous devez être connecté pour accéder aux templates.
            </p>
            <Link href="/login" className="btn btn-primary">
              Se connecter
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedTemplate || !cvData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Header />
        
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-3 mb-3">
              <Palette size={32} />
              <h1 className="text-4xl font-bold">Professional CV Templates</h1>
            </div>
            <p className="text-blue-100 text-lg">
              Select a template, customize your information, and download your professional resume
            </p>
          </div>
        </div>

        {/* Templates Gallery */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {REACT_TEMPLATES.map((template) => (
              <div
                key={template.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100"
              >
                {/* Template Preview Area */}
                <div className="h-72 bg-gradient-to-br from-gray-50 to-gray-200 flex flex-col items-center justify-center relative overflow-hidden group-hover:from-blue-50 group-hover:to-blue-100 transition-all duration-300">
                  <div className="text-center z-10">
                    <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
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
                    <p className="text-sm text-gray-700 font-semibold">{template.name}</p>
                  </div>

                  {/* Hover overlay with button */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button
                      className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                      onClick={() => {
                        setSelectedTemplate(template.id);
                        initializeCVData();
                      }}
                    >
                      <Eye size={20} /> View & Edit
                    </button>
                  </div>
                </div>

                {/* Template Info */}
                <div className="p-6">
                  <h3 className="font-bold text-xl text-gray-900 mb-2">{template.name}</h3>
                  <p className="text-sm text-gray-600 mb-6 h-10 line-clamp-2">{template.description}</p>
                  <button
                    onClick={() => {
                      setSelectedTemplate(template.id);
                      initializeCVData();
                    }}
                    className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 flex items-center justify-center gap-2 group/btn"
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
      <Header />
      
      {/* Header with back button */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={() => {
              setSelectedTemplate(null);
              setCvData(null);
            }}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-4 transition-colors"
          >
            <ArrowLeft size={18} /> Back to Templates
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {getTemplateInfo(selectedTemplate)?.name}
            </h1>
            <p className="text-gray-600 text-sm mt-2">
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
