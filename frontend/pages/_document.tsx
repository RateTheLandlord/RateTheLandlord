import Document, { Head, Html, Main, NextScript } from "next/document";

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
							<script async src="http://159.203.4.57:3500/script.js" data-website-id="035d8dc9-e6d9-40b7-852b-e6a750c46a09"></script>
						</>
					)}
				</body>
			</Html>
		)
	}
}