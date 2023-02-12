import AboutUs from '@/components/about/aboutUs'
import Contact from '@/components/about/contact'
import Faq from '@/components/about/faq'
import Moderation from '@/components/about/moderation'
import Privacy from '@/components/about/privacy'
import Head from 'next/head'
import React from 'react'

function About(): JSX.Element {
	return (
		<div className="w-full flex justify-center">
			<Head>
				<title>About | Rate The Landlord</title>
			</Head>
			<div className="flex flex-col container items-center gap-4 mt-5 px-2">
				<AboutUs />
				<Privacy />
				<Moderation />
				<Faq />
				<Contact />
			</div>
		</div>
	)
}

export default About
