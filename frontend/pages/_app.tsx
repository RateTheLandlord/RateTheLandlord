import Layout from '@/components/layout/layout'
import {AppProps} from 'next/app'
import '../styles/global.css'
import '../i18n'
import {Provider} from 'react-redux'
import {store} from '@/redux/store'
import {FlagsmithProvider} from 'flagsmith/react'
import flagsmith from 'flagsmith'

function MyApp({Component, pageProps}: AppProps): JSX.Element {
	return (
		<Provider store={store}>
			<FlagsmithProvider
				options={{
					environmentID: process.env.NEXT_PUBLIC_FEATURE_FLAG_ID as string,
				}}
				flagsmith={flagsmith}
			>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</FlagsmithProvider>
		</Provider>
	)
}

export default MyApp