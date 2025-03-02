import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Camera, Trash2, Info } from 'lucide-react';
import { PersonalInfo } from '../types';
import Tooltip from './Tooltip';

interface PersonalInfoFormProps {
  personalInfo: PersonalInfo;
  onChange: (info: PersonalInfo) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ personalInfo, onChange }) => {
  const { t } = useTranslation();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Validate fields
    let newErrors = { ...errors };
    
    if (name === 'email' && value && !/\S+@\S+\.\S+/.test(value)) {
      newErrors.email = t('invalidEmail');
    } else if (name === 'email' && !value) {
      newErrors.email = t('required');
    } else {
      delete newErrors.email;
    }
    
    if (name === 'fullName' && !value) {
      newErrors.fullName = t('required');
    } else {
      delete newErrors.fullName;
    }
    
    setErrors(newErrors);
    
    onChange({
      ...personalInfo,
      [name]: value
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('File size exceeds 2MB limit');
      return;
    }
    
    // Check file type
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      alert('Only JPG and PNG files are allowed');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      onChange({
        ...personalInfo,
        profilePicture: event.target?.result as string
      });
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    onChange({
      ...personalInfo,
      profilePicture: null
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">{t('personalInfo')}</h2>
      
      {/* Profile Picture */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('profilePicture')}
        </label>
        <div className="flex items-center gap-4">
          <div className="relative">
            {personalInfo.profilePicture ? (
              <div className="relative">
                <img 
                  src={personalInfo.profilePicture} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                />
                <button
                  type="button"
                  onClick={removePhoto}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-2 border-gray-300">
                <Camera size={32} className="text-gray-400" />
              </div>
            )}
          </div>
          
          <div>
            <label className="block">
              <span className="sr-only">{t('uploadPhoto')}</span>
              <input
                type="file"
                accept="image/jpeg, image/png"
                onChange={handlePhotoUpload}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
            </label>
            <p className="text-xs text-gray-500 mt-1">{t('maxFileSize')}</p>
          </div>
        </div>
      </div>
      
      {/* Full Name */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('fullName')} *
          <Tooltip content={t('nameTip')}>
            <Info size={16} className="inline-block ml-1 text-gray-400" />
          </Tooltip>
        </label>
        <input
          type="text"
          name="fullName"
          value={personalInfo.fullName}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.fullName ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-1 focus:ring-blue-500`}
          required
        />
        {errors.fullName && (
          <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
        )}
      </div>
      
      {/* Professional Title */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('title')}
          <Tooltip content={t('titleTip')}>
            <Info size={16} className="inline-block ml-1 text-gray-400" />
          </Tooltip>
        </label>
        <input
          type="text"
          name="title"
          value={personalInfo.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      
      {/* Email */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('email')} *
          <Tooltip content={t('emailTip')}>
            <Info size={16} className="inline-block ml-1 text-gray-400" />
          </Tooltip>
        </label>
        <input
          type="email"
          name="email"
          value={personalInfo.email}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-1 focus:ring-blue-500`}
          required
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
      </div>
      
      {/* Phone */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('phone')}
          <Tooltip content={t('phoneTip')}>
            <Info size={16} className="inline-block ml-1 text-gray-400" />
          </Tooltip>
        </label>
        <input
          type="tel"
          name="phone"
          value={personalInfo.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      
      {/* Address */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('address')}
          <Tooltip content={t('addressTip')}>
            <Info size={16} className="inline-block ml-1 text-gray-400" />
          </Tooltip>
        </label>
        <input
          type="text"
          name="address"
          value={personalInfo.address}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      
      {/* Summary */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('summary')}
          <Tooltip content={t('summaryTip')}>
            <Info size={16} className="inline-block ml-1 text-gray-400" />
          </Tooltip>
        </label>
        <textarea
          name="summary"
          value={personalInfo.summary}
          onChange={handleChange}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      
      <p className="text-sm text-gray-500 mt-2">* {t('required')}</p>
    </div>
  );
};

export default PersonalInfoForm;