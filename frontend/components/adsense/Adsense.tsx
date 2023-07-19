import {useEffect} from 'react'

const isProd = process.env.NODE_ENV === 'production'

const AdsComponent = () => {
	useEffect(() => {
		// Only load the Google AdSense script in production to comply with AdSense policies
		if (isProd) {
			// @ts-ignore
			;(window.adsbygoogle = window.adsbygoogle || []).push({})
		}
	}, [])

	if (isProd) {
		return (
			<div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
				<ins
					className="adsbygoogle h-[100px] md:h-[90px]"
					style={{display: 'block'}}
					data-ad-client="ca-pub-1233437669445756"
					data-ad-slot="2009320000"
					data-ad-format="auto"
					data-full-width-responsive="true"
				></ins>
			</div>
		)
	} else {
		// For development environment, don't render the ad unit
		return null
	}
}

export default AdsComponent