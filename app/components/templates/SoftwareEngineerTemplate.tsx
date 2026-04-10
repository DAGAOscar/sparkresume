'use client';

import React from 'react';
import { CVData } from '@/app/utils/templates';
import { ContactLinks } from './ContactLinks';
import { SectionRenderer } from './SectionRenderer';

interface SoftwareEngineerTemplateProps {
  data: CVData;
}

export const SoftwareEngineerTemplate: React.FC<SoftwareEngineerTemplateProps> = ({ data }) => {
  return (
    <div className="w-full bg-white text-gray-900 p-4 md:p-6 lg:p-8" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif', fontSize: '15px', lineHeight: '1.6', letterSpacing: '-0.3px' }}>
      {/* Header */}
      <div className="mb-4 md:mb-6 lg:mb-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-700 mb-2" style={{ fontFamily: 'var(--font-playfair)', fontWeight: 700, letterSpacing: '-0.5px' }}>{data.name}</h1>
        <div className="flex flex-wrap gap-4 items-center text-sm text-gray-700">
          <span>{data.email}</span>
          <span>•</span>
          <span>{data.phone}</span>
          <span>•</span>
          <span>{data.location}</span>
          <ContactLinks links={data.links} inline className="text-sm" />
        </div>
      </div>

      <div className="border-t-4 border-blue-600 pt-3 md:pt-4 lg:pt-6">
        {/* Summary */}
        {data.summary && (
          <div className="mb-4 md:mb-6 lg:mb-8">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">About</h2>
            <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
          </div>
        )}

        {/* Development Experience */}
        <div className="mb-4 md:mb-6 lg:mb-8">
          <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">Development Experience</h2>
          <div className="space-y-5">
            {data.experience.map((exp, idx) => (
              <div key={idx} className="pl-2 md:pl-4 border-l-4 border-blue-400">
                <h3 className="font-bold text-sm md:text-base text-gray-900">{exp.title}</h3>
                <p className="text-sm text-blue-600 font-semibold mb-1">{exp.company}</p>
                <p className="text-xs text-gray-600 mb-2">
                  {exp.startDate} – {exp.endDate || 'Present'}
                </p>
                <p className="text-sm text-gray-700">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mb-4 md:mb-6 lg:mb-8">
          <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">Education</h2>
          <div className="space-y-3">
            {data.education.map((edu, idx) => (
              <div key={idx}>
                <h3 className="font-bold text-sm md:text-base text-gray-900">{edu.degree} in {edu.field}</h3>
                <p className="text-sm text-blue-600">{edu.school}</p>
                <p className="text-xs text-gray-600">{edu.graduationDate}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Skills */}
        <div className="mb-4 md:mb-6 lg:mb-8">
          <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">Technical Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {data.skills.map((skill, idx) => (
              <div key={idx} className="text-sm font-medium text-gray-800 flex items-center gap-2">
                <span className="text-blue-600">◆</span> {skill}
              </div>
            ))}
          </div>
        </div>

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">Languages</h2>
            <div className="flex flex-wrap gap-2">
              {data.languages.map((lang, idx) => (
                <span key={idx} className="bg-blue-50 text-blue-700 px-3 py-1 text-xs font-medium rounded border border-blue-200">
                  {lang.name} - {lang.level}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <div className="mt-8 pt-6 border-t-2 border-blue-200">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">Notable Projects</h2>
            <div className="space-y-4">
              {data.projects.map((project, idx) => (
                <div key={idx} className="bg-gray-50 p-4 rounded">
                  <h3 className="font-bold text-gray-900">{project.title}</h3>
                  <p className="text-sm text-gray-700 mt-1">{project.description}</p>
                  <p className="text-xs text-blue-600 font-semibold mt-2">
                    Tech: {project.technologies.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        <SectionRenderer data={data} className="mb-8" />
      </div>
    </div>
  );
};
