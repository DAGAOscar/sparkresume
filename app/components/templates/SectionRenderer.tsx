import React from 'react';
import { CVData } from '@/app/utils/templates';

interface SectionRendererProps {
  data: CVData;
  className?: string;
}

export const SectionRenderer: React.FC<SectionRendererProps> = ({ data, className = '' }) => {
  return (
    <>
      {/* Note: Links are rendered separately in each template next to email */}

      {/* Certificates */}
      {data.certifications && data.certifications.length > 0 && (
        <div className={className}>
          <h2 className="font-bold mb-3">Certificates</h2>
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
        <div className={className}>
          <h2 className="font-bold mb-3">Awards</h2>
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
        <div className={className}>
          <h2 className="font-bold mb-3">Courses</h2>
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
        <div className={className}>
          <h2 className="font-bold mb-3">Organizations</h2>
          <div className="flex flex-wrap gap-2">
            {data.organizations.map((org, idx) => (
              <span key={idx} className="text-sm">• {org}</span>
            ))}
          </div>
        </div>
      )}

      {/* Publications */}
      {data.publications && data.publications.length > 0 && (
        <div className={className}>
          <h2 className="font-bold mb-3">Publications</h2>
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
        <div className={className}>
          <h2 className="font-bold mb-3">References</h2>
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
        <div className={className}>
          <h2 className="font-bold mb-3">Interests</h2>
          <div className="flex flex-wrap gap-2">
            {data.interests.map((interest, idx) => (
              <span key={idx} className="text-sm">• {interest}</span>
            ))}
          </div>
        </div>
      )}

      {/* Declaration */}
      {data.declaration && (
        <div className={className}>
          <p className="text-xs italic text-gray-600">{data.declaration}</p>
        </div>
      )}

      {/* Custom Sections */}
      {data.customSections && data.customSections.length > 0 && (
        <>
          {data.customSections.map((section, idx) => (
            <div key={idx} className={className}>
              <h2 className="font-bold mb-3">
                {section.icon && <span className="mr-2">{section.icon}</span>}
                {section.title}
              </h2>
              <p className="text-sm whitespace-pre-line text-gray-700">{section.content}</p>
            </div>
          ))}
        </>
      )}
    </>
  );
};
