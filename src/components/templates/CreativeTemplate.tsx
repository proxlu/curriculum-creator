import React from 'react';
import { useTranslation } from 'react-i18next';
import { ResumeData } from '../../types';
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Award } from 'lucide-react';

interface CreativeTemplateProps {
  resumeData: ResumeData;
}

const CreativeTemplate: React.FC<CreativeTemplateProps> = ({ resumeData }) => {
  const { t } = useTranslation();
  const { personalInfo, experiences, education, skills } = resumeData;
  
  return (
    <div className="font-sans text-gray-800 max-w-4xl mx-auto">
      {/* Header with gradient background */}
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-t-lg">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {personalInfo.profilePicture && (
            <div className="flex-shrink-0">
              <img 
                src={personalInfo.profilePicture} 
                alt={personalInfo.fullName}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>
          )}
          
          <div className="flex-grow text-center md:text-left">
            <h1 className="text-3xl font-bold">{personalInfo.fullName || 'Your Name'}</h1>
            {personalInfo.title && (
              <h2 className="text-xl text-purple-200 font-medium mt-1">{personalInfo.title}</h2>
            )}
            
            <div className="mt-3 flex flex-wrap gap-4 justify-center md:justify-start">
              {personalInfo.email && (
                <div className="flex items-center text-sm">
                  <Mail size={14} className="mr-1" />
                  <span>{personalInfo.email}</span>
                </div>
              )}
              
              {personalInfo.phone && (
                <div className="flex items-center text-sm">
                  <Phone size={14} className="mr-1" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              
              {personalInfo.address && (
                <div className="flex items-center text-sm">
                  <MapPin size={14} className="mr-1" />
                  <span>{personalInfo.address}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      
      <div className="bg-white p-6 rounded-b-lg shadow-md">
        {/* Summary */}
        {personalInfo.summary && (
          <section className="mb-8 bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
            <p className="text-gray-700 leading-relaxed italic">{personalInfo.summary}</p>
          </section>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left column: Skills */}
          <div className="md:col-span-1">
            {skills.length > 0 && (
              <section className="mb-6">
                <h2 className="text-xl font-bold text-purple-700 mb-4 flex items-center">
                  <Award size={20} className="mr-2" />
                  {t('skills')}
                </h2>
                
                <div className="space-y-3">
                  {skills.map((skill, index) => (
                    <div key={index} className="flex flex-col">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-gray-700">{skill.name}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full" 
                          style={{ width: `${(skill.level / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
          
          {/* Right column: Experience and Education */}
          <div className="md:col-span-2">
            {/* Experience */}
            {experiences.length > 0 && (
              <section className="mb-8">
                <h2 className="text-xl font-bold text-purple-700 mb-4 flex items-center">
                  <Briefcase size={20} className="mr-2" />
                  {t('experience')}
                </h2>
                
                <div className="space-y-6">
                  {experiences.map((exp, index) => (
                    <div key={index} className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:bg-purple-500 before:rounded-full before:z-10 after:content-[''] after:absolute after:left-1.5 after:top-2 after:bottom-0 after:w-0.5 after:bg-purple-200 after:z-0">
                      <h3 className="font-semibold text-lg text-purple-800">{exp.jobTitle}</h3>
                      <div className="text-gray-600 mb-1">
                        {exp.company}{exp.location && `, ${exp.location}`}
                      </div>
                      <div className="text-sm text-purple-600 mb-2 font-medium">
                        {exp.startDate} - {exp.current ? t('current') : exp.endDate}
                      </div>
                      {exp.description && (
                        <p className="text-gray-700">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
            
            {/* Education */}
            {education.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-purple-700 mb-4 flex items-center">
                  <GraduationCap size={20} className="mr-2" />
                  {t('education')}
                </h2>
                
                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <div key={index} className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:bg-purple-500 before:rounded-full before:z-10 after:content-[''] after:absolute after:left-1.5 after:top-2 after:bottom-0 after:w-0.5 after:bg-purple-200 after:z-0">
                      <h3 className="font-semibold text-lg text-purple-800">
                        {edu.degree}{edu.fieldOfStudy && ` in ${edu.fieldOfStudy}`}
                      </h3>
                      <div className="text-gray-600 mb-1">
                        {edu.institution}{edu.location && `, ${edu.location}`}
                      </div>
                      <div className="text-sm text-purple-600 mb-2 font-medium">
                        {edu.startDate} - {edu.current ? t('current') : edu.endDate}
                      </div>
                      {edu.description && (
                        <p className="text-gray-700">{edu.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreativeTemplate;