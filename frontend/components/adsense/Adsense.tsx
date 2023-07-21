import AdSense from 'react-adsense'

const isProd = process.env.NODE_ENV === 'production'

const AdsComponent = ({slot}: {slot: string}) => {
	if (isProd) {
		return (
			<div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
				<AdSense.Google
					client="ca-pub-1233437669445756"
					slot={slot}
					style={{display: 'block'}}
					format="auto"
					responsive="true"
					className="adsbygoogle h-[100px] md:h-[90px]"
				/>
			</div>
		)
	} else {
		// For development environment, don't render the ad unit
		return null
	}
}

export default AdsComponent
