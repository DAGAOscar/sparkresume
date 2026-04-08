export interface Certificate {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface Award {
  title: string;
  organization: string;
  date: string;
  description?: string;
}

export interface Course {
  name: string;
  provider: string;
  date: string;
  certificateIssued?: boolean;
}

export interface Publication {
  title: string;
  publisher: string;
  date: string;
  url?: string;
}

export interface Reference {
  name: string;
  position: string;
  company: string;
  email: string;
  phone: string;
}

export interface CustomSection {
  title: string;
  content: string;
  icon?: string;
}

export interface Link {
  label: string;
  url: string;
  icon?: string;
}

export interface CVData {
  name: string;
  email: string;
  phone: string;
  location: string;
  summary?: string;
  links?: Link[];
  experience: Experience[];
  education: Education[];
  skills: string[];
  languages?: Language[];
  certifications?: Certificate[];
  projects?: Project[];
  courses?: Course[];
  awards?: Award[];
  organizations?: string[];
  publications?: Publication[];
  references?: Reference[];
  interests?: string[];
  declaration?: string;
  customSections?: CustomSection[];
}

export interface Experience {
  title: string;
  company: string;
  startDate: string;
  endDate?: string;
  description: string;
  current?: boolean;
}

export interface Education {
  degree: string;
  school: string;
  field: string;
  graduationDate: string;
  gpa?: string;
}

export interface Language {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Fluent';
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  date?: string;
}

export abstract class CVTemplate {
  abstract render(data: CVData): string;
  abstract getName(): string;
  abstract getDescription(): string;
}

export class TemplateV1 extends CVTemplate {
  getName(): string {
    return 'Classic Professional';
  }

  getDescription(): string {
    return 'Traditional CV with clear sections and professional formatting';
  }

  render(data: CVData): string {
    return `
${data.name.toUpperCase()}
═════════════════════════════════════════════════════════

${data.email} | ${data.phone} | ${data.location}

${data.summary ? `\nPROFESSIONAL SUMMARY\n${data.summary}\n` : ''}

EXPERIENCE
${data.experience.map(e => `
  ${e.title} - ${e.company}
  ${e.startDate} ${e.endDate ? `- ${e.endDate}` : '- Present'}
  ${e.description}
`).join('')}

EDUCATION
${data.education.map(e => `
  ${e.degree} in ${e.field}
  ${e.school} | ${e.graduationDate}
  ${e.gpa ? `GPA: ${e.gpa}` : ''}
`).join('')}

SKILLS
${data.skills.join(' • ')}
${data.languages ? `\nLANGUAGES\n${data.languages.map(l => `${l.name} - ${l.level}`).join('\n')}` : ''}
    `;
  }
}

export class TemplateV2 extends CVTemplate {
  getName(): string {
    return 'Modern Minimalist';
  }

  getDescription(): string {
    return 'Clean and minimal design focusing on content';
  }

  render(data: CVData): string {
    return `
${data.name}
${data.email} • ${data.phone} • ${data.location}

${data.summary ? `${data.summary}\n` : ''}

▸ CAREER HISTORY
${data.experience.map(e => `  ${e.title} at ${e.company} (${e.startDate}${e.endDate ? `-${e.endDate}` : '-Now'})
    ${e.description}`).join('\n\n')}

▸ EDUCATION
${data.education.map(e => `  ${e.degree} • ${e.school}
    ${e.field} | ${e.graduationDate}`).join('\n\n')}

▸ COMPETENCIES
${data.skills.map(s => `  • ${s}`).join('\n')}
${data.languages ? `\n▸ LANGUAGES\n${data.languages.map(l => `  ${l.name} (${l.level})`).join('\n')}` : ''}
    `;
  }
}

export class TemplateV3 extends CVTemplate {
  getName(): string {
    return 'Executive Summary';
  }

  getDescription(): string {
    return 'Highlights achievements and leadership experience';
  }

  render(data: CVData): string {
    return `
═════════════════════════════════════════════════════════
${data.name.toUpperCase()}
═════════════════════════════════════════════════════════
${data.email} | ${data.phone} | ${data.location}

EXECUTIVE PROFILE
─────────────────
${data.summary || 'Dynamic professional with proven track record'}

PROFESSIONAL ACHIEVEMENTS
─────────────────────────
${data.experience.map((e, i) => `
${i + 1}. ${e.title} - ${e.company}
   Period: ${e.startDate} to ${e.endDate || 'Present'}
   Achievement: ${e.description}`).join('\n')}

ACADEMIC BACKGROUND
───────────────────
${data.education.map(e => `
${e.degree} in ${e.field}
${e.school} | Graduated: ${e.graduationDate}
${e.gpa ? `Performance: ${e.gpa}` : ''}`).join('\n')}

CORE COMPETENCIES
─────────────────
${data.skills.map(s => s).join(' | ')}
${data.languages ? `\nLINGUISTIC PROFICIENCY\n────────────────────\n${data.languages.map(l => `• ${l.name}: ${l.level}`).join('\n')}` : ''}
    `;
  }
}

export class TemplateV4 extends CVTemplate {
  getName(): string {
    return 'Chronological Detailed';
  }

  getDescription(): string {
    return 'In-depth chronological presentation with detailed descriptions';
  }

  render(data: CVData): string {
    return `
${data.name}
${data.email} • ${data.phone} • ${data.location}

${'─'.repeat(60)}

PROFESSIONAL OBJECTIVE
${data.summary || 'Seeking position to leverage skills and experience'}

${'─'.repeat(60)}

WORK HISTORY

${data.experience.map(e => `
Position: ${e.title}
Employer: ${e.company}
Duration: ${e.startDate} - ${e.endDate || 'Current'}
Responsibilities & Achievements:
${e.description}
`).join('─'.repeat(60) + '\n')}

${'─'.repeat(60)}

EDUCATIONAL QUALIFICATIONS

${data.education.map(e => `
Qualification: ${e.degree}
Field of Study: ${e.field}
Institution: ${e.school}
Date of Completion: ${e.graduationDate}
${e.gpa ? `Grade Point Average: ${e.gpa}` : ''}
`).join('')}

${'─'.repeat(60)}

TECHNICAL & PROFESSIONAL SKILLS

${data.skills.map(s => `✓ ${s}`).join('\n')}

${data.languages ? `\nLANGUAGE PROFICIENCY\n${data.languages.map(l => `◆ ${l.name} (${l.level})`).join('\n')}` : ''}
    `;
  }
}

export class TemplateV5 extends CVTemplate {
  getName(): string {
    return 'Tech-Focused';
  }

  getDescription(): string {
    return 'Perfect for technology and IT professionals';
  }

  render(data: CVData): string {
    return `
${data.name}
${data.email} | ${data.phone}
${data.location}

[PROFILE]
${data.summary || 'Experienced tech professional'}

[TECHNICAL EXPERTISE]
${data.skills.join(' → ')}

[PROFESSIONAL EXPERIENCE]
${data.experience.map(e => `
┌─ ${e.title} @ ${e.company} (${e.startDate}–${e.endDate || 'Present'})
│
└─ ${e.description}`).join('\n\n')}

[EDUCATION]
${data.education.map(e => `${e.degree} in ${e.field} | ${e.school} (${e.graduationDate})`).join('\n')}

[TECHNICAL SKILLS]
${data.skills.map(s => `▪ ${s}`).join('\n')}

${data.languages ? `\n[LANGUAGES]\n${data.languages.map(l => `✦ ${l.name}: ${l.level}`).join('\n')}` : ''}
    `;
  }
}

export class TemplateV6 extends CVTemplate {
  getName(): string {
    return 'Creative Designer';
  }

  getDescription(): string {
    return 'Artistic and creative presentation for designers and artists';
  }

  render(data: CVData): string {
    return `
✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦
    ${data.name}
✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦

📧 ${data.email}
📱 ${data.phone}
📍 ${data.location}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

◆ ABOUT ME
${data.summary || 'Creative professional with passion for design'}

◆ EXPERIENCE
${data.experience.map(e => `
🎯 ${e.title}
   ${e.company} | ${e.startDate} – ${e.endDate || 'Now'}
   "${e.description}"`).join('\n')}

◆ EDUCATION
${data.education.map(e => `
🎓 ${e.degree} in ${e.field}
   ${e.school} • ${e.graduationDate}`).join('\n')}

◆ SKILLS
${data.skills.map(s => `★ ${s}`).join('\n')}

${data.languages ? `\n◆ LANGUAGES\n${data.languages.map(l => `🌐 ${l.name} - ${l.level}`).join('\n')}` : ''}
    `;
  }
}

export class TemplateV7 extends CVTemplate {
  getName(): string {
    return 'Functional Resume';
  }

  getDescription(): string {
    return 'Skills-based layout emphasizing competencies over chronology';
  }

  render(data: CVData): string {
    return `
${data.name}
${data.email} | ${data.phone} | ${data.location}

══════════════════════════════════════════════════════════════

PROFESSIONAL PROFILE
${data.summary || ''}

══════════════════════════════════════════════════════════════

CORE COMPETENCIES

${data.skills.map(s => s).join(' | ')}

══════════════════════════════════════════════════════════════

PROFESSIONAL EXPERIENCE

${data.experience.map(e => `
${e.title}
${e.company} | ${e.startDate} - ${e.endDate || 'Ongoing'}
• ${e.description}`).join('\n\n')}

══════════════════════════════════════════════════════════════

EDUCATION

${data.education.map(e => `
${e.degree} in ${e.field}
${e.school} • ${e.graduationDate}`).join('\n\n')}

${data.languages ? `\n══════════════════════════════════════════════════════════════\n\nLANGUAGES\n${data.languages.map(l => `${l.name} – ${l.level}`).join('\n')}` : ''}
    `;
  }
}

export class TemplateV8 extends CVTemplate {
  getName(): string {
    return 'Corporate Professional';
  }

  getDescription(): string {
    return 'Formal corporate style for business professionals';
  }

  render(data: CVData): string {
    return `
${' '.repeat(20)}${data.name.toUpperCase()}

${' '.repeat(15)}${data.email} | ${data.phone} | ${data.location}

SUMMARY
────────────────────────────────────────────────────────────
${data.summary || 'Results-driven professional'}

PROFESSIONAL EXPERIENCE
────────────────────────────────────────────────────────────
${data.experience.map(e => `
${e.title}
${e.company}
${e.startDate} - ${e.endDate || 'Present'}

${e.description}
`).join('\n')}

EDUCATION
────────────────────────────────────────────────────────────
${data.education.map(e => `
${e.degree}
${e.field}
${e.school}, ${e.graduationDate}
`).join('\n')}

TECHNICAL SKILLS
────────────────────────────────────────────────────────────
${data.skills.map(s => `• ${s}`).join('\n')}

${data.languages ? `\nLANGUAGE ABILITIES\n────────────────────────────────────────────────────────────\n${data.languages.map(l => `• ${l.name}: ${l.level}`).join('\n')}` : ''}
    `;
  }
}

export class TemplateV9 extends CVTemplate {
  getName(): string {
    return 'Academic Scholar';
  }

  getDescription(): string {
    return 'Academic-focused CV for researchers and educators';
  }

  render(data: CVData): string {
    return `
${data.name}
${data.email} | ${data.phone} | ${data.location}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ACADEMIC PROFILE
${data.summary || ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EDUCATIONAL BACKGROUND

${data.education.map(e => `
• ${e.degree} in ${e.field}
  ${e.school}, ${e.graduationDate}
  ${e.gpa ? `GPA: ${e.gpa}` : ''}`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ACADEMIC EXPERIENCE

${data.experience.map(e => `
${e.title} at ${e.company}
${e.startDate} - ${e.endDate || 'Present'}
${e.description}`).join('\n\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

AREAS OF EXPERTISE

${data.skills.map(s => `» ${s}`).join('\n')}

${data.languages ? `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nLINGUISTIC PROFICIENCY\n${data.languages.map(l => `» ${l.name} (${l.level})`).join('\n')}` : ''}

${data.certifications ? `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nCERTIFICATIONS\n${data.certifications.map(c => `» ${c}`).join('\n')}` : ''}
    `;
  }
}

export class TemplateV10 extends CVTemplate {
  getName(): string {
    return 'Startup Entrepreneur';
  }

  getDescription(): string {
    return 'Dynamic format for startups and entrepreneurs';
  }

  render(data: CVData): string {
    return `
${data.name}

${data.email} ◆ ${data.phone} ◆ ${data.location}

🎯 VISION
${data.summary || 'Innovator and entrepreneur'}

💼 VENTURES & EXPERIENCE
${data.experience.map(e => `
◆ ${e.title} @ ${e.company}
  ${e.startDate} - ${e.endDate || 'Active'}
  ➜ ${e.description}`).join('\n')}

🎓 EDUCATION
${data.education.map(e => `◆ ${e.degree} in ${e.field} (${e.school}, ${e.graduationDate})`).join('\n')}

⚡ KEY STRENGTHS
${data.skills.map(s => `• ${s}`).join('\n')}

${data.languages ? `\n🌍 LANGUAGES\n${data.languages.map(l => `◆ ${l.name}: ${l.level}`).join('\n')}` : ''}

${data.projects ? `\n🚀 PROJECTS\n${data.projects.map(p => `◆ ${p.title}\n  ${p.description}\n  Tech: ${p.technologies.join(', ')}`).join('\n\n')}` : ''}
    `;
  }
}

export class TemplateV11 extends CVTemplate {
  getName(): string {
    return 'Healthcare Professional';
  }

  getDescription(): string {
    return 'Specialized for medical and healthcare professionals';
  }

  render(data: CVData): string {
    return `
═══════════════════════════════════════════════════════════════
                        ${data.name}
═══════════════════════════════════════════════════════════════

Contact: ${data.email} | Phone: ${data.phone} | Location: ${data.location}

───────────────────────────────────────────────────────────────

PROFESSIONAL SUMMARY
${data.summary || ''}

───────────────────────────────────────────────────────────────

CLINICAL & PROFESSIONAL EXPERIENCE

${data.experience.map(e => `
Position: ${e.title}
Healthcare Organization: ${e.company}
Period: ${e.startDate} - ${e.endDate || 'Current'}
Clinical Focus: ${e.description}`).join('\n\n')}

───────────────────────────────────────────────────────────────

MEDICAL EDUCATION & CREDENTIALS

${data.education.map(e => `
Qualification: ${e.degree}
Specialization: ${e.field}
Institution: ${e.school}
Graduation: ${e.graduationDate}
${e.gpa ? `Performance: ${e.gpa}` : ''}`).join('\n\n')}

───────────────────────────────────────────────────────────────

PROFESSIONAL COMPETENCIES

${data.skills.map(s => `✓ ${s}`).join('\n')}

${data.languages ? `\n───────────────────────────────────────────────────────────────\n\nLANGUAGE PROFICIENCY\n${data.languages.map(l => `◆ ${l.name}: ${l.level}`).join('\n')}` : ''}

${data.certifications ? `\n───────────────────────────────────────────────────────────────\n\nCERTIFICATIONS & LICENSES\n${data.certifications.map(c => `✓ ${c}`).join('\n')}` : ''}
    `;
  }
}

export class TemplateV12 extends CVTemplate {
  getName(): string {
    return 'Software Engineer';
  }

  getDescription(): string {
    return 'Technical resume for software development roles';
  }

  render(data: CVData): string {
    return `
${data.name}
${data.email} | ${data.phone} | ${data.location}

────────────────────────────────────────────────────────────

ABOUT
${data.summary || 'Skilled software engineer'}

────────────────────────────────────────────────────────────

DEVELOPMENT EXPERIENCE
${data.experience.map(e => `
▸ ${e.title} at ${e.company}
  ${e.startDate} - ${e.endDate || 'Present'}
  ${e.description}`).join('\n\n')}

────────────────────────────────────────────────────────────

EDUCATION
${data.education.map(e => `
${e.degree} in ${e.field}
${e.school} • ${e.graduationDate}`).join('\n\n')}

────────────────────────────────────────────────────────────

TECHNICAL SKILLS
${data.skills.map(s => `◆ ${s}`).join('\n')}

${data.languages ? `\n────────────────────────────────────────────────────────────\n\nLANGUAGES\n${data.languages.map(l => `◆ ${l.name} - ${l.level}`).join('\n')}` : ''}

${data.projects ? `\n────────────────────────────────────────────────────────────\n\nPROJECTS\n${data.projects.map(p => `\n${p.title}\n${p.description}\nTechnologies: ${p.technologies.join(', ')}`).join('\n')}` : ''}
    `;
  }
}

export class TemplateV13 extends CVTemplate {
  getName(): string {
    return 'Sales Professional';
  }

  getDescription(): string {
    return 'Results-driven format for sales and business development';
  }

  render(data: CVData): string {
    return `
${data.name}
${data.email} • ${data.phone} • ${data.location}

SALES & BUSINESS DEVELOPMENT PROFESSIONAL

EXECUTIVE SUMMARY
─────────────────
${data.summary || 'Results-oriented sales professional'}

SALES EXPERIENCE
────────────────
${data.experience.map(e => `
Position: ${e.title}
Company: ${e.company}
Period: ${e.startDate} - ${e.endDate || 'Present'}
Accomplishments: ${e.description}`).join('\n\n')}

EDUCATION
─────────
${data.education.map(e => `
${e.degree} in ${e.field}
${e.school} • ${e.graduationDate}`).join('\n\n')}

SALES SKILLS & COMPETENCIES
───────────────────────────
${data.skills.map(s => `★ ${s}`).join('\n')}

${data.languages ? `\nLANGUAGE PROFICIENCY\n──────────────────\n${data.languages.map(l => `★ ${l.name} - ${l.level}`).join('\n')}` : ''}
    `;
  }
}

export class TemplateV14 extends CVTemplate {
  getName(): string {
    return 'Project Manager';
  }

  getDescription(): string {
    return 'Leadership-focused format for project management professionals';
  }

  render(data: CVData): string {
    return `
${data.name}
${data.email} | ${data.phone} | ${data.location}

PROFESSIONAL OVERVIEW
${data.summary || 'Experienced project management professional'}

PROJECT MANAGEMENT EXPERIENCE
${data.experience.map(e => `
✦ ${e.title}
  ${e.company} | ${e.startDate} - ${e.endDate || 'Present'}
  ${e.description}`).join('\n\n')}

EDUCATIONAL BACKGROUND
${data.education.map(e => `
✦ ${e.degree} in ${e.field}
  ${e.school} | ${e.graduationDate}
  ${e.gpa ? `Grade: ${e.gpa}` : ''}`).join('\n\n')}

MANAGEMENT COMPETENCIES
${data.skills.map(s => `• ${s}`).join('\n')}

${data.languages ? `\nLANGUAGE ABILITIES\n${data.languages.map(l => `✦ ${l.name}: ${l.level}`).join('\n')}` : ''}

${data.certifications ? `\nCERTIFICATIONS\n${data.certifications.map(c => `✓ ${c}`).join('\n')}` : ''}
    `;
  }
}

export class TemplateV15 extends CVTemplate {
  getName(): string {
    return 'Marketing Manager';
  }

  getDescription(): string {
    return 'Dynamic layout for marketing and brand professionals';
  }

  render(data: CVData): string {
    return `
${data.name}
${data.email} | ${data.phone} | ${data.location}

━━ PROFESSIONAL PROFILE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${data.summary || ''}

━━ MARKETING EXPERIENCE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${data.experience.map(e => `
▪ ${e.title} at ${e.company}
  ${e.startDate} - ${e.endDate || 'Present'}
  ${e.description}`).join('\n')}

━━ EDUCATION ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${data.education.map(e => `
▪ ${e.degree} in ${e.field}
  ${e.school} | ${e.graduationDate}`).join('\n')}

━━ EXPERTISE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${data.skills.map(s => `✦ ${s}`).join('\n')}

${data.languages ? `\n━━ LANGUAGES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n${data.languages.map(l => `✦ ${l.name}: ${l.level}`).join('\n')}` : ''}
    `;
  }
}

export class TemplateV16 extends CVTemplate {
  getName(): string {
    return 'Creative & Portfolio';
  }

  getDescription(): string {
    return 'Portfolio-focused CV for creatives with project emphasis';
  }

  render(data: CVData): string {
    return `
${data.name}
Creative Professional

${data.email} ◇ ${data.phone} ◇ ${data.location}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CREATIVE VISION
${data.summary || 'Innovative creative professional'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PORTFOLIO & EXPERIENCE

${data.experience.map(e => `
✦ ${e.title} at ${e.company}
  ${e.startDate} - ${e.endDate || 'Active'}
  ${e.description}`).join('\n\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EDUCATION

${data.education.map(e => `
✦ ${e.degree} in ${e.field}
  ${e.school} | ${e.graduationDate}`).join('\n\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CREATIVE SKILLS

${data.skills.map(s => `● ${s}`).join('\n')}

${data.languages ? `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nLANGUAGES\n${data.languages.map(l => `✦ ${l.name}: ${l.level}`).join('\n')}` : ''}

${data.projects ? `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nFEATURED PROJECTS\n${data.projects.map(p => `\n✦ ${p.title}\n  ${p.description}\n  Tech Stack: ${p.technologies.join(' • ')}\n  ${p.link ? `Link: ${p.link}` : ''}`).join('\n')}` : ''}
    `;
  }
}

export class TemplateV17 extends CVTemplate {
  getName(): string {
    return 'Human Resources';
  }

  getDescription(): string {
    return 'Professional format for HR and people management roles';
  }

  render(data: CVData): string {
    return `
${data.name.toUpperCase()}

📧 ${data.email}  |  📱 ${data.phone}  |  📍 ${data.location}

PROFESSIONAL SUMMARY
${data.summary || ''}

HUMAN RESOURCES EXPERIENCE

${data.experience.map(e => `
◈ ${e.title}
  Organization: ${e.company}
  Duration: ${e.startDate} - ${e.endDate || 'Ongoing'}
  Contribution: ${e.description}`).join('\n\n')}

EDUCATION

${data.education.map(e => `
◈ ${e.degree} in ${e.field}
  ${e.school}
  Graduation Date: ${e.graduationDate}`).join('\n\n')}

CORE COMPETENCIES

${data.skills.map(s => `✓ ${s}`).join('\n')}

${data.languages ? `\n\nLINGUISTIC ABILITIES\n${data.languages.map(l => `◈ ${l.name} (${l.level})`).join('\n')}` : ''}
    `;
  }
}

export class TemplateV18 extends CVTemplate {
  getName(): string {
    return 'Legal Professional';
  }

  getDescription(): string {
    return 'Formal legal CV for lawyers and legal professionals';
  }

  render(data: CVData): string {
    return `
═════════════════════════════════════════════════════════════════
                    ${data.name}
═════════════════════════════════════════════════════════════════

${data.email}  |  ${data.phone}  |  ${data.location}

PROFESSIONAL PROFILE
${data.summary || 'Legal professional'}

LEGAL EXPERIENCE

${data.experience.map(e => `
Position: ${e.title}
Firm/Organization: ${e.company}
Term: ${e.startDate} - ${e.endDate || 'Present'}
Practice Areas/Responsibilities: ${e.description}`).join('\n\n')}

EDUCATION & QUALIFICATIONS

${data.education.map(e => `
Degree: ${e.degree}
Field: ${e.field}
Institution: ${e.school}
Completed: ${e.graduationDate}
${e.gpa ? `Academic Standing: ${e.gpa}` : ''}`).join('\n\n')}

AREAS OF PRACTICE

${data.skills.map(s => `● ${s}`).join('\n')}

${data.languages ? `\n\nLANGUAGE PROFICIENCY\n${data.languages.map(l => `● ${l.name}: ${l.level}`).join('\n')}` : ''}

${data.certifications ? `\n\nPROFESSIONAL LICENSES & CERTIFICATIONS\n${data.certifications.map(c => `✓ ${c}`).join('\n')}` : ''}
    `;
  }
}

export class TemplateV19 extends CVTemplate {
  getName(): string {
    return 'Educational Instructor';
  }

  getDescription(): string {
    return 'Academic-focused for teachers and educational professionals';
  }

  render(data: CVData): string {
    return `
${data.name}
${data.email} | ${data.phone} | ${data.location}

PROFESSIONAL STATEMENT
${data.summary || ''}

TEACHING & PROFESSIONAL EXPERIENCE

${data.experience.map(e => `
◆ ${e.title}
  ${e.company}
  ${e.startDate} - ${e.endDate || 'Current'}
  ${e.description}`).join('\n\n')}

ACADEMIC CREDENTIALS

${data.education.map(e => `
◆ ${e.degree}
  Field: ${e.field}
  ${e.school}
  ${e.graduationDate}
  ${e.gpa ? `GPA: ${e.gpa}` : ''}`).join('\n\n')}

COMPETENCIES

${data.skills.map(s => `▸ ${s}`).join('\n')}

${data.languages ? `\n\nLANGUAGES\n${data.languages.map(l => `▸ ${l.name} - ${l.level}`).join('\n')}` : ''}

${data.certifications ? `\n\nCERTIFICATIONS & CREDENTIALS\n${data.certifications.map(c => `◆ ${c}`).join('\n')}` : ''}
    `;
  }
}

export class TemplateV20 extends CVTemplate {
  getName(): string {
    return 'Financial Analyst';
  }

  getDescription(): string {
    return 'Professional format for finance and accounting roles';
  }

  render(data: CVData): string {
    return `
${data.name.toUpperCase()}
${data.email} | ${data.phone} | ${data.location}

PROFESSIONAL OBJECTIVE
${data.summary || ''}

CAREER PROGRESSION

${data.experience.map(e => `
Position: ${e.title}
Organization: ${e.company}
Tenure: ${e.startDate} to ${e.endDate || 'Present'}
Key Responsibilities:
${e.description}`).join('\n\n')}

EDUCATIONAL QUALIFICATIONS

${data.education.map(e => `
${e.degree}
${e.field} | ${e.school}
Completed: ${e.graduationDate}
${e.gpa ? `GPA: ${e.gpa}` : ''}`).join('\n\n')}

PROFESSIONAL SKILLS

${data.skills.map(s => `→ ${s}`).join('\n')}

${data.languages ? `\n\nLANGUAGE SKILLS\n${data.languages.map(l => `• ${l.name}: ${l.level}`).join('\n')}` : ''}
    `;
  }
}

export class CVTemplates {
  private static templates: CVTemplate[] = [
    new TemplateV1(),
    new TemplateV2(),
    new TemplateV3(),
    new TemplateV4(),
    new TemplateV5(),
    new TemplateV6(),
    new TemplateV7(),
    new TemplateV8(),
    new TemplateV9(),
    new TemplateV10(),
    new TemplateV11(),
    new TemplateV12(),
    new TemplateV13(),
    new TemplateV14(),
    new TemplateV15(),
    new TemplateV16(),
    new TemplateV17(),
    new TemplateV18(),
    new TemplateV19(),
    new TemplateV20(),
  ];

  static getAllTemplates(): { name: string; description: string; id: number }[] {
    return this.templates.map((t, i) => ({
      id: i + 1,
      name: t.getName(),
      description: t.getDescription(),
    }));
  }

  static getTemplateById(id: number): CVTemplate | null {
    return this.templates[id - 1] || null;
  }

  static renderCV(templateId: number, data: CVData): string {
    const template = this.getTemplateById(templateId);
    if (!template) {
      throw new Error(`Template ${templateId} not found`);
    }
    return template.render(data);
  }

  static listAllTemplates(): void {
    console.log('Available CV Templates:\n');
    this.getAllTemplates().forEach(t => {
      console.log(`${t.id}. ${t.name} - ${t.description}`);
    });
  }
}

export default CVTemplates;
