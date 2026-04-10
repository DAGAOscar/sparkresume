'use client';

import React from 'react';
import { CVData } from '@/app/utils/templates';
import { ContactLinks } from './ContactLinks';
import { SectionRenderer } from './SectionRenderer';


interface ExecutiveSummaryTemplateProps {
  data: CVData;
}

export const ExecutiveSummaryTemplate: React.FC<ExecutiveSummaryTemplateProps> = ({ data }) => {
  return (
    <div className="w-full bg-white text-gray-900 p-8" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif', fontSize: '15px', lineHeight: '1.6', letterSpacing: '-0.3px' }}>
      {/* Header */}
      <div className="text-center mb-8 pb-6 border-b-4 border-teal-600">
        <h1 className="text-3xl font-bold mb-4 text-teal-700" style={{ fontFamily: 'var(--font-playfair)', fontWeight: 700, letterSpacing: '-0.4px' }}>{data.name}</h1>
        <div className="flex justify-center gap-6 items-center text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span>{data.email}</span>
            <ContactLinks links={data.links} inline className="text-sm" />
          </div>
          <span>•</span>
          <span>{data.phone}</span>
          <span>•</span>
          <span>{data.location}</span>
        </div>
      </div>

      {/* Executive Profile */}
      {data.summary && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-teal-700 uppercase mb-3">Executive Profile</h2>
          <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
        </div>
      )}

      {/* Professional Achievements */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-teal-700 uppercase mb-4">Professional Achievements</h2>
        <div className="space-y-4">
          {data.experience.map((exp, idx) => (
            <div key={idx} className="pl-5 border-l-4 border-teal-400">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-base">{exp.title}</h3>
                <span className="text-xs text-gray-600">{exp.startDate} - {exp.endDate || 'Present'}</span>
              </div>
              <p className="text-sm text-teal-600 font-semibold mb-1">{exp.company}</p>
              <p className="text-sm text-gray-700">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-teal-700 uppercase mb-4">Academic Background</h2>
        <div className="space-y-3">
          {data.education.map((edu, idx) => (
            <div key={idx}>
              <h3 className="font-bold text-base">{edu.degree} in {edu.field}</h3>
              <p className="text-sm text-teal-600">{edu.school}</p>
              <p className="text-xs text-gray-600">{edu.graduationDate}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Competencies */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-teal-700 uppercase mb-3">Core Competencies</h2>
        <div className="grid grid-cols-3 gap-2">
          {data.skills.map((skill, idx) => (
            <span key={idx} className="text-sm text-gray-700">• {skill}</span>
          ))}
        </div>
      </div>

      {/* Languages */}
      {data.languages && data.languages.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-teal-700 uppercase mb-3">Linguistic Proficiency</h2>
          <div className="space-y-1">
            {data.languages.map((lang, idx) => (
              <p key={idx} className="text-sm">
                <span className="font-semibold">• {lang.name}:</span> {lang.level}
              </p>
            ))}
          </div>
        </div>
      )}
      <SectionRenderer data={data} className="mb-8" />
    </div>
  );
};
