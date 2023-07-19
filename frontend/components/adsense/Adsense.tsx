const isProd = process.env.NODE_ENV === 'production'

const Adsense = () => {
	if (isProd) {
		return (
			<>
				<script
					async
					src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1233437669445756"
					crossOrigin="anonymous"
				></script>
				<ins
					className="adsbygoogle"
					style={{display: 'block'}}
					data-ad-client="ca-pub-1233437669445756"
					data-ad-slot="2009320000"
					data-ad-format="auto"
					data-full-width-responsive="true"
				></ins>
				<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
			</>
		)
	} else return null
}

export default Adsense