import React from 'react';
import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';
import { Template } from '../types';

interface TemplateSelectorProps {
  selectedTemplate: Template;
  onChange: (template: Template) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ 
  selectedTemplate, 
  onChange 
}) => {
  const { t } = useTranslation();
  
  const templates: { id: Template; name: string; image: string }[] = [
    {
      id: 'modern',
      name: t('modernTemplate'),
      image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'classic',
      name: t('classicTemplate'),
      image: 'https://images.unsplash.com/photo-1586282391129-76a6df230234?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'creative',
      name: t('creativeTemplate'),
      image: 'https://images.unsplash.com/photo-1586282023358-7834ba3543a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
    }
  ];
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{t('selectTemplate')}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {templates.map(template => (
          <div 
            key={template.id}
            className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
              selectedTemplate === template.id 
                ? 'ring-2 ring-blue-500 border-blue-500' 
                : 'hover:shadow-md'
            }`}
            onClick={() => onChange(template.id)}
          >
            <div className="relative">
              <img 
                src={template.image} 
                alt={template.name}
                className="w-full h-40 object-cover"
              />
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                  <Check size={16} />
                </div>
              )}
            </div>
            <div className="p-3 bg-white">
              <h3 className="font-medium text-center">{template.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;