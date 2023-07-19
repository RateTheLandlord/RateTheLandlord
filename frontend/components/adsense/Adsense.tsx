const isProd = true //process.env.NODE_ENV === 'production'

const Adsense = () => {
	if (isProd) {
		return (
			<div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
				<script
					async
					src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1233437669445756"
					crossOrigin="anonymous"
				></script>
				<ins
					className="adsbygoogle h-[100px] md:h-[90px]"
					style={{display: 'block'}}
					data-ad-client="ca-pub-1233437669445756"
					data-ad-slot="2009320000"
					data-ad-format="auto"
					data-full-width-responsive="true"
				></ins>
				<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
			</div>
		)
	} else return null
}

export default Adsense