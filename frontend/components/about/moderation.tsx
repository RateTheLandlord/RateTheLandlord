import {useTranslation} from 'react-i18next'

const Moderation = () => {
	const {t} = useTranslation('about')

	const paragraphs = [
		t('about.moderation.p-1'),
		t('about.moderation.p-2'),
		t('about.moderation.p-3'),
		t('about.moderation.p-4'),
		t('about.moderation.p-5'),
		t('about.moderation.p-6'),

	]
	return (
		<div data-testid="about-moderation-1" className="bg-white w-full">
			<div className="mx-auto max-w-7xl px-6 lg:px-8 text-lg">
				<h3 className="mt-2 block text-center text-xl font-bold leading-8 tracking-tight text-gray-900 sm:text-2xl">
					{t('about.moderation.moderation')}
				</h3>
				{paragraphs.map((p, i) => {
					return <p key={i}  className="mt-8 text-xl leading-8 text-gray-500">
					{p}
				</p>
				})}
			</div>
		</div>
	)
}

export default Moderation
