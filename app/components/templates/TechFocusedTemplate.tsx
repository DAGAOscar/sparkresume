'use client';

import React from 'react';
import { CVData } from '@/app/utils/templates';
import { ContactLinks } from './ContactLinks';
import { SectionRenderer } from './SectionRenderer';

interface TechFocusedTemplateProps {
  data: CVData;
}

export const TechFocusedTemplate: React.FC<TechFocusedTemplateProps> = ({ data }) => {
  return (
    <div className="w-full bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif', fontSize: '15px', lineHeight: '1.6', letterSpacing: '-0.3px' }}>
      {/* Header */}
      <div className="mb-8 pb-6 border-b border-cyan-500">
        <h1 className="text-4xl font-bold text-cyan-400 mb-3" style={{ fontFamily: 'var(--font-playfair)', fontWeight: 700, letterSpacing: '-0.5px' }}>{data.name}</h1>
        <div className="flex flex-wrap gap-4 items-center text-sm text-gray-700">
          <span>{data.email}</span>
          <span>•</span>
          <span>{data.phone}</span>
          <span>•</span>
          <span>{data.location}</span>
          <ContactLinks links={data.links} inline className="text-sm" />
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-8">
          <div className="text-cyan-400 font-bold mb-2">[PROFILE]</div>
          <p className="text-sm text-gray-300 leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Technical Skills */}
      <div className="mb-8">
        <div className="text-cyan-400 font-bold mb-3">[TECHNICAL EXPERTISE]</div>
        <div className="space-y-1">
          {data.skills.map((skill, idx) => (
            <div key={idx} className="text-sm text-gray-300 flex items-center gap-2">
              <span className="text-cyan-400">→</span> {skill}
            </div>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="mb-8">
        <div className="text-cyan-400 font-bold mb-4">[PROFESSIONAL EXPERIENCE]</div>
        <div className="space-y-4">
          {data.experience.map((exp, idx) => (
            <div key={idx} className="bg-slate-700/50 p-3 rounded border-l-2 border-cyan-500">
              <h3 className="text-cyan-400 font-semibold">{exp.title} @ {exp.company}</h3>
              <p className="text-xs text-gray-400 my-1">{exp.startDate} – {exp.endDate || 'Present'}</p>
              <p className="text-sm text-gray-300">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="mb-8">
        <div className="text-cyan-400 font-bold mb-3">[EDUCATION]</div>
        <div className="space-y-2">
          {data.education.map((edu, idx) => (
            <div key={idx}>
              <p className="text-sm text-gray-300">
                <span className="text-cyan-400">•</span> {edu.degree} in {edu.field}
              </p>
              <p className="text-xs text-gray-400">{edu.school} ({edu.graduationDate})</p>
            </div>
          ))}
        </div>
      </div>

      {/* Languages */}
      {data.languages && data.languages.length > 0 && (
        <div>
          <div className="text-cyan-400 font-bold mb-2">[LANGUAGES]</div>
          <div className="space-y-1">
            {data.languages.map((lang, idx) => (
              <p key={idx} className="text-sm text-gray-300">
                <span className="text-cyan-400">◆</span> {lang.name}: {lang.level}
              </p>
            ))}
          </div>
        </div>
      )}
      <SectionRenderer data={data} className="mb-8" />
    </div>
  );
};
