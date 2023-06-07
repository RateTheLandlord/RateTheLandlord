import Link from 'next/link'
import React from 'react'

interface IProps {
	children: string
	href: string
}
export default function LinkButtonLightLG({children, href}: IProps) {
	return (
		<div
			className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3"
			data-testid="home-hero-read-btn-1"
		>
			<Link href={href}>
				<a className="flex w-full items-center justify-center rounded-md border border-teal-600 bg-white px-8 py-3 text-base font-medium text-teal-600 hover:bg-gray-50 md:py-4 md:px-10 md:text-lg">
					{children}
				</a>
			</Link>
		</div>
	)
}