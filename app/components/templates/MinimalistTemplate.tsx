'use client';

import React from 'react';
import { CVData } from '@/app/utils/templates';
import { ContactLinks } from './ContactLinks';
import { SectionRenderer } from './SectionRenderer';

interface MinimalistTemplateProps {
  data: CVData;
}

export const MinimalistTemplate: React.FC<MinimalistTemplateProps> = ({ data }) => {
  return (
    <div className="w-full bg-white text-gray-900 p-4 md:p-6 lg:p-8" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif', fontSize: '15px', lineHeight: '1.6', letterSpacing: '-0.3px' }}>
      {/* Header */}
      <div className="mb-4 md:mb-6 lg:mb-8">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-light mb-1 tracking-tight" style={{ fontFamily: 'var(--font-playfair)', fontWeight: 400, letterSpacing: '-0.3px' }}>{data.name}</h1>
        <div className="flex flex-wrap gap-4 text-xs text-gray-600">
          <span>{data.email}</span>
          <span>•</span>
          <span>{data.phone}</span>
          <span>•</span>
          <span>{data.location}</span>
          {data.links && data.links.length > 0 && (
            <>
              <span>•</span>
              <ContactLinks links={data.links} inline className="text-xs" />
            </>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-4 md:mb-6 lg:mb-8">
          <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      <div className="mb-4 md:mb-6 lg:mb-8">
        <h2 className="text-base md:text-lg font-light mb-4 uppercase tracking-wide text-gray-900">Experience</h2>
        <div className="space-y-6">
          {data.experience.map((exp, idx) => (
            <div key={idx}>
              <div className="flex flex-col md:flex-row md:justify-between items-baseline gap-2 md:gap-0">
                <h3 className="font-semibold text-sm md:text-base">{exp.title}</h3>
                <span className="text-xs text-gray-600">
                  {exp.startDate} – {exp.endDate || 'Present'}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{exp.company}</p>
              <p className="text-sm text-gray-700 leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="mb-4 md:mb-6 lg:mb-8">
        <h2 className="text-base md:text-lg font-light mb-4 uppercase tracking-wide text-gray-900">Education</h2>
        <div className="space-y-4">
          {data.education.map((edu, idx) => (
            <div key={idx}>
              <div className="flex flex-col md:flex-row md:justify-between items-baseline gap-2 md:gap-0">
                <h3 className="font-semibold text-sm md:text-base">{edu.degree}</h3>
                <span className="text-xs text-gray-600">{edu.graduationDate}</span>
              </div>
              <p className="text-sm text-gray-600">{edu.school}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="mb-4 md:mb-6 lg:mb-8">
        <h2 className="text-base md:text-lg font-light mb-4 uppercase tracking-wide text-gray-900">Skills</h2>
        <p className="text-sm text-gray-700">
          {data.skills.map((skill, idx) => (
            <span key={idx}>
              {skill}
              {idx < data.skills.length - 1 ? ' • ' : ''}
            </span>
          ))}
        </p>
      </div>

      {/* Languages */}
      {data.languages && data.languages.length > 0 && (
        <div className="mb-4 md:mb-6 lg:mb-8">
          <h2 className="text-base md:text-lg font-light mb-4 uppercase tracking-wide text-gray-900">Languages</h2>
          <div className="text-sm text-gray-700 space-y-1">
            {data.languages.map((lang, idx) => (
              <p key={idx}>
                <span className="font-semibold">{lang.name}</span> – {lang.level}
              </p>
            ))}
          </div>
        </div>
      )}
      <SectionRenderer data={data} className="mb-8" />
    </div>
  );
};
