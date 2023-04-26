import Link from 'next/link'
import React from 'react'

export default function LinkButtonLightLG({
	children,
	href,
}: {
	children: string
	href: string
}) {
	return (
		<div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3" data-testid="home-hero-read-btn-1">
			<Link href={href}>
				<a className="w-full flex items-center justify-center px-8 py-3 border border-teal-600 text-base font-medium rounded-md text-teal-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
					{children}
				</a>
			</Link>
		</div>
	)
}
