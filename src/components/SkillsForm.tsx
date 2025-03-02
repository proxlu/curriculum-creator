import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Trash2, Info } from 'lucide-react';
import { Skill } from '../types';
import Tooltip from './Tooltip';

interface SkillsFormProps {
  skills: Skill[];
  onChange: (skills: Skill[]) => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ skills, onChange }) => {
  const { t } = useTranslation();
  const [newSkill, setNewSkill] = useState<Skill>({ name: '', level: 3 });
  const [error, setError] = useState<string>('');
  
  const handleAddSkill = () => {
    if (!newSkill.name.trim()) {
      setError(t('required'));
      return;
    }
    
    const updatedSkills = [...skills, { ...newSkill, id: Date.now().toString() }];
    onChange(updatedSkills);
    setNewSkill({ name: '', level: 3 });
    setError('');
  };
  
  const handleRemoveSkill = (index: number) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    onChange(updatedSkills);
  };
  
  const handleSkillNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSkill(prev => ({ ...prev, name: e.target.value }));
    if (e.target.value.trim()) {
      setError('');
    }
  };
  
  const handleSkillLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSkill(prev => ({ ...prev, level: parseInt(e.target.value) }));
  };
  
  const getSkillLevelLabel = (level: number): string => {
    switch (level) {
      case 1: return t('beginner');
      case 2: return t('beginner') + '+';
      case 3: return t('intermediate');
      case 4: return t('advanced');
      case 5: return t('expert');
      default: return t('intermediate');
    }
  };
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{t('skills')}</h2>
      
      {/* Add new skill */}
      <div className="mb-6 border rounded-md p-4 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('skillName')}
              <Tooltip content={t('skillTip')}>
                <Info size={16} className="inline-block ml-1 text-gray-400" />
              </Tooltip>
            </label>
            <input
              type="text"
              value={newSkill.name}
              onChange={handleSkillNameChange}
              className={`w-full px-3 py-2 border rounded-md ${
                error ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-1 focus:ring-blue-500`}
              placeholder={t('skillName')}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('skillLevel')}
            </label>
            <div className="flex flex-col">
              <input
                type="range"
                min="1"
                max="5"
                value={newSkill.level}
                onChange={handleSkillLevelChange}
                className="w-full"
              />
              <span className="text-sm text-gray-600 mt-1">
                {getSkillLevelLabel(newSkill.level)}
              </span>
            </div>
          </div>
        </div>
        
        <button
          type="button"
          onClick={handleAddSkill}
          className="flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100"
        >
          <Plus size={18} className="mr-1" />
          {t('addSkill')}
        </button>
      </div>
      
      {/* Skills list */}
      {skills.length > 0 ? (
        <div className="space-y-2">
          <h3 className="font-medium text-gray-700 mb-2">{t('skills')}</h3>
          {skills.map((skill, index) => (
            <div 
              key={skill.id || index} 
              className="flex justify-between items-center p-3 bg-gray-50 rounded-md"
            >
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-sm text-gray-600">
                    {getSkillLevelLabel(skill.level)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                  <div 
                    className="bg-blue-600 h-1.5 rounded-full" 
                    style={{ width: `${(skill.level / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveSkill(index)}
                className="ml-4 p-1 text-red-600 hover:text-red-800"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">{t('addSkill')} {t('to')} {t('yourResume')}</p>
      )}
    </div>
  );
};

export default SkillsForm;