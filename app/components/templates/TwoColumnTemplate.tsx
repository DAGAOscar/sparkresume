'use client';

import React from 'react';
import { CVData } from '@/app/utils/templates';
import { ContactLinks } from './ContactLinks';
import { SectionRenderer } from './SectionRenderer';

interface TwoColumnTemplateProps {
  data: CVData;
}

export const TwoColumnTemplate: React.FC<TwoColumnTemplateProps> = ({ data }) => {
  return (
    <div className="w-full bg-white text-gray-900 flex flex-col md:flex-row" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif', fontSize: '15px', lineHeight: '1.6', letterSpacing: '-0.3px' }}>
      {/* Left Column - Sidebar */}
      <div className="w-full md:w-1/3 bg-gradient-to-b from-blue-600 to-blue-700 text-white p-4 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-1" style={{ fontFamily: 'var(--font-playfair)', fontWeight: 700, letterSpacing: '-0.4px' }}>{data.name}</h1>
        <p className="text-blue-100 text-sm mb-8">Professional</p>

        {/* Contact */}
        <div className="mb-4 md:mb-8">
          <h3 className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-4">Contact</h3>
          <div className="space-y-3">
            <div className="text-xs">{data.email}</div>
            <div className="flex flex-wrap gap-2 items-center">
              <ContactLinks links={data.links} inline className="text-xs" />
            </div>
            <div className="text-xs">{data.phone}</div>
            <div className="text-xs">{data.location}</div>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-4 md:mb-8">
          <h3 className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-4">Skills</h3>
          <div className="space-y-2">
            {data.skills.map((skill, idx) => (
              <div key={idx} className="text-xs bg-blue-500 px-2 py-1 rounded inline-block mr-2 mb-2">
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-4">Languages</h3>
            <div className="space-y-2">
              {data.languages.map((lang, idx) => (
                <div key={idx}>
                  <p className="text-xs font-semibold">{lang.name}</p>
                  <p className="text-xs text-blue-100">{lang.level}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Column - Main Content */}
      <div className="w-full md:w-2/3 p-4 md:p-8">
        {/* Summary */}
        {data.summary && (
          <div className="mb-4 md:mb-8">
            <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-3 pb-2 border-b-2 border-blue-600">About</h2>
            <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
          </div>
        )}

        {/* Experience */}
        <div className="mb-4 md:mb-8">
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-4 pb-2 border-b-2 border-blue-600">Experience</h2>
          <div className="space-y-5">
            {data.experience.map((exp, idx) => (
              <div key={idx}>
                <div className="flex flex-col md:flex-row md:justify-between items-start mb-1">
                  <h3 className="font-bold text-sm md:text-base text-gray-900\">{exp.title}</h3>
                  <span className="text-xs text-gray-600">
                    {exp.startDate} – {exp.endDate || 'Present'}
                  </span>
                </div>
                <p className="text-sm font-semibold text-blue-600 mb-2">{exp.company}</p>
                <p className="text-sm text-gray-700">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-4 pb-2 border-b-2 border-blue-600">Education</h2>
          <div className="space-y-4">
            {data.education.map((edu, idx) => (
              <div key={idx}>
                <h3 className="font-bold text-base text-gray-900">{edu.degree}</h3>
                <p className="text-sm text-blue-600 font-semibold">{edu.school}</p>
                <p className="text-xs text-gray-600">{edu.graduationDate}</p>
              </div>
            ))}
          </div>
        </div>
        <SectionRenderer data={data} className="mb-8" />
      </div>
    </div>
  );
};
