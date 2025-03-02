import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Edit, Trash2, Info } from 'lucide-react';
import { Education } from '../types';
import Tooltip from './Tooltip';

interface EducationFormProps {
  education: Education[];
  onAdd: (education: Education) => void;
  onUpdate: (index: number, education: Education) => void;
  onRemove: (index: number) => void;
}

const EducationForm: React.FC<EducationFormProps> = ({ 
  education, 
  onAdd, 
  onUpdate, 
  onRemove 
}) => {
  const { t } = useTranslation();
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const emptyEducation: Education = {
    institution: '',
    degree: '',
    fieldOfStudy: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ''
  };
  
  const [formData, setFormData] = useState<Education>(emptyEducation);
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: checked,
      ...(name === 'current' && checked ? { endDate: '' } : {})
    }));
  };
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.institution.trim()) {
      newErrors.institution = t('required');
    }
    
    if (!formData.degree.trim()) {
      newErrors.degree = t('required');
    }
    
    if (!formData.startDate) {
      newErrors.startDate = t('required');
    }
    
    if (!formData.current && !formData.endDate) {
      newErrors.endDate = t('required');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (editingIndex !== null) {
      onUpdate(editingIndex, formData);
      setEditingIndex(null);
    } else {
      onAdd(formData);
    }
    
    setFormData(emptyEducation);
    setIsAdding(false);
  };
  
  const handleEdit = (index: number) => {
    setFormData(education[index]);
    setEditingIndex(index);
    setIsAdding(true);
  };
  
  const handleCancel = () => {
    setFormData(emptyEducation);
    setEditingIndex(null);
    setIsAdding(false);
    setErrors({});
  };
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{t('education')}</h2>
      
      {/* List of education */}
      {education.length > 0 ? (
        <div className="mb-6 space-y-4">
          {education.map((edu, index) => (
            <div key={index} className="border rounded-md p-4 bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}</h3>
                  <p className="text-gray-600">{edu.institution}, {edu.location}</p>
                  <p className="text-sm text-gray-500">
                    {edu.startDate} - {edu.current ? t('current') : edu.endDate}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(index)}
                    className="p-1 text-blue-600 hover:text-blue-800"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => onRemove(index)}
                    className="p-1 text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              {edu.description && (
                <p className="mt-2 text-sm text-gray-700">{edu.description}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mb-4">{t('addEducation')} {t('to')} {t('yourResume')}</p>
      )}
      
      {/* Add/Edit form */}
      {isAdding ? (
        <form onSubmit={handleSubmit} className="border rounded-md p-4 bg-white">
          <h3 className="font-medium mb-4">
            {editingIndex !== null ? t('edit') : t('addEducation')}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Institution */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('institution')} *
                <Tooltip content={t('institutionTip')}>
                  <Info size={16} className="inline-block ml-1 text-gray-400" />
                </Tooltip>
              </label>
              <input
                type="text"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.institution ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.institution && (
                <p className="text-red-500 text-xs mt-1">{errors.institution}</p>
              )}
            </div>
            
            {/* Degree */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('degree')} *
                <Tooltip content={t('degreeTip')}>
                  <Info size={16} className="inline-block ml-1 text-gray-400" />
                </Tooltip>
              </label>
              <input
                type="text"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.degree ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.degree && (
                <p className="text-red-500 text-xs mt-1">{errors.degree}</p>
              )}
            </div>
            
            {/* Field of Study */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('fieldOfStudy')}
                <Tooltip content={t('fieldTip')}>
                  <Info size={16} className="inline-block ml-1 text-gray-400" />
                </Tooltip>
              </label>
              <input
                type="text"
                name="fieldOfStudy"
                value={formData.fieldOfStudy}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            
            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('location')}
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            
            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('startDate')} *
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.startDate ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.startDate && (
                <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>
              )}
            </div>
            
            {/* Current Education Checkbox */}
            <div className="flex items-center mt-6">
              <input
                type="checkbox"
                id="current"
                name="current"
                checked={formData.current}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="current" className="ml-2 block text-sm text-gray-700">
                {t('current')}
              </label>
            </div>
            
            {/* End Date */}
            {!formData.current && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('endDate')} *
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.endDate ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-1 focus:ring-blue-500`}
                />
                {errors.endDate && (
                  <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>
                )}
              </div>
            )}
          </div>
          
          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('description')}
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700"
            >
              {t('save')}
            </button>
          </div>
        </form>
      ) : (
        <button
          type="button"
          onClick={() => setIsAdding(true)}
          className="flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100"
        >
          <Plus size={18} className="mr-1" />
          {t('addEducation')}
        </button>
      )}
    </div>
  );
};

export default EducationForm;