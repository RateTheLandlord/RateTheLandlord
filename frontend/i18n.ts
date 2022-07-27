import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import translationENCA from './public/locales/en-CA/translation.json'

const resources = {
	en: {
		translation: translationENCA,
	},
}

i18n
	.use(LanguageDetector)
	.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		resources: resources,
		fallbackLng: 'en-CA',
		debug: true,
		interpolation: {
			escapeValue: false, // react already safes from xss
		},
	})

export default i18n
