import LoginForm from '@/components/login/login-form'
import {NextSeo} from 'next-seo'
import Head from 'next/head'
import React from 'react'

function Login(): JSX.Element {
	return (
		<div>
			<NextSeo noindex={true} />
			<Head>
				<title>Rate The Landlord</title>
			</Head>
			<LoginForm />
		</div>
	)
}

export default Login
