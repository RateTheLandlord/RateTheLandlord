//This component will be for the Home page. It's layout will be determined by the Figma design

import {useTranslation} from 'react-i18next'
import LinkButtonLG from '../ui/link-button-lg'
import LinkButtonLightLG from '../ui/link-button-light-lg'

function Hero(): JSX.Element {
	const {t} = useTranslation('home')
	return (
		<div className="relative min-w-full">
			<div className="relative pt-6">
				<main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24">
					<div className="text-center">
						<h1 className="text-4xl tracking-tight font-extrabold  sm:text-5xl md:text-6xl block text-teal-600">
							{t('home.hero.title')}
						</h1>
						<p className="mt-3 max-w-md mx-auto text-base  sm:text-lg md:mt-5 md:text-xl md:max-w-full">
							{t('home.hero.body')}
						</p>
						<div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
							<LinkButtonLG href="/create-review">
								{t('home.hero.submit')}
							</LinkButtonLG>
							<LinkButtonLightLG href="/reviews">
								{t('home.hero.read')}
							</LinkButtonLightLG>
						</div>
					</div>
				</main>
			</div>
		</div>
	)
}

export default Hero
