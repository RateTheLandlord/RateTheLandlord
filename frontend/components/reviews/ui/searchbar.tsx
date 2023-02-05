import React from 'react'
import {useTranslation} from 'react-i18next'

interface SearchProps {
	setSearchState: (str: string) => void
}

export default function SearchBar({setSearchState}: SearchProps) {
	const {t} = useTranslation()
	return (
		<div className="mt-1 w-full px-2">
			<label htmlFor="search" className="sr-only">
				Search
			</label>
			<input
				type="text"
				name="search"
				id="search"
				onChange={(e) => setSearchState(e.target.value)}
				className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
				placeholder={t('reviews.search')}
			/>
		</div>
	)
}
