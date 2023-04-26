import {useTranslation} from 'react-i18next'

const AboutUs = () => {
	const {t} = useTranslation('about')
	return (
		<div data-testid="about-aboutus-1" className="w-full bg-white">
			<div className="mx-auto max-w-7xl px-6 text-lg lg:px-8">
				<h1>
					<span className="mt-2 block text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
						{t('about.about-us.about')}
					</span>
				</h1>
				<p className="mt-8 text-center text-xl font-bold leading-8 text-gray-500">
					{t('about.about-us.header')}
				</p>
				<p className="mt-8 text-xl leading-8 text-gray-500">
					{t('about.about-us.p-1')}
				</p>
				<p className="mt-8 text-xl leading-8 text-gray-500">
					{t('about.about-us.p-2')}
				</p>
				<p className="mt-8 text-xl leading-8 text-gray-500">
					{t('about.about-us.p-3')}
				</p>
				<p className="mt-8 text-xl leading-8 text-gray-500">
					{t('about.about-us.p-4')}
				</p>
			</div>
		</div>
	)
}

export default AboutUs
