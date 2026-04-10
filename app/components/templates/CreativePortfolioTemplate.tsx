'use client';

import React from 'react';
import { CVData } from '@/app/utils/templates';
import { ContactLinks } from './ContactLinks';
import { SectionRenderer } from './SectionRenderer';

interface CreativePortfolioTemplateProps {
  data: CVData;
}

export const CreativePortfolioTemplate: React.FC<CreativePortfolioTemplateProps> = ({ data }) => {
  return (
    <div className="w-full bg-gradient-to-b from-indigo-900 via-white to-white text-gray-900 p-8" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif', fontSize: '15px', lineHeight: '1.6', letterSpacing: '-0.3px' }}>
      {/* Decorative Header */}
      <div className="text-center mb-8 pb-8 bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-lg">
        <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', fontWeight: 700, letterSpacing: '-0.5px' }}>{data.name}</h1>
        <p className="text-indigo-100 mb-4">Creative Professional</p>
        <div className="flex flex-wrap gap-4 items-center text-sm text-gray-700">
          <span>{data.email}</span>
          <span>•</span>
          <span>{data.phone}</span>
          <span>•</span>
          <span>{data.location}</span>
          <ContactLinks links={data.links} inline className="text-sm" />
        </div>
      </div>

      {/* Creative Vision */}
      {data.summary && (
        <div className="mb-8">
          <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-3">Creative Vision</h2>
          <p className="text-sm leading-relaxed text-gray-700 italic">{data.summary}</p>
        </div>
      )}

      {/* Portfolio & Experience */}
      <div className="mb-8">
        <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-4">Portfolio & Experience</h2>
        <div className="space-y-5">
          {data.experience.map((exp, idx) => (
            <div key={idx} className="bg-indigo-50 p-5 rounded-lg border-l-4 border-indigo-500">
              <h3 className="font-bold text-lg text-indigo-900">{exp.title}</h3>
              <p className="text-sm text-indigo-600 font-semibold">{exp.company}</p>
              <p className="text-xs text-gray-600 my-2">
                {exp.startDate} – {exp.endDate || 'Active'}
              </p>
              <p className="text-sm text-gray-700">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="mb-4 md:mb-6 lg:mb-8">
        <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-4">Education</h2>
        <div className="space-y-3">
          {data.education.map((edu, idx) => (
            <div key={idx} className="border-b-2 border-indigo-200 pb-3">
              <h3 className="font-bold text-base text-gray-900">{edu.degree} in {edu.field}</h3>
              <p className="text-sm text-indigo-600">{edu.school}</p>
              <p className="text-xs text-gray-600">{edu.graduationDate}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Creative Skills */}
      <div className="mb-8">
        <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-4">Creative Skills</h2>
        <div className="grid grid-cols-2 gap-3">
          {data.skills.map((skill, idx) => (
            <div key={idx} className="bg-gradient-to-r from-indigo-100 to-purple-100 p-3 rounded-lg">
              <p className="text-sm font-semibold text-indigo-900">● {skill}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Languages */}
      {data.languages && data.languages.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-3">Languages</h2>
          <div className="flex flex-wrap gap-2">
            {data.languages.map((lang, idx) => (
              <span key={idx} className="bg-indigo-200 text-indigo-900 px-4 py-2 rounded-full text-sm font-medium">
                🌐 {lang.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Featured Projects */}
      {data.projects && data.projects.length > 0 && (
        <div className="border-t-4 border-indigo-600 pt-8">
          <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-4">Featured Projects</h2>
          <div className="space-y-5">
            {data.projects.map((project, idx) => (
              <div key={idx} className="bg-white border-2 border-indigo-200 p-5 rounded-lg">
                <h3 className="font-bold text-lg text-indigo-900">{project.title}</h3>
                <p className="text-sm text-gray-700 my-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.technologies.map((tech, tidx) => (
                    <span key={tidx} className="bg-indigo-100 text-indigo-700 px-2 py-1 text-xs rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <SectionRenderer data={data} className="mb-8" />
    </div>
  );
};
