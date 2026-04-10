'use client';

import React from 'react';
import { Education, Experience, Language, PersonalDetails, Skill, Hobby } from '@/type';
import Image from 'next/image';
import { Mail, MapPin, Phone, Star } from 'lucide-react';

type CVModelProps = {
  personalDetails: PersonalDetails;
  file: File | null;
  theme: string;
  experiences: Experience[];
  educations: Education[];
  languages: Language[];
  skills: Skill[];
  hobbies: Hobby[];
  download?: boolean;
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

const getStarRating = (proficiency: string) => {
  let filledStars = 0;
  switch (proficiency) {
    case 'Débutant':
      filledStars = 1;
      break;
    case 'Intermédiaire':
      filledStars = 3;
      break;
    case 'Avancé':
      filledStars = 5;
      break;
    default:
      filledStars = 0;
  }
  return (
    <>
      {Array.from({ length: filledStars }, (_, index) => (
        <Star key={index} className="text-primary" />
      ))}
      {Array.from({ length: 5 - filledStars }, (_, index) => (
        <Star key={index + filledStars} className="text-gray-300" />
      ))}
    </>
  );
};

// MODÈLE 1: MODERN (Deux colonnes)
export const CVModelModern = React.forwardRef<HTMLDivElement, CVModelProps>(
  (
    {
      personalDetails,
      file,
      theme,
      experiences,
      educations,
      languages,
      skills,
      hobbies,
      download,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`p-16 w-full md:w-[870px] lg:w-[950px] h-auto md:h-[1100px] lg:h-[1200px] shadow-lg ${download ? 'mb-10' : ''}`}
        data-theme={theme}
      >
        {/* Left Sidebar */}
        <div className="w-1/3 bg-primary/10 p-8 rounded-l-lg">
          {/* Profile Photo */}
          <div className="mb-6 flex justify-center">
            <div className="w-32 h-32 rounded-full border-4 border-primary overflow-hidden">
              {file && (
                <Image
                  src={URL.createObjectURL(file)}
                  width={128}
                  height={128}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="mb-8">
            <h3 className="font-bold text-primary uppercase mb-4">Contact</h3>
            <div className="space-y-2 text-sm">
              {personalDetails.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4" />
                  <span>{personalDetails.phone}</span>
                </div>
              )}
              {personalDetails.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4" />
                  <span className="truncate">{personalDetails.email}</span>
                </div>
              )}
              {personalDetails.address && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4" />
                  <span>{personalDetails.address}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-8">
              <h3 className="font-bold text-primary uppercase mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <span key={idx} className="badge badge-primary text-xs">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div className="mb-8">
              <h3 className="font-bold text-primary uppercase mb-4">Languages</h3>
              <div className="space-y-2">
                {languages.map((lang, idx) => (
                  <div key={idx} className="text-sm">
                    <p className="font-semibold mb-1">{lang.language}</p>
                    <div className="flex gap-1">{getStarRating(lang.proficiency)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hobbies */}
          {hobbies.length > 0 && (
            <div>
              <h3 className="font-bold text-primary uppercase mb-4">Hobbies</h3>
              <ul className="space-y-1 text-sm">
                {hobbies.map((hobby, idx) => (
                  <li key={idx}>• {hobby.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="w-2/3 p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-primary mb-2">
              {personalDetails.fullName}
            </h1>
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">
              {personalDetails.postSeeking}
            </h2>
            {personalDetails.description && (
              <p className="text-sm leading-relaxed text-gray-700">
                {personalDetails.description}
              </p>
            )}
          </div>

          {/* Experience */}
          {experiences.length > 0 && (
            <div className="mb-8">
              <h3 className="font-bold text-xl text-primary uppercase mb-4 pb-2 border-b-2 border-primary">
                Experience
              </h3>
              <div className="space-y-4">
                {experiences.map((exp, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-base">{exp.jobTitle}</h4>
                        <p className="text-primary font-semibold text-sm">{exp.companyName}</p>
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                      </span>
                    </div>
                    <p className="text-sm mt-2 text-gray-700">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {educations.length > 0 && (
            <div>
              <h3 className="font-bold text-xl text-primary uppercase mb-4 pb-2 border-b-2 border-primary">
                Education
              </h3>
              <div className="space-y-3">
                {educations.map((edu, idx) => (
                  <div key={idx}>
                    <h4 className="font-bold text-base">{edu.degree}</h4>
                    <p className="text-primary text-sm">{edu.school}</p>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>{formatDate(edu.endDate)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);
CVModelModern.displayName = 'CVModelModern';

// MODÈLE 2: MINIMAL (Clean)
export const CVModelMinimal = React.forwardRef<HTMLDivElement, CVModelProps>(
  (
    {
      personalDetails,
      theme,
      experiences,
      educations,
      languages,
      skills,
      download,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`p-16 w-full md:w-[870px] lg:w-[950px] h-auto md:h-[1100px] lg:h-[1200px] shadow-lg ${download ? 'mb-10' : ''}`}
        data-theme={theme}
      >
        <div className="w-full">
          {/* Header */}
          <div className="mb-12 border-b-2 border-base-300 pb-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{personalDetails.fullName}</h1>
            <p className="text-lg md:text-2xl text-primary font-semibold mb-4">
              {personalDetails.postSeeking}
            </p>
            <div className="flex gap-6 text-sm">
              {personalDetails.email && <span>{personalDetails.email}</span>}
              {personalDetails.phone && <span>{personalDetails.phone}</span>}
              {personalDetails.address && <span>{personalDetails.address}</span>}
            </div>
          </div>

          {/* Summary */}
          {personalDetails.description && (
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">{personalDetails.description}</p>
            </div>
          )}

          {/* Experience */}
          {experiences.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold uppercase mb-4 text-primary">Experience</h3>
              <div className="space-y-4">
                {experiences.map((exp, idx) => (
                  <div key={idx} className="border-l-4 border-primary pl-4">
                    <h4 className="font-bold">{exp.jobTitle}</h4>
                    <p className="text-sm text-gray-600">{exp.companyName}</p>
                    <p className="text-xs text-gray-500">
                      {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                    </p>
                    <p className="text-sm mt-2">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {educations.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold uppercase mb-4 text-primary">Education</h3>
              <div className="space-y-3">
                {educations.map((edu, idx) => (
                  <div key={idx} className="border-l-4 border-primary pl-4">
                    <h4 className="font-bold">{edu.degree}</h4>
                    <p className="text-sm text-gray-600">{edu.school}</p>
                    <p className="text-xs text-gray-500">{formatDate(edu.endDate)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold uppercase mb-4 text-primary">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <span key={idx} className="bg-primary/20 px-3 py-1 rounded text-sm">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div>
              <h3 className="text-lg font-bold uppercase mb-4 text-primary">Languages</h3>
              <div className="space-y-2 text-sm">
                {languages.map((lang, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span className="font-semibold">{lang.language}</span>
                    <span className="text-gray-600">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);
CVModelMinimal.displayName = 'CVModelMinimal';

// MODÈLE 3: CREATIVE (Coloré et moderne)
export const CVModelCreative = React.forwardRef<HTMLDivElement, CVModelProps>(
  (
    {
      personalDetails,
      file,
      theme,
      experiences,
      educations,
      skills,
      download,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`p-16 w-full md:w-[870px] lg:w-[950px] h-auto md:h-[1100px] lg:h-[1200px] shadow-lg ${download ? 'mb-10' : ''}`}
        data-theme={theme}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="bg-gradient-to-b from-primary to-primary/80 text-primary-content p-8 rounded-lg md:rounded-none">
            {/* Photo */}
            {file && (
              <div className="mb-8 flex justify-center">
                <div className="w-28 h-28 rounded-full border-4 border-primary-content overflow-hidden">
                  <Image
                    src={URL.createObjectURL(file)}
                    width={112}
                    height={112}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            {/* Name */}
            <h1 className="text-3xl font-bold mb-1">{personalDetails.fullName}</h1>
            <p className="text-lg font-semibold mb-6 opacity-90">{personalDetails.postSeeking}</p>

            {/* Contact */}
            <div className="space-y-3 text-sm mb-8">
              {personalDetails.phone && <div>📱 {personalDetails.phone}</div>}
              {personalDetails.email && <div>✉️ {personalDetails.email}</div>}
              {personalDetails.address && <div>📍 {personalDetails.address}</div>}
            </div>

            {/* Skills */}
            {skills.length > 0 && (
              <div>
                <h3 className="font-bold uppercase mb-3 text-sm">Skills</h3>
                <div className="space-y-2 text-sm">
                  {skills.map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary-content"></div>
                      {skill.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Columns */}
          <div className="col-span-2">
            {/* Summary */}
            {personalDetails.description && (
              <div className="mb-6 p-4 bg-primary/10 rounded-lg">
                <p className="text-sm leading-relaxed">{personalDetails.description}</p>
              </div>
            )}

            {/* Experience */}
            {experiences.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-bold uppercase mb-3 text-primary">Experience</h3>
                <div className="space-y-3">
                  {experiences.map((exp, idx) => (
                    <div key={idx} className="pb-3 border-b border-base-300">
                      <h4 className="font-bold text-base">{exp.jobTitle}</h4>
                      <p className="text-primary font-semibold text-sm">{exp.companyName}</p>
                      <p className="text-xs text-gray-500 mb-2">
                        {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                      </p>
                      <p className="text-sm">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {educations.length > 0 && (
              <div>
                <h3 className="text-lg font-bold uppercase mb-3 text-primary">Education</h3>
                <div className="space-y-2">
                  {educations.map((edu, idx) => (
                    <div key={idx} className="pb-2 border-b border-base-300">
                      <h4 className="font-bold">{edu.degree}</h4>
                      <p className="text-sm text-gray-600">{edu.school}</p>
                      <p className="text-xs text-gray-500">{formatDate(edu.endDate)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);
CVModelCreative.displayName = 'CVModelCreative';

// MODÈLE 4: PROFESSIONAL (Corporate)
export const CVModelProfessional = React.forwardRef<HTMLDivElement, CVModelProps>(
  (
    {
      personalDetails,
      theme,
      experiences,
      educations,
      languages,
      skills,
      download,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`p-20 w-full md:w-[870px] lg:w-[950px] h-auto md:h-[1100px] lg:h-[1200px] shadow-lg bg-white ${download ? 'mb-10' : ''}`}
        data-theme={theme}
      >
        <div className="w-full">
          {/* Professional Header */}
          <div className="uppercase tracking-widest mb-12">
            <h1 className="text-4xl font-black mb-2">{personalDetails.fullName}</h1>
            <div className="w-20 h-1 bg-primary mb-4"></div>
            <h2 className="text-xl font-bold text-primary">{personalDetails.postSeeking}</h2>
            <p className="text-xs text-gray-500 mt-4 space-y-1">
              {personalDetails.email && <div>{personalDetails.email}</div>}
              {personalDetails.phone && <div>{personalDetails.phone}</div>}
              {personalDetails.address && <div>{personalDetails.address}</div>}
            </p>
          </div>

          {/* Professional Summary */}
          {personalDetails.description && (
            <div className="mb-8">
              <p className="text-sm leading-relaxed text-gray-700">{personalDetails.description}</p>
            </div>
          )}

          {/* Professional Experience */}
          {experiences.length > 0 && (
            <div className="mb-8">
              <h3 className="font-black text-sm uppercase tracking-widest mb-4">Professional Experience</h3>
              <div className="space-y-6">
                {experiences.map((exp, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-base">{exp.jobTitle}</h4>
                      <span className="text-xs text-gray-500">
                        {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                      </span>
                    </div>
                    <p className="font-semibold text-sm text-primary mb-2">{exp.companyName}</p>
                    <p className="text-sm text-gray-700">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {educations.length > 0 && (
            <div className="mb-8">
              <h3 className="font-black text-sm uppercase tracking-widest mb-4">Education</h3>
              <div className="space-y-3">
                {educations.map((edu, idx) => (
                  <div key={idx}>
                    <h4 className="font-bold text-sm">{edu.degree}</h4>
                    <p className="text-sm text-primary">{edu.school}</p>
                    <p className="text-xs text-gray-500">{formatDate(edu.endDate)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills & Languages */}
          <div className="grid grid-cols-2 gap-8">
            {skills.length > 0 && (
              <div>
                <h3 className="font-black text-sm uppercase tracking-widest mb-3">Core Competencies</h3>
                <div className="space-y-1 text-sm">
                  {skills.map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-primary rounded-full"></span>
                      {skill.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {languages.length > 0 && (
              <div>
                <h3 className="font-black text-sm uppercase tracking-widest mb-3">Languages</h3>
                <div className="space-y-1 text-sm">
                  {languages.map((lang, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>{lang.language}</span>
                      <span className="text-gray-600">{lang.proficiency}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);
CVModelProfessional.displayName = 'CVModelProfessional';
