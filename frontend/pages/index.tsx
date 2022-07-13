import Hero from '@/components/home/hero'
import IconSection from '@/components/home/icon-section'
import Layout from '@/components/layout/layout'
import React from 'react'

export default function Home(): JSX.Element {
	return (
		<Layout>
			<Hero />
			<IconSection />
		</Layout>
	)
}

export const getStaticProps = ({locale}: {locale: string}) => {
	return {
		props: {
			messages: require(`../localization/${locale}.json`),
		},
	}
}
