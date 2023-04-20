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
								src="https://analytics.umami.is/script.js"
								data-website-id="7feb6f2e-e933-4615-a403-d2be156c61e2"
							></script>
						</>
					)}
				</body>
			</Html>
		)
	}
}
