import React from 'react';
import { useTranslation } from 'react-i18next';
import { FileText } from 'lucide-react';

const Header: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText size={28} />
          <h1 className="text-2xl font-bold">{t('appTitle')}</h1>
        </div>
        <div className="text-sm">
          <span className="hidden md:inline">© 2025 {t('appTitle')}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;