import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaGlobe } from 'react-icons/fa';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);

    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
  };

  const currentLanguage = i18n.language.split('-')[0].toLowerCase();

  const languages = [
    { code: 'en', label: 'English', activeColor: 'text-[#0b99ce]' },
    { code: 'bn', label: 'বাংলা', activeColor: 'text-[#fe3885]' },
    { code: 'zh', label: 'Chinese', activeColor: 'text-[#e63946]' },
  ];

  return (
    <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100 shadow-inner">
      <div className="pl-3 pr-2 text-[#0b99ce]">
        <FaGlobe size={14} />
      </div>
      {languages.map(({ code, label, activeColor }) => (
        <button
          key={code}
          onClick={() => changeLanguage(code)}
          className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
            currentLanguage === code
              ? `bg-white ${activeColor} shadow-sm ring-1 ring-slate-100`
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
