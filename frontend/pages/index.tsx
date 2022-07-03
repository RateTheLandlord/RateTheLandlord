import Hero from '@/components/home/hero'
import IconSection from '@/components/home/icon-section'
import React from 'react'

//This page should be statically generated at build. No need for Data fetching here

export default function Home(): JSX.Element {
	return (
		<div>
			<Hero />
			<IconSection />
		</div>
	)
}
