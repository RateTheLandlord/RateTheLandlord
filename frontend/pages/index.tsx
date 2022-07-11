import Hero from '@/components/home/hero'
import IconSection from '@/components/home/icon-section'
import Layout from '@/components/layout/layout'
import {GetStaticPropsContext} from 'next'
import React from 'react'

//This page should be statically generated at build. No need for Data fetching here

export default function Home(): JSX.Element {
	return (
		<Layout>
			<Hero />
			<IconSection />
		</Layout>
	)
}

export async function getStaticProps({locale}: GetStaticPropsContext) {
	return {
		props: {
			messages: (await import(`../localization/${locale}.json`)).default,
		},
	}
}
