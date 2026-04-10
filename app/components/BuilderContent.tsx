"use client"
import { Eye, RotateCw, Save, Trash2, Palette, LogIn } from "lucide-react";
import PersonalDetailsForm from "./PersonalDetailsForm";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Education, Experience, Hobby, Language, PersonalDetails, Skill } from "@/type";
import { useAuth } from "@/app/hooks/useAuth";
import { createCV, getCVData, saveCVData } from "@/app/lib/cvService";
import { educationsPreset, experiencesPreset, hobbiesPreset, languagesPreset, personalDetailsPreset, skillsPreset } from "@/presets";
import ExperienceForm from "./ExperienceForm";
import EducationForm from "./EducationForm";
import LanguageForm from "./LanguageForm";
import SkillForm from "./SkillForm";
import HobbyForm from "./HobbyForm";
import TemplateSelector from "./TemplateSelector";
import TextTemplatePreview from "./TextTemplatePreview";
import CVModelSelector from "./CVModelSelector";
import { CVModelModern, CVModelMinimal, CVModelCreative, CVModelProfessional } from "./CVModels";
import { CVData } from "@/app/utils/templates";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import confetti from "canvas-confetti"
import Header from "./Header";
import Link from "next/link";

export function BuilderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoggedIn, loading } = useAuth();
  
  // CV Management
  const [cvId, setCvId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string>('');
  
  // Form Data
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>(personalDetailsPreset)
  const [file, setFile] = useState<File | null>(null)
  const [theme, setTheme] = useState<string>('business')
  const [zoom, setZoom] = useState<number>(163)
  const [experiences, setExperience] = useState<Experience[]>(experiencesPreset)
  const [educations, setEducations] = useState<Education[]>(educationsPreset)
  const [languages, setLanguages] = useState<Language[]>(languagesPreset)
  const [skills, setSkills] = useState<Skill[]>(skillsPreset)
  const [hobbies, setHobbies] = useState<Hobby[]>(hobbiesPreset);
  const [templateId, setTemplateId] = useState<number>(1)
  const [useTextTemplate, setUseTextTemplate] = useState<boolean>(false)
  const [cvModel, setCvModel] = useState<string>('modern')

  // Check authentication on mount
  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, loading, router]);

  // Get CV ID from URL params
  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      setCvId(id);
    }
  }, [searchParams]);

  // Load CV data if ID exists
  useEffect(() => {
    if (!cvId || loading || !isLoggedIn) return;

    const loadCVData = async () => {
      try {
        const data = await getCVData(cvId);
        if (data) {
          // Load personal details
          if (data.personal_details) {
            const details = data.personal_details as Record<string, any>;
            setPersonalDetails({
              fullName: details.name || '',
              email: details.email || '',
              phone: details.phone || '',
              address: details.location || '',
              photoUrl: '',
              postSeeking: '',
              description: details.summary || '',
            });
          }
          // Load experiences, educations, etc.
          if (data.experiences) setExperience(data.experiences as Experience[]);
          if (data.educations) setEducations(data.educations as Education[]);
          if (data.languages) setLanguages(data.languages as Language[]);
          if (data.skills) setSkills(data.skills as Skill[]);
          if (data.hobbies) setHobbies(data.hobbies as Hobby[]);
        }
      } catch (error) {
        console.error('Error loading CV data:', error);
      }
    };

    loadCVData();
  }, [cvId, loading, isLoggedIn]);

  useEffect(() => {
    const defaultImageUrl = '/profile.jpg'
    fetch(defaultImageUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const defaultFile = new File([blob], "profile.jpg", { type: blob.type })
        setFile(defaultFile)
      })
  }, [])

  // Helper function to convert builder data to CVData format for templates
  const getTemplateData = (): CVData => {
    return {
      name: personalDetails.fullName || 'Your Name',
      email: personalDetails.email || '',
      phone: personalDetails.phone || '',
      location: personalDetails.address || '',
      summary: personalDetails.description || '',
      experience: experiences.map(exp => ({
        title: exp.jobTitle,
        company: exp.companyName,
        startDate: exp.startDate,
        endDate: exp.endDate,
        description: exp.description,
        current: false,
      })),
      education: educations.map(edu => ({
        degree: edu.degree,
        school: edu.school,
        field: edu.description,
        graduationDate: edu.endDate,
        gpa: undefined,
      })),
      skills: skills.map(skill => skill.name),
      languages: languages.map(lang => ({
        name: lang.language,
        level: lang.proficiency as 'Beginner' | 'Intermediate' | 'Advanced' | 'Fluent',
      })),
      certifications: [],
      projects: [],
    };
  }

  // Handle saving CV data
  const handleSaveCV = async () => {
    if (!cvId) {
      setSaveMessage('No CV selected. Create a new CV first.');
      return;
    }

    try {
      setIsSaving(true);
      setSaveMessage('');

      const cvData = getTemplateData();
      const result = await saveCVData(cvId, cvData);

      if (result) {
        setSaveMessage('✓ CV saved successfully!');
        setTimeout(() => setSaveMessage(''), 3000);
      } else {
        setSaveMessage('Failed to save CV');
      }
    } catch (error) {
      console.error('Error saving CV:', error);
      setSaveMessage('Error saving CV');
    } finally {
      setIsSaving(false);
    }
  }

  // Handle creating a new CV
  const handleCreateCV = async () => {
    try {
      setIsSaving(true);
      const newCV = await createCV('My CV', templateId);
      if (newCV) {
        setCvId(newCV.id);
        setSaveMessage(`✓ New CV created! Now you can start editing.`);
        // Update URL to include the new CV ID
        router.push(`/builder?id=${newCV.id}`);
      } else {
        setSaveMessage('Failed to create CV');
      }
    } catch (error) {
      console.error('Error creating CV:', error);
      setSaveMessage('Error creating CV');
    } finally {
      setIsSaving(false);
    }
  }

  // Render CV Model based on selection
  const renderCVModel = (modelType: string) => {
    const commonProps = {
      personalDetails,
      file,
      theme,
      experiences,
      educations,
      languages,
      skills,
      hobbies,
    };

    switch (modelType) {
      case 'modern':
        return <CVModelModern {...commonProps} />;
      case 'minimal':
        return <CVModelMinimal {...commonProps} />;
      case 'creative':
        return <CVModelCreative {...commonProps} />;
      case 'professional':
        return <CVModelProfessional {...commonProps} />;
      default:
        return <CVModelModern {...commonProps} />;
    }
  }

  const themes = [
    "light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro",
    "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel",
    "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business",
    "acid", "lemonade", "night", "coffee", "winter", "dim", "nord", "sunset",
  ]

  const handleResetPersonalDetails = () => setPersonalDetails({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    photoUrl: '',
    postSeeking: '',
    description: ''
  })

  const handleResetExperiences = () => setExperience([])
  const handleResetEducations = () => setEducations([])
  const handleResetLanguages = () => setLanguages([])
  const handleResetSkills = () => setSkills([])
  const handleResetHobbies = () => setHobbies([]);

  const handleDeleteExperience = (index: number) => {
    setExperience(experiences.filter((_, i) => i !== index))
  }

  const handleDeleteEducation = (index: number) => {
    setEducations(educations.filter((_, i) => i !== index))
  }

  const handleDeleteLanguage = (index: number) => {
    setLanguages(languages.filter((_, i) => i !== index))
  }

  const handleDeleteSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index))
  }

  const handleDeleteHobby = (index: number) => {
    setHobbies(hobbies.filter((_, i) => i !== index))
  }

  const cvPreviewRef = useRef(null)

  const handleDownloadPdf = async () => {
    const element = cvPreviewRef.current
    if (element) {
      try {
        const canvas = await html2canvas(element, {
          scale: 3,
          useCORS: true,
        })
        const imgData = canvas.toDataURL('image/png')

        const pdf = new jsPDF({
          orientation: "portrait",
          unit: 'mm',
          format: "A4"
        })

        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`cv.pdf`)

        const modal = document.getElementById('my_modal_3') as HTMLDialogElement
        if (modal) {
          modal.close()
        }

        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          zIndex: 9999
        })

      } catch (error) {
        console.error('Erreur lors de la génération du PDF :', error);
      }
    }
  }

  // Check authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Vérification de l&apos;authentification...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div>
        <Header />
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-white">
          <div className="text-center max-w-md">
            <LogIn size={48} className="mx-auto mb-4 text-blue-600" />
            <h2 className="text-2xl font-bold mb-2 text-gray-900">Connexion requise</h2>
            <p className="text-gray-600 mb-6">
              Vous devez être connecté pour accéder au CV Builder.
            </p>
            <Link href="/login" className="btn btn-primary">
              Se connecter
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      
      {/* Desktop View - 2 Column Layout */}
      <div className="hidden lg:block">
        <section className="flex items-center min-h-screen">

          <div className="w-1/3 h-screen p-6 lg:p-10 bg-base-200 scrollable no-scrollbar overflow-y-auto">
            <div className="mb-4 flex justify-between items-center sticky top-0 bg-base-200 z-10 pb-4">
              <h1 className="text-lg lg:text-2xl font-bold italic">
                ✨ Spark<span className="text-primary">Resume</span>
              </h1>

              <div className="flex gap-2 flex-wrap">
                {!cvId ? (
                  <button 
                    className="btn btn-success btn-sm lg:btn-md gap-1"
                    onClick={handleCreateCV}
                    disabled={isSaving}
                  >
                    {isSaving ? <span className="loading loading-spinner loading-sm"></span> : <Save className="w-4" />}
                    New CV
                  </button>
                ) : (
                  <button 
                    className="btn btn-success btn-sm lg:btn-md gap-1"
                    onClick={handleSaveCV}
                    disabled={isSaving}
                  >
                    {isSaving ? <span className="loading loading-spinner loading-sm"></span> : <Save className="w-4" />}
                    Save
                  </button>
                )}
                <button className="btn btn-primary btn-sm lg:btn-md" onClick={() => (document.getElementById('my_modal_3') as HTMLDialogElement).showModal()}>
                  Preview
                  <Eye className="w-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-6 rounded-lg">

              <TemplateSelector
                selectedTemplate={templateId}
                onTemplateChange={setTemplateId}
              />

              <CVModelSelector
                selectedModel={cvModel}
                onModelChange={setCvModel}
              />

              <Link href="/templates" className="btn btn-outline btn-primary gap-2">
                <Palette className="w-4" />
                Browse Templates Gallery
              </Link>

              <div className="flex justify-between items-center">
                <h1 className="badge badge-primary badge-outline">Personal Details</h1>
                <button
                  onClick={handleResetPersonalDetails}
                  className="btn btn-primary btn-sm">
                  <RotateCw className="w-4" />
                </button>
              </div>

              <PersonalDetailsForm
                personalDetails={personalDetails}
                setPersonalDetails={setPersonalDetails}
                setFile={setFile}
              />

              <div className="flex justify-between items-center">
                <h1 className="badge badge-primary badge-outline">Experience</h1>
                <button
                  onClick={handleResetExperiences}
                  className="btn btn-primary btn-sm">
                  <RotateCw className="w-4" />
                </button>
              </div>

              {/* Experience List with Edit/Delete */}
              <div className="space-y-2">
                {experiences.map((exp, index) => (
                  <div key={index} className="card bg-base-300 p-3 flex flex-row justify-between items-start">
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{exp.jobTitle}</p>
                      <p className="text-xs opacity-70">{exp.companyName}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteExperience(index)}
                      className="btn btn-ghost btn-xs"
                    >
                      <Trash2 className="w-4" />
                    </button>
                  </div>
                ))}
              </div>

              <ExperienceForm
                experience={experiences}
                setExperiences={setExperience}
              />

              <div className="flex justify-between items-center">
                <h1 className="badge badge-primary badge-outline">Education</h1>
                <button
                  onClick={handleResetEducations}
                  className="btn btn-primary btn-sm">
                  <RotateCw className="w-4" />
                </button>
              </div>

              {/* Education List with Edit/Delete */}
              <div className="space-y-2">
                {educations.map((edu, index) => (
                  <div key={index} className="card bg-base-300 p-3 flex flex-row justify-between items-start">
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{edu.degree}</p>
                      <p className="text-xs opacity-70">{edu.school}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteEducation(index)}
                      className="btn btn-ghost btn-xs"
                    >
                      <Trash2 className="w-4" />
                    </button>
                  </div>
                ))}
              </div>

              <EducationForm
                educations={educations}
                setEducations={setEducations}
              />

              <div className="flex justify-between items-center">
                <h1 className="badge badge-primary badge-outline">Languages</h1>
                <button
                  onClick={handleResetLanguages}
                  className="btn btn-primary btn-sm">
                  <RotateCw className="w-4" />
                </button>
              </div>

              {/* Languages List with Delete */}
              <div className="space-y-2">
                {languages.map((lang, index) => (
                  <div key={index} className="card bg-base-300 p-3 flex flex-row justify-between items-start">
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{lang.language}</p>
                      <p className="text-xs opacity-70">{lang.proficiency}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteLanguage(index)}
                      className="btn btn-ghost btn-xs"
                    >
                      <Trash2 className="w-4" />
                    </button>
                  </div>
                ))}
              </div>

              <LanguageForm
                languages={languages}
                setLanguages={setLanguages}
              />

              <div className="flex justify-between">
                <div className="w-1/2">
                  <div className="flex justify-between items-center">
                    <h1 className="badge badge-primary badge-outline">Skills</h1>
                    <button
                      onClick={handleResetSkills}
                      className="btn btn-primary btn-sm">
                      <RotateCw className="w-4" />
                    </button>
                  </div>

                  {/* Skills List with Delete */}
                  <div className="space-y-2 mt-3">
                    {skills.map((skill, index) => (
                      <div key={index} className="badge badge-primary badge-lg w-full flex justify-between">
                        <span>{skill.name}</span>
                        <button
                          onClick={() => handleDeleteSkill(index)}
                          className="btn btn-ghost btn-xs ml-2"
                        >
                          <Trash2 className="w-3" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <SkillForm skills={skills} setSkills={setSkills} />
                </div>

                <div className="ml-4 w-1/2">
                  <div className="flex justify-between items-center">
                    <h1 className="badge badge-primary badge-outline">Hobbies</h1>
                    <button
                      onClick={handleResetHobbies}
                      className="btn btn-primary btn-sm">
                      <RotateCw className="w-4" />
                    </button>
                  </div>

                  {/* Hobbies List with Delete */}
                  <div className="space-y-2 mt-3">
                    {hobbies.map((hobby, index) => (
                      <div key={index} className="badge badge-secondary badge-lg w-full flex justify-between">
                        <span>{hobby.name}</span>
                        <button
                          onClick={() => handleDeleteHobby(index)}
                          className="btn btn-ghost btn-xs ml-2"
                        >
                          <Trash2 className="w-3" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <HobbyForm hobbies={hobbies} setHobbies={setHobbies} />
                </div>
              </div>
            </div>
          </div>

          <div className="w-2/3 h-screen bg-base-100 bg-[url('/file.svg')] bg-cover bg-center scrollable-preview relative">

            <div className="flex items-center justify-center fixed z-[9999] top-5 right-5 gap-3 flex-wrap">
              <div className="flex items-center gap-2 bg-base-100 p-2 rounded-lg">
                <label className="text-xs font-semibold">Template:</label>
                <select
                  value={useTextTemplate ? '1' : '0'}
                  onChange={(e) => setUseTextTemplate(e.target.value === '1')}
                  className="select select-bordered select-xs"
                >
                  <option value="0">Visual</option>
                  <option value="1">Text</option>
                </select>
              </div>
              {!useTextTemplate && (
                <>
                  <input
                    type="range"
                    min={50}
                    max={200}
                    value={zoom}
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="range range-xs range-primary"
                  />
                  <p className="text-sm text-primary">{zoom}%</p>

                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="select select-bordered select-xs"
                  >
                    {themes.map((themeName) => (
                      <option key={themeName} value={themeName}>
                        {themeName}
                      </option>
                    ))}
                  </select>
                </>
              )}
            </div>

            {useTextTemplate ? (
              <div className="p-10 h-full overflow-auto">
                <TextTemplatePreview
                  templateId={templateId}
                  cvData={getTemplateData()}
                />
              </div>
            ) : (
              <div
                className="flex justify-center items-center pt-20"
                style={{
                  transform: `scale(${zoom / 200})`
                }}
              >
                {renderCVModel(cvModel)}
              </div>
            )}
          </div>
        </section>

        <dialog id="my_modal_3" className="modal">
          <div className="modal-box w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>

            <div className="mt-5">
              <div className="flex justify-between items-center mb-5 gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-semibold">Preview Mode:</label>
                  <select
                    value={useTextTemplate ? '1' : '0'}
                    onChange={(e) => setUseTextTemplate(e.target.value === '1')}
                    className="select select-bordered select-sm"
                  >
                    <option value="0">Visual CV</option>
                    <option value="1">Text Template</option>
                  </select>
                </div>
                {!useTextTemplate && (
                  <button onClick={handleDownloadPdf} className="btn btn-primary">
                    Download PDF
                    <Save className='w-4' />
                  </button>
                )}
              </div>

              <div className="w-full max-w-full overflow-auto">
                {useTextTemplate ? (
                  <TextTemplatePreview
                    templateId={templateId}
                    cvData={getTemplateData()}
                  />
                ) : (
                  <div ref={cvPreviewRef} className="w-full max-w-full flex justify-center items-center">
                    {renderCVModel(cvModel)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </dialog>
      </div>

      {/* Tablet and Mobile View */}
      <div className="lg:hidden min-h-screen bg-base-200 pb-20">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
            <h1 className="text-xl sm:text-2xl font-bold">✨ Spark<span className="text-primary">Resume</span></h1>
            <div className="flex gap-2 flex-wrap">
              {!cvId ? (
                <button 
                  className="btn btn-success btn-sm gap-1"
                  onClick={handleCreateCV}
                  disabled={isSaving}
                >
                  {isSaving ? <span className="loading loading-spinner loading-sm"></span> : <Save className="w-4" />}
                  New CV
                </button>
              ) : (
                <button 
                  className="btn btn-success btn-sm gap-1"
                  onClick={handleSaveCV}
                  disabled={isSaving}
                >
                  {isSaving ? <span className="loading loading-spinner loading-sm"></span> : <Save className="w-4" />}
                  Save
                </button>
              )}
              <button className="btn btn-primary btn-sm" onClick={() => (document.getElementById('my_modal_3') as HTMLDialogElement).showModal()}>
                Preview
                <Eye className="w-4" />
              </button>
            </div>
          </div>

          {saveMessage && (
            <div className={`alert mb-4 ${saveMessage.includes('Error') ? 'alert-error' : 'alert-success'}`}>
              <p>{saveMessage}</p>
            </div>
          )}

          {/* Mobile Form Tabs */}
          <div className="tabs tabs-bordered mb-6 overflow-x-auto">
            <input type="radio" name="builder_tabs" className="tab text-xs sm:text-sm" aria-label="Template" defaultChecked />
            <div className="tab-content p-4 bg-base-100 rounded-b-lg">
              <h2 className="text-lg font-bold mb-4">CV Template & Layout</h2>
              <TemplateSelector
                selectedTemplate={templateId}
                onTemplateChange={setTemplateId}
              />
              <div className="mt-4">
                <CVModelSelector
                  selectedModel={cvModel}
                  onModelChange={setCvModel}
                />
              </div>
              <Link href="/templates" className="btn btn-outline btn-primary w-full gap-2 mt-4">
                <Palette className="w-4" />
                Browse Gallery
              </Link>
              <div className="mt-6 alert alert-info">
                <span>Choose a template that best fits your style. You can preview it in the modal.</span>
              </div>
            </div>

            <input type="radio" name="builder_tabs" className="tab text-xs sm:text-sm" aria-label="Personal" />
            <div className="tab-content p-4 bg-base-100 rounded-b-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Personal Details</h2>
                <button onClick={handleResetPersonalDetails} className="btn btn-primary btn-xs">
                  <RotateCw className="w-3" />
                </button>
              </div>
              <PersonalDetailsForm
                personalDetails={personalDetails}
                setPersonalDetails={setPersonalDetails}
                setFile={setFile}
              />
            </div>

            <input type="radio" name="builder_tabs" className="tab text-xs sm:text-sm" aria-label="Experience" />
            <div className="tab-content p-4 bg-base-100 rounded-b-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Experience</h2>
                <button onClick={handleResetExperiences} className="btn btn-primary btn-xs">
                  <RotateCw className="w-3" />
                </button>
              </div>
              <div className="space-y-2 mb-4">
                {experiences.map((exp, index) => (
                  <div key={index} className="card bg-base-200 p-3">
                    <p className="font-semibold text-sm">{exp.jobTitle}</p>
                    <p className="text-xs opacity-70">{exp.companyName}</p>
                    <button onClick={() => handleDeleteExperience(index)} className="btn btn-ghost btn-xs mt-2">
                      <Trash2 className="w-3" /> Delete
                    </button>
                  </div>
                ))}
              </div>
              <ExperienceForm experience={experiences} setExperiences={setExperience} />
            </div>

            <input type="radio" name="builder_tabs" className="tab text-xs sm:text-sm" aria-label="Education" />
            <div className="tab-content p-4 bg-base-100 rounded-b-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Education</h2>
                <button onClick={handleResetEducations} className="btn btn-primary btn-xs">
                  <RotateCw className="w-3" />
                </button>
              </div>
              <div className="space-y-2 mb-4">
                {educations.map((edu, index) => (
                  <div key={index} className="card bg-base-200 p-3">
                    <p className="font-semibold text-sm">{edu.degree}</p>
                    <p className="text-xs opacity-70">{edu.school}</p>
                    <button onClick={() => handleDeleteEducation(index)} className="btn btn-ghost btn-xs mt-2">
                      <Trash2 className="w-3" /> Delete
                    </button>
                  </div>
                ))}
              </div>
              <EducationForm educations={educations} setEducations={setEducations} />
            </div>

            <input type="radio" name="builder_tabs" className="tab text-xs sm:text-sm" aria-label="Languages" />
            <div className="tab-content p-4 bg-base-100 rounded-b-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Languages</h2>
                <button onClick={handleResetLanguages} className="btn btn-primary btn-xs">
                  <RotateCw className="w-3" />
                </button>
              </div>
              <div className="space-y-2 mb-4">
                {languages.map((lang, index) => (
                  <div key={index} className="card bg-base-200 p-3">
                    <p className="font-semibold text-sm">{lang.language}</p>
                    <p className="text-xs opacity-70">{lang.proficiency}</p>
                    <button onClick={() => handleDeleteLanguage(index)} className="btn btn-ghost btn-xs mt-2">
                      <Trash2 className="w-3" /> Delete
                    </button>
                  </div>
                ))}
              </div>
              <LanguageForm languages={languages} setLanguages={setLanguages} />
            </div>

            <input type="radio" name="builder_tabs" className="tab text-xs sm:text-sm" aria-label="Skills/Hobbies" />
            <div className="tab-content p-4 bg-base-100 rounded-b-lg">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">Skills</h2>
                    <button onClick={handleResetSkills} className="btn btn-primary btn-xs">
                      <RotateCw className="w-3" />
                    </button>
                  </div>
                  <div className="space-y-2 mb-4">
                    {skills.map((skill, index) => (
                      <div key={index} className="badge badge-primary badge-lg w-full flex justify-between">
                        <span>{skill.name}</span>
                        <button onClick={() => handleDeleteSkill(index)} className="btn btn-ghost btn-xs">
                          <Trash2 className="w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <SkillForm skills={skills} setSkills={setSkills} />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">Hobbies</h2>
                    <button onClick={handleResetHobbies} className="btn btn-primary btn-xs">
                      <RotateCw className="w-3" />
                    </button>
                  </div>
                  <div className="space-y-2 mb-4">
                    {hobbies.map((hobby, index) => (
                      <div key={index} className="badge badge-secondary badge-lg w-full flex justify-between">
                        <span>{hobby.name}</span>
                        <button onClick={() => handleDeleteHobby(index)} className="btn btn-ghost btn-xs">
                          <Trash2 className="w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <HobbyForm hobbies={hobbies} setHobbies={setHobbies} />
                </div>
              </div>
            </div>

            <input type="radio" name="builder_tabs" className="tab text-xs sm:text-sm" aria-label="Theme" />
            <div className="tab-content p-4 bg-base-100 rounded-b-lg">
              <h2 className="text-lg font-bold mb-4">CV Theme, Layout & Preview Mode</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold mb-2 block">CV Layout</label>
                  <CVModelSelector
                    selectedModel={cvModel}
                    onModelChange={setCvModel}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold mb-2 block">Visual Theme</label>
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="select select-bordered w-full text-sm"
                  >
                    {themes.map((themeName) => (
                      <option key={themeName} value={themeName}>
                        {themeName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold mb-2 block">Preview Mode</label>
                  <select
                    value={useTextTemplate ? '1' : '0'}
                    onChange={(e) => setUseTextTemplate(e.target.value === '1')}
                    className="select select-bordered w-full text-sm"
                  >
                    <option value="0">Visual CV</option>
                    <option value="1">Text Template</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal - Works for all screens */}
    </div>
  );
}
