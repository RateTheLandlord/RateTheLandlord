import React from 'react'

interface FiltersProps {
	onSelect: (page: number) => void
	currentPage: number
	totalPages: number
}

export default function Paginator({
	onSelect,
	currentPage,
	totalPages,
}: FiltersProps) {
	const pageNumbers = Array.from({length: totalPages}, (_, i) => i + 1)

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
			>
				Previous
			</button>
			{pageNumbers.map((number) => (
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
			))}
			<button
				onClick={() => currentPage < totalPages && onSelect(currentPage + 1)}
				className={`${
					currentPage === totalPages
						? 'cursor-not-allowed opacity-50'
						: 'hover:bg-gray-50'
				} mx-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700`}
				disabled={currentPage === totalPages}
			>
				Next
			</button>
		</nav>
	)
}
