import Document, {Head, Html, Main, NextScript} from 'next/document'

const isProd = process.env.NODE_ENV === 'production'

export default class MyDocument extends Document {
	render(): JSX.Element {
		return (
			<Html>
				<Head />
				<body>
					<Main />
					<NextScript />
					{/* Cloudflare Web Analytics and Umami Analytics */}
					{isProd && (
						<>
							<script
								defer
								src="https://static.cloudflareinsights.com/beacon.min.js"
								data-cf-beacon='{"token": "8cf4d134ee8a33518b72e78bc9e1eaa8", "spa": true}'
							/>
							<script
								async
								src="https://umami.ratethelandlord.org/script.js"
								data-website-id="16199009-12ed-4ff2-818d-1109411869a3"
							></script>
						</>
					)}
					<script
						async
						src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1233437669445756"
						crossOrigin="anonymous"
					></script>
				</body>
			</Html>
		)
	}
}