'use client';

import React, { useState } from 'react';
import EditableCVBuilder from '@/app/components/EditableCVBuilder';
import { CVData } from '@/app/utils/templates';
import Header from '@/app/components/Header';

export default function TemplatesEditorPage() {
  const [cvData, setCvData] = useState<CVData>({
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, USA',
    summary:
      'Experienced professional with a passion for innovation and excellence. Proven track record in leading teams and delivering results.',
    experience: [
      {
        title: 'Senior Product Manager',
        company: 'Tech Solutions Inc.',
        startDate: '2022-01-01',
        endDate: '2024-12-31',
        description:
          'Led product strategy and roadmap development, resulting in 40% increase in user engagement. Managed cross-functional teams of 8+ people.',
        current: false,
      },
      {
        title: 'Product Manager',
        company: 'Digital Innovations Ltd.',
        startDate: '2020-06-01',
        endDate: '2021-12-31',
        description:
          'Launched 3 new products and features, achieving 1M+ users in first quarter. Improved user satisfaction scores by 35%.',
        current: false,
      },
    ],
    education: [
      {
        degree: 'MBA in Business Administration',
        school: 'Harvard Business School',
        field: 'Business Administration',
        graduationDate: '2019-05-15',
        gpa: '3.8',
      },
      {
        degree: 'Bachelor of Science in Computer Science',
        school: 'Stanford University',
        field: 'Computer Science',
        graduationDate: '2015-06-15',
      },
    ],
    skills: [
      'Product Management',
      'Strategic Planning',
      'Team Leadership',
      'Data Analysis',
      'User Research',
      'Agile/Scrum',
      'Business Development',
      'Project Management',
    ],
    languages: [
      { name: 'English', level: 'Fluent' },
      { name: 'Spanish', level: 'Advanced' },
      { name: 'French', level: 'Intermediate' },
    ],
    certifications: [
      { name: 'Certified Scrum Product Owner', issuer: 'Scrum Alliance', date: '2023-06-01' },
      { name: 'Google Analytics Certification', issuer: 'Google', date: '2023-03-15' }
    ],
    projects: [
      {
        title: 'AI-Powered Analytics Dashboard',
        description: 'Built and launched a real-time analytics platform for SaaS companies.',
        technologies: ['React', 'Node.js', 'PostgreSQL', 'TensorFlow'],
        link: 'https://example.com',
        date: '2023-06-01',
      },
    ],
  });

  return (
    <div className="bw-editor">
      <Header />
      <EditableCVBuilder
        initialData={cvData}
        onDataChange={(newData) => setCvData(newData)}
      />
    </div>
  );
}
