/** @type {import('next').NextConfig} */

module.exports = {
	reactStrictMode: true,
	i18n: {
		locales: ['en-CA', 'en-US', 'fr'],
		defaultLocale: 'en-CA',
		localeDetection: true,
		domains: [
			{
				domain: 'ratethelandlord.org',
				defaultLocale: 'en-CA',
			},
		],
	},
}
