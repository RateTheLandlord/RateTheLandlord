import {useTranslation} from 'react-i18next'

const Revenue = () => {
	const {t} = useTranslation('about')
	return (
		<div data-testid="about-aboutus-1" className="w-full bg-white">
			<div className="mx-auto max-w-7xl px-6 text-lg lg:px-8">
				<h3 className="mt-2 block text-center text-xl font-bold leading-8 tracking-tight text-gray-900 sm:text-2xl">
					{t('about.revenue.title')}
				</h3>
				<p className="mt-8 text-xl leading-8 text-gray-500">
					{t('about.revenue.info')}
				</p>
			</div>
		</div>
	)
}

export default Revenue