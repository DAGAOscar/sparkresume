'use client';

import React from 'react';
import { CVData } from '@/app/utils/templates';
import { Mail, Phone, MapPin } from 'lucide-react';
import { ContactLinks } from './ContactLinks';
import { SectionRenderer } from './SectionRenderer';

interface ModernTemplateProps {
  data: CVData;
}

export const ModernTemplate: React.FC<ModernTemplateProps> = ({ data }) => {
  return (
    <div className="w-full bg-white text-gray-900 p-8 font-sans" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-5xl font-bold mb-1 text-blue-600">{data.name}</h1>
        <div className="flex flex-wrap gap-6 text-sm text-gray-600 mt-4 items-center">
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-blue-600" />
            <span>{data.email}</span>
            <ContactLinks links={data.links} inline className="text-sm" />
          </div>
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-blue-600" />
            <span>{data.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-blue-600" />
            <span>{data.location}</span>
          </div>
        </div>
      </div>

      <div className="border-t-2 border-blue-600 pt-6">
        {/* Summary */}
        {data.summary && (
          <div className="mb-8">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">About</h2>
            <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
          </div>
        )}

        {/* Experience */}
        <div className="mb-8">
          <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">Experience</h2>
          <div className="space-y-5">
            {data.experience.map((exp, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-base text-gray-900">{exp.title}</h3>
                  <span className="text-xs text-gray-500">
                    {exp.startDate} – {exp.endDate || 'Present'}
                  </span>
                </div>
                <p className="text-sm text-blue-600 font-medium mb-1">{exp.company}</p>
                <p className="text-sm text-gray-700">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mb-8">
          <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">Education</h2>
          <div className="space-y-4">
            {data.education.map((edu, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-base text-gray-900">{edu.degree}</h3>
                    <p className="text-sm text-blue-600">{edu.school}</p>
                  </div>
                  <span className="text-xs text-gray-500">{edu.graduationDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="mb-8">
          <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, idx) => (
              <span key={idx} className="bg-blue-50 text-blue-600 px-3 py-1 text-xs font-medium rounded-full border border-blue-200">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">Languages</h2>
            <div className="grid grid-cols-2 gap-3">
              {data.languages.map((lang, idx) => (
                <div key={idx} className="text-sm">
                  <p className="font-medium text-gray-900">{lang.name}</p>
                  <p className="text-xs text-gray-600">{lang.level}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Additional Sections */}
        <SectionRenderer data={data} className="mb-8" />
      </div>
    </div>
  );
};
