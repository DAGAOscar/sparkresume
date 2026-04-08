'use client';

import React, { useState } from 'react';
import { CVData, Certificate, Award, Course, Publication, Reference, CustomSection } from '@/app/utils/templates';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

interface AdditionalSectionsManagerProps {
  cvData: CVData;
  onDataChange: (data: CVData) => void;
}

export default function AdditionalSectionsManager({ cvData, onDataChange }: AdditionalSectionsManagerProps) {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    certificates: false,
    awards: false,
    courses: false,
    organizations: false,
    publications: false,
    references: false,
    interests: false,
    declaration: false,
    custom: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // ===== CERTIFICATES =====
  const addCertificate = () => {
    const newCerts = [...(cvData.certifications || [])];
    newCerts.push({ name: 'Certificate Name', issuer: 'Issuer', date: new Date().toISOString().split('T')[0] });
    onDataChange({ ...cvData, certifications: newCerts });
  };

  const removeCertificate = (index: number) => {
    const newCerts = (cvData.certifications || []).filter((_, i) => i !== index);
    onDataChange({ ...cvData, certifications: newCerts });
  };

  const updateCertificate = (index: number, field: keyof Certificate, value: string) => {
    const newCerts = [...(cvData.certifications || [])];
    newCerts[index] = { ...newCerts[index], [field]: value };
    onDataChange({ ...cvData, certifications: newCerts });
  };

  // ===== AWARDS =====
  const addAward = () => {
    const newAwards = [...(cvData.awards || [])];
    newAwards.push({ title: 'Award Title', organization: 'Organization', date: new Date().toISOString().split('T')[0] });
    onDataChange({ ...cvData, awards: newAwards });
  };

  const removeAward = (index: number) => {
    const newAwards = (cvData.awards || []).filter((_, i) => i !== index);
    onDataChange({ ...cvData, awards: newAwards });
  };

  const updateAward = (index: number, field: keyof Award, value: string) => {
    const newAwards = [...(cvData.awards || [])];
    newAwards[index] = { ...newAwards[index], [field]: value };
    onDataChange({ ...cvData, awards: newAwards });
  };

  // ===== COURSES =====
  const addCourse = () => {
    const newCourses = [...(cvData.courses || [])];
    newCourses.push({ name: 'Course Name', provider: 'Provider', date: new Date().toISOString().split('T')[0] });
    onDataChange({ ...cvData, courses: newCourses });
  };

  const removeCourse = (index: number) => {
    const newCourses = (cvData.courses || []).filter((_, i) => i !== index);
    onDataChange({ ...cvData, courses: newCourses });
  };

  const updateCourse = (index: number, field: keyof Course, value: string | boolean) => {
    const newCourses = [...(cvData.courses || [])];
    newCourses[index] = { ...newCourses[index], [field]: value };
    onDataChange({ ...cvData, courses: newCourses });
  };

  // ===== ORGANIZATIONS =====
  const addOrganization = () => {
    const newOrgs = [...(cvData.organizations || []), 'Organization Name'];
    onDataChange({ ...cvData, organizations: newOrgs });
  };

  const removeOrganization = (index: number) => {
    const newOrgs = (cvData.organizations || []).filter((_, i) => i !== index);
    onDataChange({ ...cvData, organizations: newOrgs });
  };

  const updateOrganization = (index: number, value: string) => {
    const newOrgs = [...(cvData.organizations || [])];
    newOrgs[index] = value;
    onDataChange({ ...cvData, organizations: newOrgs });
  };

  // ===== PUBLICATIONS =====
  const addPublication = () => {
    const newPubs = [...(cvData.publications || [])];
    newPubs.push({ title: 'Publication Title', publisher: 'Publisher', date: new Date().toISOString().split('T')[0] });
    onDataChange({ ...cvData, publications: newPubs });
  };

  const removePublication = (index: number) => {
    const newPubs = (cvData.publications || []).filter((_, i) => i !== index);
    onDataChange({ ...cvData, publications: newPubs });
  };

  const updatePublication = (index: number, field: keyof Publication, value: string) => {
    const newPubs = [...(cvData.publications || [])];
    newPubs[index] = { ...newPubs[index], [field]: value };
    onDataChange({ ...cvData, publications: newPubs });
  };

  // ===== REFERENCES =====
  const addReference = () => {
    const newRefs = [...(cvData.references || [])];
    newRefs.push({
      name: 'Reference Name',
      position: 'Position',
      company: 'Company',
      email: 'email@example.com',
      phone: '',
    });
    onDataChange({ ...cvData, references: newRefs });
  };

  const removeReference = (index: number) => {
    const newRefs = (cvData.references || []).filter((_, i) => i !== index);
    onDataChange({ ...cvData, references: newRefs });
  };

  const updateReference = (index: number, field: keyof Reference, value: string) => {
    const newRefs = [...(cvData.references || [])];
    newRefs[index] = { ...newRefs[index], [field]: value };
    onDataChange({ ...cvData, references: newRefs });
  };

  // ===== INTERESTS =====
  const addInterest = () => {
    const newInterests = [...(cvData.interests || []), 'Interest'];
    onDataChange({ ...cvData, interests: newInterests });
  };

  const removeInterest = (index: number) => {
    const newInterests = (cvData.interests || []).filter((_, i) => i !== index);
    onDataChange({ ...cvData, interests: newInterests });
  };

  const updateInterest = (index: number, value: string) => {
    const newInterests = [...(cvData.interests || [])];
    newInterests[index] = value;
    onDataChange({ ...cvData, interests: newInterests });
  };

  // ===== DECLARATION =====
  const updateDeclaration = (value: string) => {
    onDataChange({ ...cvData, declaration: value });
  };

  // ===== CUSTOM SECTIONS =====
  const addCustomSection = () => {
    const newCustom = [...(cvData.customSections || [])];
    newCustom.push({ title: 'Section Title', content: 'Section content', icon: '📌' });
    onDataChange({ ...cvData, customSections: newCustom });
  };

  const removeCustomSection = (index: number) => {
    const newCustom = (cvData.customSections || []).filter((_, i) => i !== index);
    onDataChange({ ...cvData, customSections: newCustom });
  };

  const updateCustomSection = (index: number, field: keyof CustomSection, value: string) => {
    const newCustom = [...(cvData.customSections || [])];
    newCustom[index] = { ...newCustom[index], [field]: value };
    onDataChange({ ...cvData, customSections: newCustom });
  };

  return (
    <div className="space-y-4">
      {/* CERTIFICATES SECTION */}
      <div className="border rounded-lg">
        <button
          onClick={() => toggleSection('certificates')}
          className="w-full p-4 flex justify-between items-center bg-amber-50 hover:bg-amber-100 transition font-bold"
        >
          <span>🏅 Certificates ({(cvData.certifications || []).length})</span>
          {expandedSections.certificates ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {expandedSections.certificates && (
          <div className="p-4 space-y-3 bg-white max-h-72 overflow-y-auto">
            {(cvData.certifications || []).map((cert, idx) => (
              <div key={idx} className="border rounded p-3 space-y-2">
                <input
                  type="text"
                  placeholder="Certificate Name"
                  value={cert.name}
                  onChange={(e) => updateCertificate(idx, 'name', e.target.value)}
                  className="w-full px-3 py-2 border rounded text-sm"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Issuer"
                    value={cert.issuer}
                    onChange={(e) => updateCertificate(idx, 'issuer', e.target.value)}
                    className="flex-1 px-3 py-2 border rounded text-sm"
                  />
                  <input
                    type="date"
                    value={cert.date}
                    onChange={(e) => updateCertificate(idx, 'date', e.target.value)}
                    className="px-3 py-2 border rounded text-sm"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Credential ID (optional)"
                  value={cert.credentialId || ''}
                  onChange={(e) => updateCertificate(idx, 'credentialId', e.target.value)}
                  className="w-full px-3 py-2 border rounded text-sm text-gray-600"
                />
                <button
                  onClick={() => removeCertificate(idx)}
                  className="px-3 py-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded text-sm flex items-center gap-1"
                >
                  <Trash2 size={14} /> Remove
                </button>
              </div>
            ))}
            <button
              onClick={addCertificate}
              className="w-full px-3 py-2 bg-amber-50 text-amber-600 rounded text-sm hover:bg-amber-100 font-medium flex items-center justify-center gap-2"
            >
              <Plus size={16} /> Add Certificate
            </button>
          </div>
        )}
      </div>

      {/* AWARDS SECTION */}
      <div className="border rounded-lg">
        <button
          onClick={() => toggleSection('awards')}
          className="w-full p-4 flex justify-between items-center bg-yellow-50 hover:bg-yellow-100 transition font-bold"
        >
          <span>🏆 Awards ({(cvData.awards || []).length})</span>
          {expandedSections.awards ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {expandedSections.awards && (
          <div className="p-4 space-y-3 bg-white max-h-72 overflow-y-auto">
            {(cvData.awards || []).map((award, idx) => (
              <div key={idx} className="border rounded p-3 space-y-2">
                <input
                  type="text"
                  placeholder="Award Title"
                  value={award.title}
                  onChange={(e) => updateAward(idx, 'title', e.target.value)}
                  className="w-full px-3 py-2 border rounded text-sm"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Organization"
                    value={award.organization}
                    onChange={(e) => updateAward(idx, 'organization', e.target.value)}
                    className="flex-1 px-3 py-2 border rounded text-sm"
                  />
                  <input
                    type="date"
                    value={award.date}
                    onChange={(e) => updateAward(idx, 'date', e.target.value)}
                    className="px-3 py-2 border rounded text-sm"
                  />
                </div>
                <textarea
                  placeholder="Description (optional)"
                  value={award.description || ''}
                  onChange={(e) => updateAward(idx, 'description', e.target.value)}
                  className="w-full px-3 py-2 border rounded text-sm"
                  rows={2}
                />
                <button
                  onClick={() => removeAward(idx)}
                  className="px-3 py-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded text-sm flex items-center gap-1"
                >
                  <Trash2 size={14} /> Remove
                </button>
              </div>
            ))}
            <button
              onClick={addAward}
              className="w-full px-3 py-2 bg-yellow-50 text-yellow-600 rounded text-sm hover:bg-yellow-100 font-medium flex items-center justify-center gap-2"
            >
              <Plus size={16} /> Add Award
            </button>
          </div>
        )}
      </div>

      {/* COURSES SECTION */}
      <div className="border rounded-lg">
        <button
          onClick={() => toggleSection('courses')}
          className="w-full p-4 flex justify-between items-center bg-blue-50 hover:bg-blue-100 transition font-bold"
        >
          <span>📚 Courses ({(cvData.courses || []).length})</span>
          {expandedSections.courses ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {expandedSections.courses && (
          <div className="p-4 space-y-3 bg-white max-h-72 overflow-y-auto">
            {(cvData.courses || []).map((course, idx) => (
              <div key={idx} className="border rounded p-3 space-y-2">
                <input
                  type="text"
                  placeholder="Course Name"
                  value={course.name}
                  onChange={(e) => updateCourse(idx, 'name', e.target.value)}
                  className="w-full px-3 py-2 border rounded text-sm"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Provider"
                    value={course.provider}
                    onChange={(e) => updateCourse(idx, 'provider', e.target.value)}
                    className="flex-1 px-3 py-2 border rounded text-sm"
                  />
                  <input
                    type="date"
                    value={course.date}
                    onChange={(e) => updateCourse(idx, 'date', e.target.value)}
                    className="px-3 py-2 border rounded text-sm"
                  />
                </div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={course.certificateIssued || false}
                    onChange={(e) => updateCourse(idx, 'certificateIssued', e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm">Certificate Issued</span>
                </label>
                <button
                  onClick={() => removeCourse(idx)}
                  className="px-3 py-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded text-sm flex items-center gap-1"
                >
                  <Trash2 size={14} /> Remove
                </button>
              </div>
            ))}
            <button
              onClick={addCourse}
              className="w-full px-3 py-2 bg-blue-50 text-blue-600 rounded text-sm hover:bg-blue-100 font-medium flex items-center justify-center gap-2"
            >
              <Plus size={16} /> Add Course
            </button>
          </div>
        )}
      </div>

      {/* ORGANIZATIONS SECTION */}
      <div className="border rounded-lg">
        <button
          onClick={() => toggleSection('organizations')}
          className="w-full p-4 flex justify-between items-center bg-purple-50 hover:bg-purple-100 transition font-bold"
        >
          <span>🏢 Organizations ({(cvData.organizations || []).length})</span>
          {expandedSections.organizations ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {expandedSections.organizations && (
          <div className="p-4 space-y-3 bg-white max-h-72 overflow-y-auto">
            {(cvData.organizations || []).map((org, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Organization Name"
                  value={org}
                  onChange={(e) => updateOrganization(idx, e.target.value)}
                  className="flex-1 px-3 py-2 border rounded text-sm"
                />
                <button
                  onClick={() => removeOrganization(idx)}
                  className="px-2 py-2 text-red-600 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button
              onClick={addOrganization}
              className="w-full px-3 py-2 bg-purple-50 text-purple-600 rounded text-sm hover:bg-purple-100 font-medium flex items-center justify-center gap-2"
            >
              <Plus size={16} /> Add Organization
            </button>
          </div>
        )}
      </div>

      {/* PUBLICATIONS SECTION */}
      <div className="border rounded-lg">
        <button
          onClick={() => toggleSection('publications')}
          className="w-full p-4 flex justify-between items-center bg-green-50 hover:bg-green-100 transition font-bold"
        >
          <span>📖 Publications ({(cvData.publications || []).length})</span>
          {expandedSections.publications ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {expandedSections.publications && (
          <div className="p-4 space-y-3 bg-white max-h-72 overflow-y-auto">
            {(cvData.publications || []).map((pub, idx) => (
              <div key={idx} className="border rounded p-3 space-y-2">
                <input
                  type="text"
                  placeholder="Publication Title"
                  value={pub.title}
                  onChange={(e) => updatePublication(idx, 'title', e.target.value)}
                  className="w-full px-3 py-2 border rounded text-sm"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Publisher"
                    value={pub.publisher}
                    onChange={(e) => updatePublication(idx, 'publisher', e.target.value)}
                    className="flex-1 px-3 py-2 border rounded text-sm"
                  />
                  <input
                    type="date"
                    value={pub.date}
                    onChange={(e) => updatePublication(idx, 'date', e.target.value)}
                    className="px-3 py-2 border rounded text-sm"
                  />
                </div>
                <input
                  type="url"
                  placeholder="URL (optional)"
                  value={pub.url || ''}
                  onChange={(e) => updatePublication(idx, 'url', e.target.value)}
                  className="w-full px-3 py-2 border rounded text-sm text-gray-600"
                />
                <button
                  onClick={() => removePublication(idx)}
                  className="px-3 py-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded text-sm flex items-center gap-1"
                >
                  <Trash2 size={14} /> Remove
                </button>
              </div>
            ))}
            <button
              onClick={addPublication}
              className="w-full px-3 py-2 bg-green-50 text-green-600 rounded text-sm hover:bg-green-100 font-medium flex items-center justify-center gap-2"
            >
              <Plus size={16} /> Add Publication
            </button>
          </div>
        )}
      </div>

      {/* REFERENCES SECTION */}
      <div className="border rounded-lg">
        <button
          onClick={() => toggleSection('references')}
          className="w-full p-4 flex justify-between items-center bg-cyan-50 hover:bg-cyan-100 transition font-bold"
        >
          <span>👤 References ({(cvData.references || []).length})</span>
          {expandedSections.references ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {expandedSections.references && (
          <div className="p-4 space-y-3 bg-white max-h-72 overflow-y-auto">
            {(cvData.references || []).map((ref, idx) => (
              <div key={idx} className="border rounded p-3 space-y-2">
                <input
                  type="text"
                  placeholder="Name"
                  value={ref.name}
                  onChange={(e) => updateReference(idx, 'name', e.target.value)}
                  className="w-full px-3 py-2 border rounded text-sm"
                />
                <input
                  type="text"
                  placeholder="Position"
                  value={ref.position}
                  onChange={(e) => updateReference(idx, 'position', e.target.value)}
                  className="w-full px-3 py-2 border rounded text-sm"
                />
                <input
                  type="text"
                  placeholder="Company"
                  value={ref.company}
                  onChange={(e) => updateReference(idx, 'company', e.target.value)}
                  className="w-full px-3 py-2 border rounded text-sm"
                />
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Email"
                    value={ref.email}
                    onChange={(e) => updateReference(idx, 'email', e.target.value)}
                    className="flex-1 px-3 py-2 border rounded text-sm"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={ref.phone}
                    onChange={(e) => updateReference(idx, 'phone', e.target.value)}
                    className="flex-1 px-3 py-2 border rounded text-sm"
                  />
                </div>
                <button
                  onClick={() => removeReference(idx)}
                  className="px-3 py-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded text-sm flex items-center gap-1"
                >
                  <Trash2 size={14} /> Remove
                </button>
              </div>
            ))}
            <button
              onClick={addReference}
              className="w-full px-3 py-2 bg-cyan-50 text-cyan-600 rounded text-sm hover:bg-cyan-100 font-medium flex items-center justify-center gap-2"
            >
              <Plus size={16} /> Add Reference
            </button>
          </div>
        )}
      </div>

      {/* INTERESTS SECTION */}
      <div className="border rounded-lg">
        <button
          onClick={() => toggleSection('interests')}
          className="w-full p-4 flex justify-between items-center bg-rose-50 hover:bg-rose-100 transition font-bold"
        >
          <span>💡 Interests ({(cvData.interests || []).length})</span>
          {expandedSections.interests ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {expandedSections.interests && (
          <div className="p-4 space-y-3 bg-white max-h-72 overflow-y-auto">
            {(cvData.interests || []).map((interest, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Interest"
                  value={interest}
                  onChange={(e) => updateInterest(idx, e.target.value)}
                  className="flex-1 px-3 py-2 border rounded text-sm"
                />
                <button
                  onClick={() => removeInterest(idx)}
                  className="px-2 py-2 text-red-600 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button
              onClick={addInterest}
              className="w-full px-3 py-2 bg-rose-50 text-rose-600 rounded text-sm hover:bg-rose-100 font-medium flex items-center justify-center gap-2"
            >
              <Plus size={16} /> Add Interest
            </button>
          </div>
        )}
      </div>

      {/* DECLARATION SECTION */}
      <div className="border rounded-lg">
        <button
          onClick={() => toggleSection('declaration')}
          className="w-full p-4 flex justify-between items-center bg-slate-50 hover:bg-slate-100 transition font-bold"
        >
          <span>📋 Declaration</span>
          {expandedSections.declaration ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {expandedSections.declaration && (
          <div className="p-4 space-y-3 bg-white">
            <textarea
              placeholder="Enter any declaration or statement..."
              value={cvData.declaration || ''}
              onChange={(e) => updateDeclaration(e.target.value)}
              className="w-full px-3 py-2 border rounded text-sm"
              rows={4}
            />
          </div>
        )}
      </div>

      {/* CUSTOM SECTIONS */}
      <div className="border rounded-lg">
        <button
          onClick={() => toggleSection('custom')}
          className="w-full p-4 flex justify-between items-center bg-indigo-50 hover:bg-indigo-100 transition font-bold"
        >
          <span>➕ Custom Sections ({(cvData.customSections || []).length})</span>
          {expandedSections.custom ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {expandedSections.custom && (
          <div className="p-4 space-y-3 bg-white max-h-72 overflow-y-auto">
            {(cvData.customSections || []).map((section, idx) => (
              <div key={idx} className="border rounded p-3 space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Section Icon (emoji)"
                    value={section.icon || ''}
                    onChange={(e) => updateCustomSection(idx, 'icon', e.target.value)}
                    maxLength={2}
                    className="w-12 px-2 py-2 border rounded text-center text-lg"
                  />
                  <input
                    type="text"
                    placeholder="Section Title"
                    value={section.title}
                    onChange={(e) => updateCustomSection(idx, 'title', e.target.value)}
                    className="flex-1 px-3 py-2 border rounded text-sm"
                  />
                </div>
                <textarea
                  placeholder="Section Content"
                  value={section.content}
                  onChange={(e) => updateCustomSection(idx, 'content', e.target.value)}
                  className="w-full px-3 py-2 border rounded text-sm"
                  rows={3}
                />
                <button
                  onClick={() => removeCustomSection(idx)}
                  className="px-3 py-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded text-sm flex items-center gap-1"
                >
                  <Trash2 size={14} /> Remove
                </button>
              </div>
            ))}
            <button
              onClick={addCustomSection}
              className="w-full px-3 py-2 bg-indigo-50 text-indigo-600 rounded text-sm hover:bg-indigo-100 font-medium flex items-center justify-center gap-2"
            >
              <Plus size={16} /> Add Custom Section
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
