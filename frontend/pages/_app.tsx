import Layout from '@/components/layout/layout'
import {AppProps} from 'next/app'
import '../styles/global.css'
import '../i18n'
import {Provider} from 'react-redux'
import {store} from '@/redux/store'
//State for Admin Login may be held here (Admin Status {Logged In? Username?})

function MyApp({Component, pageProps}: AppProps): JSX.Element {
	return (
		<Provider store={store}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	)
}

export default MyApp
