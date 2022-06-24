import Layout from '@/Components/Layout/Layout'
import {AppProps} from 'next/app'
import '../styles/main.css'

//State for Admin Login may be held here (Admin Status {Logged In? Username?})

function MyApp({Component, pageProps}: AppProps): JSX.Element {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	)
}

export default MyApp
