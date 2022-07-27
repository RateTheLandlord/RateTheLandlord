import Layout from '@/components/layout/layout'
import {AppProps} from 'next/app'
import '../styles/global.css'
import '../i18n'

//State for Admin Login may be held here (Admin Status {Logged In? Username?})

function MyApp({Component, pageProps}: AppProps): JSX.Element {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	)
}

export default MyApp
