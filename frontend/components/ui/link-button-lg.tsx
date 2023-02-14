import Link from 'next/link'
import React from 'react'

export default function LinkButtonLG({
	children,
	href,
}: {
	children: string
	href: string
}) {
	return (
		<div className="rounded-md shadow" data-testid="home-hero-submit-btn-1">
			<Link href={href}>
				<a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 md:py-4 md:text-lg md:px-10">
					{children}
				</a>
			</Link>
		</div>
	)
}
