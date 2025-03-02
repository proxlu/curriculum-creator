import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useReactToPrint } from 'react-to-print';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import {
  Download, Eye, Save, Upload, Check, X, Camera, Trash2, 
  Languages, FileText, Briefcase, GraduationCap, Award
} from 'lucide-react';

// Components
import Header from './components/Header';
import PersonalInfoForm from './components/PersonalInfoForm';
import ExperienceForm from './components/ExperienceForm';
import EducationForm from './components/EducationForm';
import SkillsForm from './components/SkillsForm';
import ResumePreview from './components/ResumePreview';
import TemplateSelector from './components/TemplateSelector';
import LanguageSelector from './components/LanguageSelector';

// Types
import { 
  PersonalInfo, 
  Experience, 
  Education, 
  Skill, 
  ResumeData,
  Template
} from './types';

const App: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>('personal');
  const [selectedTemplate, setSelectedTemplate] = useState<Template>('modern');
  const [previewMode, setPreviewMode] = useState<boolean>(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  // Resume data state
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      profilePicture: null,
      title: '',
      summary: '',
    },
    experiences: [],
    education: [],
    skills: [],
  });

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setResumeData(parsedData);
      } catch (error) {
        console.error('Failed to parse saved resume data', error);
      }
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    // Create a copy without the profilePicture for storage
    const dataForStorage = {
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        profilePicture: null, // Don't store the image in localStorage
      }
    };
    localStorage.setItem('resumeData', JSON.stringify(dataForStorage));
  }, [resumeData]);

  // Update personal info
  const handlePersonalInfoChange = (info: PersonalInfo) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: info
    }));
  };

  // Add experience
  const handleAddExperience = (experience: Experience) => {
    setResumeData(prev => ({
      ...prev,
      experiences: [...prev.experiences, experience]
    }));
  };

  // Update experience
  const handleUpdateExperience = (index: number, experience: Experience) => {
    setResumeData(prev => {
      const updatedExperiences = [...prev.experiences];
      updatedExperiences[index] = experience;
      return {
        ...prev,
        experiences: updatedExperiences
      };
    });
  };

  // Remove experience
  const handleRemoveExperience = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== index)
    }));
  };

  // Add education
  const handleAddEducation = (education: Education) => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, education]
    }));
  };

  // Update education
  const handleUpdateEducation = (index: number, education: Education) => {
    setResumeData(prev => {
      const updatedEducation = [...prev.education];
      updatedEducation[index] = education;
      return {
        ...prev,
        education: updatedEducation
      };
    });
  };

  // Remove education
  const handleRemoveEducation = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  // Update skills
  const handleUpdateSkills = (skills: Skill[]) => {
    setResumeData(prev => ({
      ...prev,
      skills
    }));
  };

  // Handle print to PDF
  const handlePrintPDF = useReactToPrint({
    content: () => resumeRef.current,
    documentTitle: `${resumeData.personalInfo.fullName || 'Resume'}_CV`,
  });

  // Export as text
  const exportAsText = () => {
    const { personalInfo, experiences, education, skills } = resumeData;
    
    let textContent = `${personalInfo.fullName}\n`;
    textContent += `${personalInfo.title}\n`;
    textContent += `${personalInfo.email} | ${personalInfo.phone}\n`;
    textContent += `${personalInfo.address}\n\n`;
    
    textContent += `SUMMARY\n${personalInfo.summary}\n\n`;
    
    textContent += `EXPERIENCE\n`;
    experiences.forEach(exp => {
      textContent += `${exp.jobTitle} at ${exp.company}\n`;
      textContent += `${exp.startDate} - ${exp.endDate || 'Present'}\n`;
      textContent += `${exp.description}\n\n`;
    });
    
    textContent += `EDUCATION\n`;
    education.forEach(edu => {
      textContent += `${edu.degree} in ${edu.fieldOfStudy}\n`;
      textContent += `${edu.institution}\n`;
      textContent += `${edu.startDate} - ${edu.endDate || 'Present'}\n\n`;
    });
    
    textContent += `SKILLS\n`;
    skills.forEach(skill => {
      textContent += `${skill.name} - ${skill.level}/5\n`;
    });
    
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, `${personalInfo.fullName || 'Resume'}_CV.txt`);
  };

  // Save as draft
  const saveAsDraft = () => {
    const draftName = `resume_draft_${new Date().toISOString()}`;
    localStorage.setItem(draftName, JSON.stringify(resumeData));
    alert(t('draftSaved'));
  };

  // Load draft
  const loadDraft = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          setResumeData(data);
          alert(t('draftLoaded'));
        } catch (error) {
          alert(t('invalidDraftFile'));
        }
      };
      reader.readAsText(file);
    }
  };

  // Export as PDF using jsPDF and html2canvas
  const exportAsPDF = async () => {
    if (!resumeRef.current) return;
    
    const canvas = await html2canvas(resumeRef.current, {
      scale: 2,
      logging: false,
      useCORS: true
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    const imgWidth = 210;
    const imgHeight = canvas.height * imgWidth / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(`${resumeData.personalInfo.fullName || 'Resume'}_CV.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left side - Form */}
          {!previewMode && (
            <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md p-6">
              <div className="mb-6">
                <div className="flex border-b">
                  <button
                    className={`py-2 px-4 ${activeTab === 'personal' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('personal')}
                  >
                    {t('personalInfo')}
                  </button>
                  <button
                    className={`py-2 px-4 ${activeTab === 'experience' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('experience')}
                  >
                    {t('experience')}
                  </button>
                  <button
                    className={`py-2 px-4 ${activeTab === 'education' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('education')}
                  >
                    {t('education')}
                  </button>
                  <button
                    className={`py-2 px-4 ${activeTab === 'skills' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('skills')}
                  >
                    {t('skills')}
                  </button>
                  <button
                    className={`py-2 px-4 ${activeTab === 'template' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('template')}
                  >
                    {t('template')}
                  </button>
                </div>
              </div>

              {activeTab === 'personal' && (
                <PersonalInfoForm 
                  personalInfo={resumeData.personalInfo} 
                  onChange={handlePersonalInfoChange} 
                />
              )}
              
              {activeTab === 'experience' && (
                <ExperienceForm 
                  experiences={resumeData.experiences}
                  onAdd={handleAddExperience}
                  onUpdate={handleUpdateExperience}
                  onRemove={handleRemoveExperience}
                />
              )}
              
              {activeTab === 'education' && (
                <EducationForm 
                  education={resumeData.education}
                  onAdd={handleAddEducation}
                  onUpdate={handleUpdateEducation}
                  onRemove={handleRemoveEducation}
                />
              )}
              
              {activeTab === 'skills' && (
                <SkillsForm 
                  skills={resumeData.skills}
                  onChange={handleUpdateSkills}
                />
              )}
              
              {activeTab === 'template' && (
                <TemplateSelector 
                  selectedTemplate={selectedTemplate}
                  onChange={setSelectedTemplate}
                />
              )}
            </div>
          )}
          
          {/* Right side - Preview */}
          <div className={`w-full ${previewMode ? 'md:w-full' : 'md:w-1/2'} bg-white rounded-lg shadow-md p-6`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{t('preview')}</h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => setPreviewMode(!previewMode)}
                  className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  <Eye size={16} />
                  {previewMode ? t('editMode') : t('fullPreview')}
                </button>
                <LanguageSelector />
              </div>
            </div>
            
            <div ref={resumeRef} className="border rounded-lg p-4 bg-white">
              <ResumePreview 
                resumeData={resumeData} 
                template={selectedTemplate} 
              />
            </div>
            
            <div className="mt-6 flex flex-wrap gap-2">
              <button 
                onClick={handlePrintPDF}
                className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                <Download size={16} />
                {t('printPDF')}
              </button>
              <button 
                onClick={exportAsPDF}
                className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                <FileText size={16} />
                {t('exportPDF')}
              </button>
              <button 
                onClick={exportAsText}
                className="flex items-center gap-1 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                <FileText size={16} />
                {t('exportTXT')}
              </button>
              <button 
                onClick={saveAsDraft}
                className="flex items-center gap-1 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
              >
                <Save size={16} />
                {t('saveDraft')}
              </button>
              <label className="flex items-center gap-1 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 cursor-pointer">
                <Upload size={16} />
                {t('loadDraft')}
                <input 
                  type="file" 
                  accept=".json" 
                  className="hidden" 
                  onChange={loadDraft}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;