import {Options} from '@/util/interfaces/interfaces'
import React from 'react'

interface Props {
	activeFilter: Options
	removeFilter: (index: number) => void
	index: number
}

export default function ActiveFilters({
	activeFilter,
	removeFilter,
	index,
}: Props): JSX.Element {
	return (
		<span
			key={activeFilter.name}
			className="m-1 inline-flex items-center rounded-full border border-gray-200 bg-white py-1.5 pl-3 pr-2 text-sm font-medium text-gray-900"
		>
			<span>{activeFilter.name}</span>
			<button
				onClick={() => removeFilter(index)}
				type="button"
				className="ml-1 inline-flex h-4 w-4 flex-shrink-0 rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-500"
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
