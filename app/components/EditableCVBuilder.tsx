'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CVData, Language } from '@/app/utils/templates';
import { getTemplateInfo, REACT_TEMPLATES } from '@/app/components/templates';
import { Download, Plus, Trash2, ChevronDown, ChevronUp, ArrowUp, ArrowDown } from 'lucide-react';
import A4TemplatePreview from '@/app/components/A4TemplatePreview';
import AdditionalSectionsManager from '@/app/components/AdditionalSectionsManager';

interface EditableCVBuilderProps {
  initialData: CVData;
  onDataChange?: (data: CVData) => void;
  selectedTemplateId?: number;
}

export default function EditableCVBuilder({
  initialData,
  onDataChange,
  selectedTemplateId = 1,
}: EditableCVBuilderProps) {
  const [cvData, setCvData] = useState<CVData>(initialData);
  const [selectedTemplate, setSelectedTemplate] = useState<number>(selectedTemplateId);
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    personal: true,
    experience: true,
    education: true,
    skills: true,
    languages: false,
    projects: false,
  });
  const [sectionOrder, setSectionOrder] = useState<string[]>([
    'personal',
    'experience',
    'education',
    'skills',
    'languages',
    'projects',
  ]);

  const handleDataChange = (newData: CVData) => {
    setCvData(newData);
    onDataChange?.(newData);
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const moveSection = (section: string, direction: 'up' | 'down') => {
    const currentIndex = sectionOrder.indexOf(section);
    if (currentIndex === -1) return;

    const newOrder = [...sectionOrder];
    if (direction === 'up' && currentIndex > 0) {
      [newOrder[currentIndex], newOrder[currentIndex - 1]] = [newOrder[currentIndex - 1], newOrder[currentIndex]];
      setSectionOrder(newOrder);
    } else if (direction === 'down' && currentIndex < sectionOrder.length - 1) {
      [newOrder[currentIndex], newOrder[currentIndex + 1]] = [newOrder[currentIndex + 1], newOrder[currentIndex]];
      setSectionOrder(newOrder);
    }
  };

  const renderSectionHeader = (section: string, title: string, icon: string) => {
    const currentIndex = sectionOrder.indexOf(section);
    const canMoveUp = currentIndex > 0;
    const canMoveDown = currentIndex < sectionOrder.length - 1;

    return (
      <div className="w-full flex justify-between items-center">
        <span>{icon} {title}</span>
        <div className="flex gap-1">
          <button
            onClick={() => moveSection(section, 'up')}
            disabled={!canMoveUp}
            className={`p-1 rounded transition ${canMoveUp ? 'hover:bg-gray-200 cursor-pointer' : 'text-gray-300 cursor-not-allowed'}`}
            title="Move section up"
          >
            <ArrowUp size={16} />
          </button>
          <button
            onClick={() => moveSection(section, 'down')}
            disabled={!canMoveDown}
            className={`p-1 rounded transition ${canMoveDown ? 'hover:bg-gray-200 cursor-pointer' : 'text-gray-300 cursor-not-allowed'}`}
            title="Move section down"
          >
            <ArrowDown size={16} />
          </button>
          {expandedSections[section] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>
    );
  };

  const renderSectionContent = (sectionType: string) => {
    const getSectionConfig = (type: string) => {
      const configs: { [key: string]: { title: string; icon: string; bgColor: string; count?: number } } = {
        personal: { title: 'Personal Details', icon: '👤', bgColor: 'bg-blue-50' },
        experience: { title: `Experience`, icon: '💼', bgColor: 'bg-green-50', count: cvData.experience.length },
        education: { title: `Education`, icon: '🎓', bgColor: 'bg-purple-50', count: cvData.education.length },
        skills: { title: `Skills`, icon: '⭐', bgColor: 'bg-orange-50', count: cvData.skills.length },
        languages: { title: `Languages`, icon: '🌐', bgColor: 'bg-indigo-50', count: (cvData.languages || []).length },
      };
      return configs[type];
    };

    const config = getSectionConfig(sectionType);
    if (!config) return null;

    const title = config.count !== undefined ? `${config.title} (${config.count})` : config.title;
    const headerClass = `${config.bgColor} hover:${config.bgColor}/80`;

    return (
      <div key={sectionType} className="border rounded-lg">
        <button
          onClick={() => toggleSection(sectionType)}
          className={`w-full p-4 flex justify-between items-center ${headerClass} transition font-bold`}
        >
          {renderSectionHeader(sectionType, title, config.icon)}
        </button>
        {expandedSections[sectionType] && (
          <div className="p-4 space-y-3 bg-white">
            {sectionType === 'personal' && (
              <>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={cvData.name}
                  onChange={(e) => updatePersonalDetails(e.target.value, cvData.email, cvData.phone, cvData.location, cvData.summary || '')}
                  className="w-full px-3 py-2 border rounded text-sm"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={cvData.email}
                  onChange={(e) => updatePersonalDetails(cvData.name, e.target.value, cvData.phone, cvData.location, cvData.summary || '')}
                  className="w-full px-3 py-2 border rounded text-sm"
                />
                <div className="space-y-2">
                  {(cvData.links || []).map((link, idx) => (
                    <div key={idx} className="flex gap-2 items-center bg-gray-50 p-2 rounded">
                      <input
                        type="text"
                        placeholder="Icon"
                        value={link.icon || ''}
                        onChange={(e) => updateLink(idx, 'icon', e.target.value)}
                        maxLength={2}
                        className="w-8 px-1 py-1 border rounded text-center text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Label"
                        value={link.label}
                        onChange={(e) => updateLink(idx, 'label', e.target.value)}
                        className="flex-1 px-2 py-1 border rounded text-sm"
                      />
                      <input
                        type="url"
                        placeholder="URL"
                        value={link.url}
                        onChange={(e) => updateLink(idx, 'url', e.target.value)}
                        className="flex-1 px-2 py-1 border rounded text-sm"
                      />
                      <button
                        onClick={() => removeLink(idx)}
                        className="px-1 py-1 text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addLink}
                    className="w-full px-3 py-2 text-blue-600 hover:text-blue-700 text-sm flex items-center justify-center gap-1 border border-dashed border-blue-300 rounded hover:bg-blue-50"
                  >
                    <Plus size={16} /> Add Link
                  </button>
                </div>
                <input
                  type="tel"
                  placeholder="Phone"
                  value={cvData.phone}
                  onChange={(e) => updatePersonalDetails(cvData.name, cvData.email, e.target.value, cvData.location, cvData.summary || '')}
                  className="w-full px-3 py-2 border rounded text-sm"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={cvData.location}
                  onChange={(e) => updatePersonalDetails(cvData.name, cvData.email, cvData.phone, e.target.value, cvData.summary || '')}
                  className="w-full px-3 py-2 border rounded text-sm"
                />
                <textarea
                  placeholder="Professional Summary"
                  value={cvData.summary || ''}
                  onChange={(e) => updatePersonalDetails(cvData.name, cvData.email, cvData.phone, cvData.location, e.target.value)}
                  className="w-full px-3 py-2 border rounded text-sm h-20"
                />
              </>
            )}
            {sectionType === 'experience' && (
              <>
                <div className="max-h-96 overflow-y-auto space-y-3">
                  {cvData.experience.map((exp, idx) => (
                    <div key={idx} className="border rounded p-3 bg-gray-50 space-y-2">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold">Position {idx + 1}</span>
                        <button
                          onClick={() => removeExperience(idx)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder="Job Title"
                        value={exp.title}
                        onChange={(e) => {
                          const newExp = [...cvData.experience];
                          newExp[idx].title = e.target.value;
                          updateExperience(newExp);
                        }}
                        className="w-full px-3 py-2 border rounded text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Company"
                        value={exp.company}
                        onChange={(e) => {
                          const newExp = [...cvData.experience];
                          newExp[idx].company = e.target.value;
                          updateExperience(newExp);
                        }}
                        className="w-full px-3 py-2 border rounded text-sm"
                      />
                      <div className="flex gap-2">
                        <input
                          type="date"
                          value={exp.startDate}
                          onChange={(e) => {
                            const newExp = [...cvData.experience];
                            newExp[idx].startDate = e.target.value;
                            updateExperience(newExp);
                          }}
                          className="flex-1 px-3 py-2 border rounded text-sm"
                        />
                        <input
                          type="date"
                          value={exp.endDate || ''}
                          onChange={(e) => {
                            const newExp = [...cvData.experience];
                            newExp[idx].endDate = e.target.value;
                            updateExperience(newExp);
                          }}
                          className="flex-1 px-3 py-2 border rounded text-sm"
                        />
                      </div>
                      <textarea
                        placeholder="Description"
                        value={exp.description}
                        onChange={(e) => {
                          const newExp = [...cvData.experience];
                          newExp[idx].description = e.target.value;
                          updateExperience(newExp);
                        }}
                        className="w-full px-3 py-2 border rounded text-sm h-12"
                      />
                    </div>
                  ))}
                </div>
                <button
                  onClick={addExperience}
                  className="w-full px-3 py-2 bg-green-50 text-green-600 rounded text-sm hover:bg-green-100 font-medium flex items-center justify-center gap-2"
                >
                  <Plus size={16} /> Add Experience
                </button>
              </>
            )}
            {sectionType === 'education' && (
              <>
                <div className="max-h-96 overflow-y-auto space-y-3">
                  {cvData.education.map((edu, idx) => (
                    <div key={idx} className="border rounded p-3 bg-gray-50 space-y-2">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold">Education {idx + 1}</span>
                        <button
                          onClick={() => removeEducation(idx)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder="Degree"
                        value={edu.degree}
                        onChange={(e) => {
                          const newEdu = [...cvData.education];
                          newEdu[idx].degree = e.target.value;
                          updateEducation(newEdu);
                        }}
                        className="w-full px-3 py-2 border rounded text-sm"
                      />
                      <input
                        type="text"
                        placeholder="School"
                        value={edu.school}
                        onChange={(e) => {
                          const newEdu = [...cvData.education];
                          newEdu[idx].school = e.target.value;
                          updateEducation(newEdu);
                        }}
                        className="w-full px-3 py-2 border rounded text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Field of Study"
                        value={edu.field}
                        onChange={(e) => {
                          const newEdu = [...cvData.education];
                          newEdu[idx].field = e.target.value;
                          updateEducation(newEdu);
                        }}
                        className="w-full px-3 py-2 border rounded text-sm"
                      />
                      <input
                        type="date"
                        value={edu.graduationDate}
                        onChange={(e) => {
                          const newEdu = [...cvData.education];
                          newEdu[idx].graduationDate = e.target.value;
                          updateEducation(newEdu);
                        }}
                        className="w-full px-3 py-2 border rounded text-sm"
                      />
                    </div>
                  ))}
                </div>
                <button
                  onClick={addEducation}
                  className="w-full px-3 py-2 bg-purple-50 text-purple-600 rounded text-sm hover:bg-purple-100 font-medium flex items-center justify-center gap-2"
                >
                  <Plus size={16} /> Add Education
                </button>
              </>
            )}
            {sectionType === 'skills' && (
              <>
                <div className="max-h-72 overflow-y-auto space-y-2">
                  {cvData.skills.map((skill, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        value={skill}
                        onChange={(e) => {
                          const newSkills = [...cvData.skills];
                          newSkills[idx] = e.target.value;
                          updateSkills(newSkills);
                        }}
                        className="flex-1 px-3 py-2 border rounded text-sm"
                      />
                      <button
                        onClick={() => updateSkills(cvData.skills.filter((_, i) => i !== idx))}
                        className="px-2 py-2 text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => updateSkills([...cvData.skills, 'New Skill'])}
                  className="w-full px-3 py-2 bg-orange-50 text-orange-600 rounded text-sm hover:bg-orange-100 font-medium flex items-center justify-center gap-2"
                >
                  <Plus size={16} /> Add Skill
                </button>
              </>
            )}
            {sectionType === 'languages' && (
              <>
                <div className="max-h-72 overflow-y-auto space-y-3">
                  {(cvData.languages || []).map((lang, idx) => (
                    <div key={idx} className="flex gap-2 items-end">
                      <div className="flex-1 space-y-1">
                        <input
                          type="text"
                          placeholder="Language"
                          value={lang.name}
                          onChange={(e) => updateLanguage(idx, 'name', e.target.value)}
                          className="w-full px-3 py-2 border rounded text-sm"
                        />
                      </div>
                      <select
                        value={lang.level}
                        onChange={(e) => updateLanguage(idx, 'level', e.target.value)}
                        className="px-3 py-2 border rounded text-sm"
                      >
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                        <option>Fluent</option>
                      </select>
                      <button
                        onClick={() => removeLanguage(idx)}
                        className="px-2 py-2 text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={addLanguage}
                  className="w-full px-3 py-2 bg-indigo-50 text-indigo-600 rounded text-sm hover:bg-indigo-100 font-medium flex items-center justify-center gap-2"
                >
                  <Plus size={16} /> Add Language
                </button>
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  const updatePersonalDetails = (name: string, email: string, phone: string, location: string, summary: string) => {
    handleDataChange({
      ...cvData,
      name,
      email,
      phone,
      location,
      summary,
    });
  };

  const updateExperience = (experience: CVData['experience']) => {
    handleDataChange({ ...cvData, experience });
  };

  const updateEducation = (education: CVData['education']) => {
    handleDataChange({ ...cvData, education });
  };

  const updateSkills = (skills: string[]) => {
    handleDataChange({ ...cvData, skills });
  };

  const addExperience = () => {
    handleDataChange({
      ...cvData,
      experience: [
        ...cvData.experience,
        {
          title: 'Job Title',
          company: 'Company Name',
          startDate: new Date().toISOString().split('T')[0],
          description: 'Description',
          current: false,
        },
      ],
    });
  };

  const removeExperience = (index: number) => {
    handleDataChange({
      ...cvData,
      experience: cvData.experience.filter((_, i) => i !== index),
    });
  };

  const addEducation = () => {
    handleDataChange({
      ...cvData,
      education: [
        ...cvData.education,
        {
          degree: 'Degree',
          school: 'School Name',
          field: 'Field of Study',
          graduationDate: new Date().toISOString().split('T')[0],
        },
      ],
    });
  };

  const removeEducation = (index: number) => {
    handleDataChange({
      ...cvData,
      education: cvData.education.filter((_, i) => i !== index),
    });
  };

  const addLanguage = () => {
    handleDataChange({
      ...cvData,
      languages: [
        ...(cvData.languages || []),
        {
          name: 'New Language',
          level: 'Beginner',
        },
      ],
    });
  };

  const updateLanguage = (index: number, field: keyof Language, value: string) => {
    const updated = [...(cvData.languages || [])];
    if (field === 'name') {
      updated[index] = { ...updated[index], name: value };
    } else if (field === 'level') {
      updated[index] = { ...updated[index], level: value as 'Beginner' | 'Intermediate' | 'Advanced' | 'Fluent' };
    }
    handleDataChange({ ...cvData, languages: updated });
  };

  const removeLanguage = (index: number) => {
    handleDataChange({
      ...cvData,
      languages: (cvData.languages || []).filter((_, i) => i !== index),
    });
  };

  const addLink = () => {
    handleDataChange({
      ...cvData,
      links: [
        ...(cvData.links || []),
        {
          label: 'Link Label',
          url: 'https://example.com',
          icon: '🔗',
        },
      ],
    });
  };

  const updateLink = (index: number, field: string, value: string) => {
    const updated = [...(cvData.links || [])];
    updated[index] = { ...updated[index], [field]: value };
    handleDataChange({ ...cvData, links: updated });
  };

  const removeLink = (index: number) => {
    handleDataChange({
      ...cvData,
      links: (cvData.links || []).filter((_, i) => i !== index),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 max-w-7xl mx-auto">
        {/* Left Panel - Edit Forms */}
        <div className="space-y-4 bg-white rounded-lg shadow p-6 max-h-screen overflow-y-auto">
          {/* Template Selector */}
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-bold text-blue-900">SELECT TEMPLATE</h3>
              <Link href="/templates" className="text-xs text-blue-600 hover:text-blue-800 underline font-medium">
                View All Templates
              </Link>
            </div>
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(Number(e.target.value))}
              className="w-full p-2 border border-blue-300 rounded text-sm"
            >
              {REACT_TEMPLATES.map(template => (
                <option key={template.id} value={template.id}>
                  {template.name} - {template.description}
                </option>
              ))}
            </select>
          </div>

          {/* Dynamic Sections - Reorderable by User */}
          {sectionOrder.map((sectionType) => renderSectionContent(sectionType))}

          {/* Additional Sections Manager */}
          <AdditionalSectionsManager cvData={cvData} onDataChange={handleDataChange} />
        </div>

        {/* Right Panel - Template Preview */}
        <div className="sticky top-6 h-[calc(100vh-80px)]">
          <div className="bg-white rounded-lg shadow overflow-hidden h-full flex flex-col">
            <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
              <h3 className="text-lg font-bold">{getTemplateInfo(selectedTemplate)?.name}</h3>
              <div className="flex gap-2">
                <button
                  onClick={async () => {
                    try {
                      const element = document.getElementById('template-content');
                      if (!element) {
                        alert('Template content not found');
                        return;
                      }

                      // Dynamically import both libraries
                      const html2canvas = (await import('html2canvas-pro')).default;
                      const jsPDF = (await import('jspdf')).jsPDF;
                      
                      // Clone element to avoid modifying original
                      const clonedElement = element.cloneNode(true) as HTMLElement;
                      
                      // Generate canvas with high quality
                      const canvas = await html2canvas(clonedElement, {
                        scale: 2,
                        useCORS: true,
                        allowTaint: true,
                        logging: false,
                        backgroundColor: '#ffffff',
                        imageTimeout: 5000,
                      });

                      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
                      const imgData = canvas.toDataURL('image/jpeg', 0.95);
                      const pdfWidth = pdf.internal.pageSize.getWidth();
                      const pdfHeight = pdf.internal.pageSize.getHeight();
                      const imgWidth = pdfWidth;
                      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
                      
                      let heightLeft = imgHeight;
                      let position = 0;
                      
                      // Add first page
                      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
                      heightLeft -= pdfHeight;
                      
                      // Add additional pages if needed
                      while (heightLeft > 0) {
                        position = heightLeft - imgHeight;
                        pdf.addPage();
                        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
                        heightLeft -= pdfHeight;
                      }
                      
                      const templateName = getTemplateInfo(selectedTemplate)?.name.replace(/\s+/g, '-').toLowerCase() || 'resume';
                      pdf.save(`resume-${templateName}.pdf`);
                    } catch (error) {
                      console.error('Error generating PDF:', error);
                      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                      alert(`Error generating PDF: ${errorMessage}`);
                    }
                  }}
                  className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  title="Download PDF"
                >
                  <Download size={18} />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto">
              <A4TemplatePreview cvData={cvData} selectedTemplate={selectedTemplate} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
