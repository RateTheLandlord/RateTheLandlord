import Link from 'next/link'
import React from 'react'

interface IProps {
	children: string
	href: string
	umami: string
}
export default function LinkButtonLG({children, href, umami}: IProps) {
	return (
		<div
			className="cursor-pointer rounded-md border border-teal-600 bg-teal-600 hover:bg-teal-500"
			data-testid="home-hero-submit-btn-1"
		>
			<Link href={href} data-umami-event={umami}>
				<p className="px-8 py-3 text-base font-medium text-white md:px-10 md:py-4 md:text-lg">
					{children}
				</p>
			</Link>
		</div>
	)
}