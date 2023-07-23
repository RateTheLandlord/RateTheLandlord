import Link from 'next/link'
import React from 'react'

interface IProps {
	children: string
	href: string
	umami: string
}
export default function LinkButtonLightLG({children, href, umami}: IProps) {
	return (
		<div
			className="mt-3 rounded-md shadow sm:ml-3 sm:mt-0"
			data-testid="home-hero-read-btn-1"
		>
			<Link
				href={href}
				data-umami-event={umami}
				className="flex w-full items-center justify-center rounded-md border border-teal-600 bg-white px-8 py-3 text-base font-medium text-teal-600 hover:bg-gray-50 md:px-10 md:py-4 md:text-lg"
			>
				{children}
			</Link>
		</div>
	)
}