import {useTranslation} from 'react-i18next'

const Contact = () => {
	const {t} = useTranslation('about')
	return (
		<div data-testid="about-contact-1">
			<h3>
				<span className="mt-2 block text-center text-xl font-bold leading-8 tracking-tight text-gray-900 sm:text-2xl">
					{t('about.contact.title')}
				</span>
			</h3>
			<div className="text-center">
				<a
					href="mailto:contact@ratethelandlord.org"
					className="mt-8 text-xl leading-8 text-gray-500"
				>
					{t('about.contact.email')}
				</a>
			</div>
		</div>
	)
}

export default Contact