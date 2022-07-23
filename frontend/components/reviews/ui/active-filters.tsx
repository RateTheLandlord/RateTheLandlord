import {Options} from '@/util/interfaces'
import React from 'react'

interface Props {
	activeFilter: Options
	removeFilter: (index: number) => void
	index: number
}

export default function ActiveFilters({activeFilter, removeFilter, index}) {
	return (
		<span
			key={activeFilter.name}
			className="m-1 inline-flex rounded-full border border-gray-200 items-center py-1.5 pl-3 pr-2 text-sm font-medium bg-white text-gray-900"
		>
			<span>{activeFilter.name}</span>
			<button
				onClick={() => removeFilter(index)}
				type="button"
				className="flex-shrink-0 ml-1 h-4 w-4 p-1 rounded-full inline-flex text-gray-400 hover:bg-gray-200 hover:text-gray-500"
			>
				<span className="sr-only">Remove filter for {activeFilter.name}</span>
				<svg
					className="h-2 w-2"
					stroke="currentColor"
					fill="none"
					viewBox="0 0 8 8"
				>
					<path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
				</svg>
			</button>
		</span>
	)
}
