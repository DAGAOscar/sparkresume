'use client';

import React from 'react';
import { CVData } from '@/app/utils/templates';
import { Mail, Phone, MapPin } from 'lucide-react';
import { ContactLinks } from './ContactLinks';

interface CorporateTemplateProps {
  data: CVData;
}

export const CorporateTemplate: React.FC<CorporateTemplateProps> = ({ data }) => {
  return (
    <div className="w-full bg-white text-gray-900 p-8 font-sans" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      {/* Header Background */}
      <div className="bg-gray-900 text-white p-8 mb-8 -mx-8 -mt-8 mb-8">
        <h1 className="text-4xl font-bold mb-4">{data.name}</h1>
        <div className="flex flex-wrap gap-3 items-center text-xs">
          <div className="flex items-center gap-1">
            <Mail size={14} />
            <span>{data.email}</span>
            <ContactLinks links={data.links} inline className="text-xs" />
          </div>
          <div className="flex items-center gap-1">
            <Phone size={14} />
            <span>{data.phone}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={14} />
            <span>{data.location}</span>
          </div>
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-8">
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-4 pb-2 border-b-2 border-gray-900">Professional Summary</h2>
          <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      <div className="mb-8">
        <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-4 pb-2 border-b-2 border-gray-900">Professional Experience</h2>
        <div className="space-y-6">
          {data.experience.map((exp, idx) => (
            <div key={idx} className="border-l-4 border-gray-900 pl-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-base">{exp.title}</h3>
                <span className="text-xs text-gray-600">
                  {exp.startDate} – {exp.endDate || 'Present'}
                </span>
              </div>
              <p className="text-sm font-semibold text-gray-700 mb-2">{exp.company}</p>
              <p className="text-sm text-gray-700">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="mb-8">
        <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-4 pb-2 border-b-2 border-gray-900">Education</h2>
        <div className="space-y-4">
          {data.education.map((edu, idx) => (
            <div key={idx}>
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-base">{edu.degree}</h3>
                <span className="text-xs text-gray-600">{edu.graduationDate}</span>
              </div>
              <p className="text-sm text-gray-700">{edu.school}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="mb-8">
        <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-4 pb-2 border-b-2 border-gray-900">Skills</h2>
        <div className="grid grid-cols-3 gap-3">
          {data.skills.map((skill, idx) => (
            <div key={idx} className="text-sm font-medium text-gray-700">• {skill}</div>
          ))}
        </div>
      </div>

      {/* Languages */}
      {data.languages && data.languages.length > 0 && (
        <div>
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-4 pb-2 border-b-2 border-gray-900">Languages</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.languages.map((lang, idx) => (
              <div key={idx}>
                <p className="font-medium text-gray-900">{lang.name}</p>
                <p className="text-xs text-gray-600">{lang.level}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
