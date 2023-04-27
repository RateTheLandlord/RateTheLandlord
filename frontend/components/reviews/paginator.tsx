/* eslint-disable no-mixed-spaces-and-tabs */
import useWindowSize from '@/util/hooks/useWindowDimensions'
import React from 'react'

interface FiltersProps {
	onSelect: (page: number) => void
	currentPage: number
	totalPages: number
	limit: number
}

export default function Paginator({
	onSelect,
	currentPage,
	totalPages,
	limit,
}: FiltersProps) {
	const pageNumbers = Array.from(
		{length: Math.ceil(totalPages / limit)},
		(_, i) => i + 1,
	)

	const {width} = useWindowSize()

	return (
		<nav
			className="mt-8 flex items-center justify-center"
			aria-label="Pagination"
		>
			<button
				onClick={() => currentPage > 1 && onSelect(currentPage - 1)}
				className={`${
					currentPage === 1
						? 'cursor-not-allowed opacity-50'
						: 'hover:bg-gray-50'
				} mx-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700`}
				disabled={currentPage === 1}
				data-umami-event="Previous Page Clicked"
			>
				Previous
			</button>
			{pageNumbers.length > 10 ?
				width && width > 1024 
				? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
						<button
							key={number}
							onClick={() => onSelect(number)}
							aria-current={number === currentPage ? 'page' : undefined}
							className={`${
								number === currentPage
									? 'border-teal-600 bg-teal-600 text-white hover:bg-teal-700'
									: 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
							} mx-1 cursor-pointer rounded-md px-4 py-2 text-sm font-medium`}
						>
							{number}
						</button>
				  ))
				: null : pageNumbers.map((number) => (
						<button
							key={number}
							onClick={() => onSelect(number)}
							aria-current={number === currentPage ? 'page' : undefined}
							className={`${
								number === currentPage
									? 'border-teal-600 bg-teal-600 text-white hover:bg-teal-700'
									: 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
							} mx-1 cursor-pointer rounded-md px-4 py-2 text-sm font-medium`}
						>
							{number}
						</button>
				  )) }
			{pageNumbers.length > 10 ? (
				<div className="mx-1 rounded-md border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
					...
				</div>
			) : null}

			<button
				onClick={() => currentPage < totalPages && onSelect(currentPage + 1)}
				className={`${
					currentPage === totalPages
						? 'cursor-not-allowed opacity-50'
						: 'hover:bg-gray-50'
				} mx-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700`}
				disabled={currentPage === totalPages}
				data-umami-event="Next Page Clicked"
			>
				Next
			</button>
		</nav>
	)
}
