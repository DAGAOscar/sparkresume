'use client';

import React from 'react';
import { CVData } from '@/app/utils/templates';
import { ContactLinks } from './ContactLinks';

interface ClassicTemplateProps {
  data: CVData;
}

export const ClassicTemplate: React.FC<ClassicTemplateProps> = ({ data }) => {
  return (
    <div className="w-full bg-white text-black p-4 md:p-6 lg:p-8" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif', fontSize: '15px', lineHeight: '1.6', letterSpacing: '-0.3px' }}>
      {/* Header */}
      <div className="mb-4 md:mb-5 lg:mb-6 pb-3 md:pb-4 lg:pb-6 border-b-2 border-black">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2" style={{ fontFamily: 'var(--font-playfair)', fontWeight: 700, letterSpacing: '-0.5px' }}>{data.name}</h1>
        <div className="flex flex-wrap gap-3 items-center text-xs">
          <span>{data.email}</span>
          <span>•</span>
          <span>{data.phone}</span>
          <span>•</span>
          <span>{data.location}</span>
          <ContactLinks links={data.links} inline className="text-xs" />
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-4 md:mb-5 lg:mb-6">
          <h2 className="text-base md:text-lg font-bold mb-3 uppercase tracking-wide">Professional Summary</h2>
          <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      <div className="mb-4 md:mb-5 lg:mb-6">
        <h2 className="text-base md:text-lg font-bold mb-3 uppercase tracking-wide">Professional Experience</h2>
        <div className="space-y-4">
          {data.experience.map((exp, idx) => (
            <div key={idx}>
              <div className="flex flex-col md:flex-row md:justify-between items-start">
                <div>
                  <h3 className="font-bold text-sm md:text-base">{exp.title}</h3>
                  <p className="text-gray-600 italic">{exp.company}</p>
                </div>
                <span className="text-sm text-gray-600">
                  {exp.startDate} – {exp.endDate || 'Present'}
                </span>
              </div>
              <p className="text-sm text-gray-700 mt-1">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="mb-4 md:mb-5 lg:mb-6">
        <h2 className="text-base md:text-lg font-bold mb-3 uppercase tracking-wide">Education</h2>
        <div className="space-y-3">
          {data.education.map((edu, idx) => (
            <div key={idx}>
              <div className="flex flex-col md:flex-row md:justify-between items-start">
                <div>
                  <h3 className="font-bold text-sm md:text-base">{edu.degree}</h3>
                  <p className="text-gray-600">{edu.school}</p>
                </div>
                <span className="text-sm text-gray-600">{edu.graduationDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="mb-4 md:mb-5 lg:mb-6">
        <h2 className="text-base md:text-lg font-bold mb-3 uppercase tracking-wide">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill, idx) => (
            <span key={idx} className="bg-gray-200 px-2 py-1 md:px-3 md:py-1 text-sm rounded">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Languages */}
      {data.languages && data.languages.length > 0 && (
        <div className="mb-4 md:mb-5 lg:mb-6">
          <h2 className="text-base md:text-lg font-bold mb-3 uppercase tracking-wide">Languages</h2>
          <div className="space-y-1">
            {data.languages.map((lang, idx) => (
              <p key={idx} className="text-sm">
                <span className="font-semibold">{lang.name}</span> – {lang.level}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Certificates */}
      {data.certifications && data.certifications.length > 0 && (
        <div className="mb-4 md:mb-5 lg:mb-6">
          <h2 className="text-base md:text-lg font-bold mb-3 uppercase tracking-wide">Certificates</h2>
          <div className="space-y-2">
            {data.certifications.map((cert, idx) => (
              <div key={idx}>
                <p className="font-semibold text-sm">{cert.name}</p>
                <p className="text-xs text-gray-600">{cert.issuer} • {cert.date}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Awards */}
      {data.awards && data.awards.length > 0 && (
        <div className="mb-4 md:mb-5 lg:mb-6">
          <h2 className="text-base md:text-lg font-bold mb-3 uppercase tracking-wide">Awards</h2>
          <div className="space-y-2">
            {data.awards.map((award, idx) => (
              <div key={idx}>
                <p className="font-semibold text-sm">{award.title}</p>
                <p className="text-xs text-gray-600">{award.organization} • {award.date}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Courses */}
      {data.courses && data.courses.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3 uppercase tracking-wide">Courses</h2>
          <div className="space-y-2">
            {data.courses.map((course, idx) => (
              <div key={idx}>
                <p className="font-semibold text-sm">{course.name}</p>
                <p className="text-xs text-gray-600">{course.provider} • {course.date}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Organizations */}
      {data.organizations && data.organizations.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3 uppercase tracking-wide">Organizations</h2>
          <div className="flex flex-wrap gap-2">
            {data.organizations.map((org, idx) => (
              <span key={idx} className="text-sm text-gray-700">• {org}</span>
            ))}
          </div>
        </div>
      )}

      {/* Publications */}
      {data.publications && data.publications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3 uppercase tracking-wide">Publications</h2>
          <div className="space-y-2">
            {data.publications.map((pub, idx) => (
              <div key={idx}>
                <p className="font-semibold text-sm">{pub.title}</p>
                <p className="text-xs text-gray-600">{pub.publisher} • {pub.date}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* References */}
      {data.references && data.references.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3 uppercase tracking-wide">References</h2>
          <div className="space-y-2">
            {data.references.map((ref, idx) => (
              <div key={idx} className="text-sm">
                <p className="font-semibold">{ref.name}</p>
                <p className="text-xs text-gray-600">{ref.position} at {ref.company}</p>
                <p className="text-xs text-gray-600">{ref.email} • {ref.phone}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interests */}
      {data.interests && data.interests.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3 uppercase tracking-wide">Interests</h2>
          <div className="flex flex-wrap gap-2">
            {data.interests.map((interest, idx) => (
              <span key={idx} className="text-sm text-gray-700">• {interest}</span>
            ))}
          </div>
        </div>
      )}

      {/* Declaration */}
      {data.declaration && (
        <div className="mb-6 p-3 bg-gray-100 border-l-4 border-gray-400">
          <p className="text-xs italic">{data.declaration}</p>
        </div>
      )}

      {/* Custom Sections */}
      {data.customSections && data.customSections.length > 0 && (
        <div>
          {data.customSections.map((section, idx) => (
            <div key={idx} className="mb-6">
              <h2 className="text-lg font-bold mb-3 uppercase tracking-wide">
                {section.icon && <span className="mr-2">{section.icon}</span>}
                {section.title}
              </h2>
              <p className="text-sm text-gray-700 whitespace-pre-line">{section.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
