import {NextIntlProvider} from 'next-intl'
import {AppProps} from 'next/app'
import {useRouter} from 'next/router'
import '../styles/global.css'

//State for Admin Login may be held here (Admin Status {Logged In? Username?})

function MyApp({Component, pageProps}: AppProps): JSX.Element {
	//This gets the current Locale. This can be passed down to pages/components or we can update the _app.tsx to show different info based on locale
	//Translation will need to be done for French, other languages as needed.
	const router = useRouter()
	console.log(router.locale)
	return (
		<NextIntlProvider messages={pageProps.messages}>
			<Component {...pageProps} />
		</NextIntlProvider>
	)
}

export default MyApp
