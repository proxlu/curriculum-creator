import React from 'react';
import { useTranslation } from 'react-i18next';
import { ResumeData } from '../../types';
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Award } from 'lucide-react';

interface ModernTemplateProps {
  resumeData: ResumeData;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ resumeData }) => {
  const { t } = useTranslation();
  const { personalInfo, experiences, education, skills } = resumeData;
  
  return (
    <div className="font-sans text-gray-800 max-w-4xl mx-auto">
      {/* Header */}
      <header className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6 pb-6 border-b border-gray-200">
        {personalInfo.profilePicture && (
          <div className="flex-shrink-0">
            <img 
              src={personalInfo.profilePicture} 
              alt={personalInfo.fullName}
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
            />
          </div>
        )}
        
        <div className="flex-grow text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-900">{personalInfo.fullName || 'Your Name'}</h1>
          {personalInfo.title && (
            <h2 className="text-xl text-blue-600 font-medium mt-1">{personalInfo.title}</h2>
          )}
          
          <div className="mt-3 flex flex-wrap gap-3 justify-center md:justify-start">
            {personalInfo.email && (
              <div className="flex items-center text-sm text-gray-600">
                <Mail size={14} className="mr-1" />
                <span>{personalInfo.email}</span>
              </div>
            )}
            
            {personalInfo.phone && (
              <div className="flex items-center text-sm text-gray-600">
                <Phone size={14} className="mr-1" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            
            {personalInfo.address && (
              <div className="flex items-center text-sm text-gray-600">
                <MapPin size={14} className="mr-1" />
                <span>{personalInfo.address}</span>
              </div>
            )}
          </div>
        </div>
      </header>
      
      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </section>
      )}
      
      {/* Experience */}
      {experiences.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Briefcase size={20} className="mr-2 text-blue-600" />
            {t('experience')}
          </h2>
          
          <div className="space-y-4">
            {experiences.map((exp, index) => (
              <div key={index} className="border-l-2 border-blue-500 pl-4 ml-2">
                <h3 className="font-semibold text-lg">{exp.jobTitle}</h3>
                <div className="text-gray-600 mb-1">
                  {exp.company}{exp.location && `, ${exp.location}`}
                </div>
                <div className="text-sm text-gray-500 mb-2">
                  {exp.startDate} - {exp.current ? t('current') : exp.endDate}
                </div>
                {exp.description && (
                  <p className="text-gray-700 text-sm">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <GraduationCap size={20} className="mr-2 text-blue-600" />
            {t('education')}
          </h2>
          
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index} className="border-l-2 border-blue-500 pl-4 ml-2">
                <h3 className="font-semibold text-lg">
                  {edu.degree}{edu.fieldOfStudy && ` in ${edu.fieldOfStudy}`}
                </h3>
                <div className="text-gray-600 mb-1">
                  {edu.institution}{edu.location && `, ${edu.location}`}
                </div>
                <div className="text-sm text-gray-500 mb-2">
                  {edu.startDate} - {edu.current ? t('current') : edu.endDate}
                </div>
                {edu.description && (
                  <p className="text-gray-700 text-sm">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Award size={20} className="mr-2 text-blue-600" />
            {t('skills')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {skills.map((skill, index) => (
              <div key={index} className="flex flex-col">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-gray-700">{skill.name}</span>
                  <span className="text-xs text-gray-500">
                    {skill.level}/5
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-blue-600 h-1.5 rounded-full" 
                    style={{ width: `${(skill.level / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ModernTemplate;