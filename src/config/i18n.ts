import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

i18next
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: localStorage.getItem('lang') || 'en',
    fallbackLng: 'en',
    preload: ['es', 'en'],
    backend: {
      loadPath: '/i18n/{{lng}}.json',
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });
