import ReviewForm from '@/components/create-review/review-form'
import Layout from '@/components/layout/layout'
import {GetStaticPropsContext} from 'next'
import {useTranslations} from 'next-intl'
import React from 'react'

//This page should be statically generated at build. No need for data fetching here.

export default function CreateReview(): JSX.Element {
	const t = useTranslations('Enter')
	return (
		<Layout>
			<div className="flex justify-center">
				<div>
					<div className="w-full">
						<h1 className="text-4xl font-extrabold border-b-teal-600 border-b-2">
							{t('Enter')}
						</h1>
					</div>
					<div className="w-full">
						<ReviewForm />
					</div>
				</div>
			</div>
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
