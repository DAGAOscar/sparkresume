'use client';

import React from 'react';
import { CVData } from '@/app/utils/templates';
import { ContactLinks } from './ContactLinks';import { SectionRenderer } from './SectionRenderer';import { Mail, Phone, MapPin, Award } from 'lucide-react';

interface HealthcareTemplateProps {
  data: CVData;
}

export const HealthcareTemplate: React.FC<HealthcareTemplateProps> = ({ data }) => {
  return (
    <div className="w-full bg-white text-gray-900 p-8 font-sans" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      {/* Header */}
      <div className="mb-8 pb-6 border-b-4 border-emerald-600">
        <h1 className="text-4xl font-bold text-emerald-700 mb-3">{data.name}</h1>
        <div className="flex flex-wrap gap-4 items-center text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-emerald-600" />
            <span>{data.email}</span>
            <ContactLinks links={data.links} inline className="text-sm" />
          </div>
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-emerald-600" />
            <span>{data.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-emerald-600" />
            <span>{data.location}</span>
          </div>
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-8">
          <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-3">Professional Summary</h2>
          <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
        </div>
      )}

      {/* Clinical Experience */}
      <div className="mb-8">
        <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-4">Clinical & Professional Experience</h2>
        <div className="space-y-5">
          {data.experience.map((exp, idx) => (
            <div key={idx} className="bg-emerald-50 p-4 rounded-lg border-l-4 border-emerald-600">
              <h3 className="font-bold text-base text-gray-900">{exp.title}</h3>
              <p className="text-sm text-emerald-700 font-semibold mb-1">{exp.company}</p>
              <p className="text-xs text-gray-600 mb-2">
                {exp.startDate} – {exp.endDate || 'Current'}
              </p>
              <p className="text-sm text-gray-700">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Education & Credentials */}
      <div className="mb-8">
        <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-4">Medical Education & Credentials</h2>
        <div className="space-y-4">
          {data.education.map((edu, idx) => (
            <div key={idx} className="border-l-4 border-emerald-400 pl-4">
              <h3 className="font-bold text-base text-gray-900">{edu.degree}</h3>
              <p className="text-sm text-emerald-700">{edu.field}</p>
              <p className="text-sm text-gray-600">{edu.school}</p>
              <p className="text-xs text-gray-600">{edu.graduationDate}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Professional Competencies */}
      <div className="mb-8">
        <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-3">Professional Competencies</h2>
        <div className="grid grid-cols-2 gap-2">
          {data.skills.map((skill, idx) => (
            <div key={idx} className="text-sm font-medium text-gray-800 flex items-center gap-2">
              <span className="text-emerald-600">✓</span> {skill}
            </div>
          ))}
        </div>
      </div>

      {/* Languages */}
      {data.languages && data.languages.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-3">Language Proficiency</h2>
          <div className="space-y-2">
            {data.languages.map((lang, idx) => (
              <div key={idx} className="text-sm">
                <span className="font-semibold text-gray-900">◆ {lang.name}:</span>
                <span className="text-gray-700"> {lang.level}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {data.certifications && data.certifications.length > 0 && (
        <div className="border-t-2 border-emerald-200 pt-6">
          <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-3 flex items-center gap-2">
            <Award size={16} /> Certifications & Licenses
          </h2>
          <div className="space-y-1">
            {data.certifications.map((cert, idx) => (
              <p key={idx} className="text-sm text-gray-700">✓ {typeof cert === 'string' ? cert : cert.name}</p>
            ))}
          </div>
        </div>
      )}
      <SectionRenderer data={data} className="mb-8" />
    </div>
  );
};
