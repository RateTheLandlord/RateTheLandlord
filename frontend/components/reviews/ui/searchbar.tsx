import React from 'react'
import {useTranslation} from 'react-i18next'

interface SearchProps {
	setSearchState: (str: string) => void
	onClick?: (bool: boolean) => void
	mobile?: boolean
}

export default function SearchBar({
	setSearchState,
	onClick,
	mobile,
}: SearchProps) {
	const {t} = useTranslation('reviews')
	return (
		<div className="mt-1 flex w-full flex-col gap-2 px-2">
			<label htmlFor="search" className="sr-only">
				Search
			</label>
			<input
				type="text"
				name="search"
				id="search"
				onChange={(e) => setSearchState(e.target.value)}
				className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				placeholder={t('reviews.search')}
			/>
			{mobile && onClick ? (
				<button
					onClick={() => onClick(false)}
					className="w-full rounded-lg bg-teal-600 py-2 text-white"
				>
					Search
				</button>
			) : null}
		</div>
	)
}
