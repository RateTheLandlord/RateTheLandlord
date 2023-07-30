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
			className="cursor-pointer rounded-md border border-teal-600 bg-white"
			data-testid="home-hero-read-btn-1"
		>
			<Link href={href} data-umami-event={umami}>
				<p className="w-full px-8 py-3 text-center text-base font-medium text-teal-600 md:px-10 md:py-4 md:text-lg">
					{children}
				</p>
			</Link>
		</div>
	)
}