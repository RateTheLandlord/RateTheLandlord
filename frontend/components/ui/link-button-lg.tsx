import Link from 'next/link'
import React from 'react'

interface IProps {
	children: string
	href: string
	umami: string
}
export default function LinkButtonLG({children, href, umami}: IProps) {
	return (
		<div className="rounded-md shadow" data-testid="home-hero-submit-btn-1">
			<Link
				href={href}
				data-umami-event={umami}
				className="flex w-full items-center justify-center rounded-md border border-transparent bg-teal-600 px-8 py-3 text-base font-medium text-white hover:bg-teal-700 md:px-10 md:py-4 md:text-lg"
			>
				{children}
			</Link>
		</div>
	)
}