import Document, {Html, Main, NextScript} from 'next/document'
const isProd = process.env.NODE_ENV === 'production'

export default class MyDocument extends Document {
	render(): JSX.Element {
		return (
			<Html>
				<body>
					<Main />
					<NextScript />
					{/* Cloudflare Web Analytics */}
					{isProd && (
						<>
							<script
								defer
								src="https://static.cloudflareinsights.com/beacon.min.js"
								data-cf-beacon='{"token": "8cf4d134ee8a33518b72e78bc9e1eaa8", "spa": true}'
							/>
						</>
					)}
				</body>
			</Html>
		)
	}
}
