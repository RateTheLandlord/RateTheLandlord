import React from 'react'

export default function SearchBar() {
	return (
		<div className="mt-1 w-full">
			<label htmlFor="search" className="sr-only">
				Search
			</label>
			<input
				type="text"
				name="search"
				id="search"
				className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
				placeholder="Search Landlords"
			/>
		</div>
	)
}
