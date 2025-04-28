import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
i18n.use(Backend)
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        lng: 'en',
        fallbackLng: 'en',
        debug: process.env.NODE_ENV !== 'production',
        interpolation: {
            escapeValue: false,
        },
        backend: {
            load: 'languageOnly',
            loadPath: '/api/translations/{{lng}}',
        },
        detection: {
            lookupCookie: 'language',
        },
    });

export default i18n;
