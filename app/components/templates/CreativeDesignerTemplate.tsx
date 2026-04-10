'use client';

import React from 'react';
import { CVData } from '@/app/utils/templates';
import { ContactLinks } from './ContactLinks';
import { SectionRenderer } from './SectionRenderer';

interface CreativeDesignerTemplateProps {
  data: CVData;
}

export const CreativeDesignerTemplate: React.FC<CreativeDesignerTemplateProps> = ({ data }) => {
  return (
    <div className="w-full bg-gradient-to-br from-purple-50 via-white to-pink-50 text-gray-900 p-8" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif', fontSize: '15px', lineHeight: '1.6', letterSpacing: '-0.3px' }}>
      {/* Decorative Header */}
      <div className="text-center mb-8 pb-8 border-b-2 border-purple-200">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-3" style={{ fontFamily: 'var(--font-playfair)', fontWeight: 700, letterSpacing: '-0.6px' }}>{data.name}</h1>
        <div className="flex flex-wrap justify-center gap-5 items-center text-sm text-gray-600">
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
          <h2 className="text-sm font-bold text-purple-600 uppercase tracking-widest mb-3">About Me</h2>
          <p className="text-sm leading-relaxed text-gray-700 italic">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      <div className="mb-8">
        <h2 className="text-sm font-bold text-purple-600 uppercase tracking-widest mb-4">Experience</h2>
        <div className="space-y-5">
          {data.experience.map((exp, idx) => (
            <div key={idx} className="bg-white p-4 rounded-lg border-l-4 border-purple-400">
              <h3 className="font-bold text-base text-gray-900">{exp.title}</h3>
              <p className="text-sm text-purple-600 font-semibold">{exp.company}</p>
              <p className="text-xs text-gray-600 mb-2">
                {exp.startDate} – {exp.endDate || 'Now'}
              </p>
              <p className="text-sm text-gray-700">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="mb-8">
        <h2 className="text-sm font-bold text-purple-600 uppercase tracking-widest mb-4">Education</h2>
        <div className="space-y-3">
          {data.education.map((edu, idx) => (
            <div key={idx} className="bg-white p-4 rounded-lg">
              <h3 className="font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
              <p className="text-sm text-purple-600">{edu.school}</p>
              <p className="text-xs text-gray-600">{edu.graduationDate}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="mb-8">
        <h2 className="text-sm font-bold text-purple-600 uppercase tracking-widest mb-3">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill, idx) => (
            <span key={idx} className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-3 py-1 text-xs font-semibold rounded-full">
              ★ {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Languages */}
      {data.languages && data.languages.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-purple-600 uppercase tracking-widest mb-3">Languages</h2>
          <div className="grid grid-cols-2 gap-2">
            {data.languages.map((lang, idx) => (
              <div key={idx} className="text-sm">
                <p className="font-semibold text-gray-900">🌐 {lang.name}</p>
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
