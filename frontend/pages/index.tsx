import Hero from '@/components/home/hero'
import IconSection from '@/components/home/icon-section'
import Head from 'next/head'
import React from 'react'

//This page should be statically generated at build. No need for Data fetching here

export default function Home(): JSX.Element {
	return (
		<div>
			<Head>
				<title>Rate The Landlord</title>
			</Head>
			<Hero />
			<IconSection />
		</div>
	)
}
