import {useTranslation} from 'react-i18next'

const Moderation = () => {
	const {t} = useTranslation('about')
	return (
		<div data-testid="about-moderation-1" className="bg-white w-full">
			<div className="mx-auto max-w-7xl px-6 lg:px-8 text-lg">
				<h3 className="mt-2 block text-center text-xl font-bold leading-8 tracking-tight text-gray-900 sm:text-2xl">
					{t('about.moderation.moderation')}
				</h3>
				<p className="mt-8 text-xl leading-8 text-gray-500">
					{t('about.moderation.p-1')}
				</p>
			</div>
		</div>
	)
}

export default Moderation
