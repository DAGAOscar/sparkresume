'use client';

import React from 'react';
import { CVData } from '@/app/utils/templates';
import { ContactLinks } from './ContactLinks';
import { SectionRenderer } from './SectionRenderer';

interface FinanceCorporateTemplateProps {
  data: CVData;
}

export const FinanceCorporateTemplate: React.FC<FinanceCorporateTemplateProps> = ({ data }) => {
  return (
    <div className="w-full bg-white text-gray-900 p-8" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif', fontSize: '15px', lineHeight: '1.6', letterSpacing: '-0.3px' }}>
      {/* Header with Background */}
      <div className="bg-gray-800 text-white p-6 mb-8 -mx-8 -mt-8 px-8 mb-8">
        <h1 className="text-3xl font-bold mb-3" style={{ fontFamily: 'var(--font-playfair)', fontWeight: 700, letterSpacing: '-0.4px' }}>{data.name}</h1>
        <div className="flex flex-wrap gap-4 items-center text-sm text-gray-700">
          <span>{data.email}</span>
          <span>•</span>
          <span>{data.phone}</span>
          <span>•</span>
          <span>{data.location}</span>
          <ContactLinks links={data.links} inline className="text-sm" />
        </div>
      </div>

      {/* Professional Objective */}
      {data.summary && (
        <div className="mb-8">
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-3 pb-2 border-b-2 border-amber-600">Professional Objective</h2>
          <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
        </div>
      )}

      {/* Career Progression */}
      <div className="mb-8">
        <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-4 pb-2 border-b-2 border-amber-600">Career Progression</h2>
        <div className="space-y-5">
          {data.experience.map((exp, idx) => (
            <div key={idx} className="border-l-4 border-amber-600 pl-4">
              <h3 className="font-bold text-base text-gray-900">{exp.title}</h3>
              <p className="text-sm font-semibold text-gray-700">{exp.company}</p>
              <p className="text-xs text-gray-600 mb-2">Tenure: {exp.startDate} to {exp.endDate || 'Present'}</p>
              <p className="text-sm text-gray-700">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Educational Qualifications */}
      <div className="mb-8">
        <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-4 pb-2 border-b-2 border-amber-600">Educational Qualifications</h2>
        <div className="space-y-4">
          {data.education.map((edu, idx) => (
            <div key={idx}>
              <h3 className="font-bold text-base text-gray-900">{edu.degree}</h3>
              <p className="text-sm text-gray-700">{edu.field}</p>
              <p className="text-sm text-gray-600">{edu.school}</p>
              <p className="text-xs text-gray-600">Completed: {edu.graduationDate}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Professional Skills */}
      <div className="mb-8">
        <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-3 pb-2 border-b-2 border-amber-600">Professional Skills</h2>
        <div className="grid grid-cols-3 gap-2">
          {data.skills.map((skill, idx) => (
            <div key={idx} className="text-sm text-gray-700">→ {skill}</div>
          ))}
        </div>
      </div>

      {/* Languages */}
      {data.languages && data.languages.length > 0 && (
        <div>
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-3 pb-2 border-b-2 border-amber-600">Language Skills</h2>
          <div className="flex flex-wrap gap-3">
            {data.languages.map((lang, idx) => (
              <div key={idx} className="text-sm">
                <p className="font-semibold text-gray-900">• {lang.name}</p>
                <p className="text-xs text-gray-600">{lang.level}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <SectionRenderer data={data} className="mb-8" />
    </div>
  );
};
