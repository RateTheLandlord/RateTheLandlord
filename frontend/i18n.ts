import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import layoutENCA from './public/locales/en-CA/layout.json'
import homeENCA from './public/locales/en-CA/home.json'
import createreviewENCA from './public/locales/en-CA/createreview.json'
import reviewsENCA from './public/locales/en-CA/reviews.json'
import aboutENCA from './public/locales/en-CA/about.json'
import landlordENCA from './public/locales/en-CA/landlord.json'
import alertsENCA from './public/locales/en-CA/alerts.json'
import resourcesENCA from './public/locales/en-CA/resources.json'

const resources = {
	en: {
		about: aboutENCA,
		alerts: alertsENCA,
		create: createreviewENCA,
		home: homeENCA,
		landlord: landlordENCA,
		layout: layoutENCA,
		resourcesPage: resourcesENCA,
		reviews: reviewsENCA,
	},
}

void i18n
	.use(LanguageDetector)
	.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		resources: resources,
		fallbackLng: 'en',
		debug: false,
		interpolation: {
			escapeValue: false, // react already safes from xss
		},
	})

export default i18n