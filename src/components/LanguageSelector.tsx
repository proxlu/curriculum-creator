import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  
  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-3 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
          id="language-menu"
          aria-expanded="true"
          aria-haspopup="true"
        >
          <Languages size={16} className="mr-1" />
          {i18n.language === 'pt' ? 'PT' : i18n.language === 'es' ? 'ES' : 'EN'}
        </button>
      </div>
      
      <div
        className="origin-top-right absolute right-0 mt-2 w-24 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="language-menu"
      >
        <div className="py-1" role="none">
          <button
            onClick={() => changeLanguage('pt')}
            className={`block w-full text-left px-4 py-2 text-sm ${
              i18n.language === 'pt' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
            } hover:bg-gray-100`}
            role="menuitem"
          >
            Português
          </button>
          <button
            onClick={() => changeLanguage('en')}
            className={`block w-full text-left px-4 py-2 text-sm ${
              i18n.language === 'en' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
            } hover:bg-gray-100`}
            role="menuitem"
          >
            English
          </button>
          <button
            onClick={() => changeLanguage('es')}
            className={`block w-full text-left px-4 py-2 text-sm ${
              i18n.language === 'es' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
            } hover:bg-gray-100`}
            role="menuitem"
          >
            Español
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;