import React from 'react';
import { ResumeData, Template } from '../types';
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import CreativeTemplate from './templates/CreativeTemplate';

interface ResumePreviewProps {
  resumeData: ResumeData;
  template: Template;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeData, template }) => {
  // Render the selected template
  switch (template) {
    case 'modern':
      return <ModernTemplate resumeData={resumeData} />;
    case 'classic':
      return <ClassicTemplate resumeData={resumeData} />;
    case 'creative':
      return <CreativeTemplate resumeData={resumeData} />;
    default:
      return <ModernTemplate resumeData={resumeData} />;
  }
};

export default ResumePreview;