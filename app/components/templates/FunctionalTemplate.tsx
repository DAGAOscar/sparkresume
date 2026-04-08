'use client';

import React from 'react';
import { CVData } from '@/app/utils/templates';
import { ContactLinks } from './ContactLinks';
import { SectionRenderer } from './SectionRenderer';
import { Mail, Phone, MapPin } from 'lucide-react';

interface FunctionalTemplateProps {
  data: CVData;
}

export const FunctionalTemplate: React.FC<FunctionalTemplateProps> = ({ data }) => {
  return (
    <div className="w-full bg-white text-gray-900 p-8 font-sans" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-3">{data.name}</h1>
        <div className="flex flex-wrap gap-5 items-center text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-indigo-600" />
            <span>{data.email}</span>
            <ContactLinks links={data.links} inline className="text-sm" />
          </div>
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-indigo-600" />
            <span>{data.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-indigo-600" />
            <span>{data.location}</span>
          </div>
        </div>
      </div>

      <div className="border-t-4 border-indigo-600 pt-6">
        {/* Summary */}
        {data.summary && (
          <div className="mb-8">
            <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">Professional Profile</h2>
            <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
          </div>
        )}

        {/* Skills (Prominent) */}
        <div className="mb-8">
          <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-4">Core Competencies</h2>
          <div className="grid grid-cols-2 gap-3">
            {data.skills.map((skill, idx) => (
              <div key={idx} className="text-sm font-medium text-gray-800 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="mb-8">
          <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-4">Professional Experience</h2>
          <div className="space-y-5">
            {data.experience.map((exp, idx) => (
              <div key={idx}>
                <h3 className="font-bold text-base text-gray-900">{exp.title}</h3>
                <p className="text-sm text-indigo-600 font-semibold mb-1">{exp.company}</p>
                <p className="text-xs text-gray-600 mb-2">
                  {exp.startDate} – {exp.endDate || 'Present'}
                </p>
                <p className="text-sm text-gray-700">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mb-8">
          <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-4">Education</h2>
          <div className="space-y-4">
            {data.education.map((edu, idx) => (
              <div key={idx}>
                <h3 className="font-bold text-base text-gray-900">{edu.degree}</h3>
                <p className="text-sm text-indigo-600">{edu.school}</p>
                <p className="text-xs text-gray-600">{edu.graduationDate}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <div>
            <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">Languages</h2>
            <div className="flex flex-wrap gap-2">
              {data.languages.map((lang, idx) => (
                <span key={idx} className="bg-indigo-50 text-indigo-700 px-3 py-1 text-xs font-medium rounded-full border border-indigo-200">
                  {lang.name}
                </span>
              ))}
            </div>
          </div>
        )}
        <SectionRenderer data={data} className="mb-8" />
      </div>
    </div>
  );
};
