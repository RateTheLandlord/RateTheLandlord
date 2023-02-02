import ReviewFilters from '@/components/reviews/review-filters'
import ReviewTable from '@/components/reviews/review-table'
import {sortOptions} from '@/util/filter-options'
import {AllReviews, Options, Review} from '@/util/interfaces'
import {
	sortAZ,
	sortZA,
	updateActiveFilters,
	updateReviews,
	getStateOptions,
	getCityOptions,
} from '@/components/reviews/functions'
import countries from '@/util/countries.json'
import React, {useEffect, useState} from 'react'
import useSWR, {SWRConfig} from 'swr'
import ReportModal from '@/components/reviews/report-modal'

//fallback is the data from getStaticProps. It is used as the initial data for building the page. This data is then checked against the data received from useSWR and will be updated accordingly

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const country_codes: string[] = Object.keys(countries).filter(
	(c) => c === 'CA' || c === 'US',
)

export default function Reviews({
	fallback,
}: {
	fallback: AllReviews
}): JSX.Element {
	const {data} = useSWR<Array<Review>>(`/api/get-reviews`, fetcher)

	console.log(data)

	const initialData = fallback['/api/get-reviews']
	const [allReviews, setAllReviews] = useState<Review[]>(initialData)
	const [reviews, setReviews] = useState<Review[]>(initialData)

	const [selectedSort, setSelectedSort] = useState<Options>(sortOptions[0])
	const [countryFilter, setCountryFilter] = useState<Options | null>(null)
	const [stateFilter, setStateFilter] = useState<Options | null>(null)
	const [cityFilter, setCityFilter] = useState<Options | null>(null)
	const [activeFilters, setActiveFilters] = useState<Options[] | null>(null)
	const [searchState, setSearchState] = useState<string>('')

	const [reportOpen, setReportOpen] = useState<boolean>(false)

	const [selectedReview, setSelectedReview] = useState<Review | undefined>()

	const countryOptions: Options[] = country_codes.map(
		(item: string, ind: number): Options => {
			return {id: ind + 1, name: countries[item] as string, value: item}
		},
	)

	const cityOptions = getCityOptions(reviews)

	const stateOptions = getStateOptions(reviews)

	const removeFilter = (index: number) => {
		if (activeFilters?.length) {
			if (cityFilter === activeFilters[index]) setCityFilter(null)
			if (stateFilter === activeFilters[index]) setStateFilter(null)
			if (countryFilter === activeFilters[index]) setCountryFilter(null)
		}
	}

	useEffect(() => {
		updateActiveFilters(
			countryFilter,
			stateFilter,
			cityFilter,
			setActiveFilters,
		)
		updateReviews(
			stateFilter,
			countryFilter,
			cityFilter,
			setReviews,
			allReviews,
			searchState,
		)
	}, [cityFilter, stateFilter, countryFilter, allReviews, searchState])

	useEffect(() => {
		if (selectedSort.name === 'Name A-Z') {
			setReviews((reviews) => sortAZ(reviews))
		} else if (selectedSort.name === 'Name Z-A') {
			setReviews((reviews) => sortZA(reviews))
		}
	}, [selectedSort])

	useEffect(() => {
		if (data) {
			setReviews(data)
			setAllReviews(data)
		}
	}, [data])

	return (
		<SWRConfig value={{fallback}}>
			<ReportModal
				isOpen={reportOpen}
				setIsOpen={setReportOpen}
				selectedReview={selectedReview}
			/>
			<div className="w-full">
				<ReviewFilters
					selectedSort={selectedSort}
					setSelectedSort={setSelectedSort}
					sortOptions={sortOptions}
					activeFilters={activeFilters}
					countryFilter={countryFilter}
					setCountryFilter={setCountryFilter}
					stateFilter={stateFilter}
					setStateFilter={setStateFilter}
					cityFilter={cityFilter}
					setCityFilter={setCityFilter}
					cityOptions={cityOptions}
					stateOptions={stateOptions}
					countryOptions={countryOptions}
					removeFilter={removeFilter}
					setSearchState={setSearchState}
				/>
				<ReviewTable
					data={reviews || initialData}
					setReportOpen={setReportOpen}
					setSelectedReview={setSelectedReview}
				/>
			</div>
		</SWRConfig>
	)
}

//Page is statically generated at build time and then revalidated at a minimum of every 30 minutes based on when the page is accessed
export function getStaticProps() {
	const URL = process.env.API_URL as string
	fetch(`${URL}/review`)
		.then((res) => {
			if (!res.ok) {
				throw new Error()
			}
			return res.json()
		})
		.then((data: Array<Review>) => {
			return {
				props: {
					fallback: {
						'/api/get-reviews': data,
					},
				},
				revalidate: 1800,
			}
		})
		.catch((err) => {
			console.log(err)
			return {
				props: {
					fallback: {
						'/api/get-reviews': [],
					},
				},
				revalidate: 1800,
			}
		})
}
