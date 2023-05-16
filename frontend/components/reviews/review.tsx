import ReviewFilters from '@/components/reviews/review-filters'
import ReviewTable from '@/components/reviews/review-table'
import {sortOptions} from '@/util/helpers/filter-options'
import {Options, Review} from '@/util/interfaces/interfaces'
import {
	updateActiveFilters,
	getStateOptions,
	getCityOptions,
	getZipOptions,
} from '@/components/reviews/functions'
import React, {useEffect, useState} from 'react'
import ReportModal from '@/components/reviews/report-modal'
import useSWR from 'swr'
import Paginator from './paginator'
import Alert from '../alerts/Alert'
import {fetcher} from '@/util/helpers/fetcher'
import EditReviewModal from '../modal/EditReviewModal'
import RemoveReviewModal from '../modal/RemoveReviewModal'

export type ReviewsResponse = {
	reviews: Review[]
	total: number
	countries: string[]
	states: string[]
	cities: string[]
	zips: string[]
	limit: number
}

const Review = () => {
	const [selectedSort, setSelectedSort] = useState<Options>(sortOptions[2])

	const [searchState, setSearchState] = useState<string>('')
	const [page, setPage] = useState<number>(1)

	const [countryFilter, setCountryFilter] = useState<Options | null>(null)
	const [stateFilter, setStateFilter] = useState<Options | null>(null)
	const [cityFilter, setCityFilter] = useState<Options | null>(null)
	const [zipFilter, setZipFilter] = useState<Options | null>(null)
	const [activeFilters, setActiveFilters] = useState<Options[] | null>(null)
	const [success, setSuccess] = useState(false)
	const [removeAlertOpen, setRemoveAlertOpen] = useState(false)
	const [editReviewOpen, setEditReviewOpen] = useState(false)

	const queryParams = new URLSearchParams({
		page: page.toString(),
		sort: selectedSort.value,
		state: stateFilter?.value || '',
		country: countryFilter?.value || '',
		city: cityFilter?.value || '',
		zip: zipFilter?.value || '',
		search: searchState || '',
		limit: '25',
	})

	const {data} = useSWR<ReviewsResponse>(
		`/api/get-reviews?${queryParams.toString()}`,
		fetcher,
	)

	const [reviews, setReviews] = useState<Review[]>(data?.reviews || [])
	const [reportOpen, setReportOpen] = useState<boolean>(false)
	const [removeReviewOpen, setRemoveReviewOpen] = useState(false)

	const [selectedReview, setSelectedReview] = useState<Review | undefined>()

	useEffect(() => {
		if (data) {
			setReviews(data.reviews)
		}
	}, [data])

	useEffect(() => {
		setActiveFilters(
			updateActiveFilters(countryFilter, stateFilter, cityFilter, zipFilter),
		)
	}, [
		cityFilter,
		stateFilter,
		countryFilter,
		zipFilter,
		searchState,
		selectedSort,
	])

	const cityOptions = getCityOptions(data?.cities ?? [])
	const stateOptions = getStateOptions(data?.states ?? [])
	const zipOptions = getZipOptions(data?.zips ?? [])

	const removeFilter = (index: number) => {
		if (activeFilters?.length) {
			if (cityFilter === activeFilters[index]) setCityFilter(null)
			if (stateFilter === activeFilters[index]) setStateFilter(null)
			if (countryFilter === activeFilters[index]) setCountryFilter(null)
			if (zipFilter === activeFilters[index]) setZipFilter(null)
		}
	}

	return (
		<>
			<ReportModal
				isOpen={reportOpen}
				setIsOpen={setReportOpen}
				selectedReview={selectedReview}
			/>
			{selectedReview ? (
				<>
					<EditReviewModal
						selectedReview={selectedReview}
						mutateString={`/api/get-reviews?${queryParams.toString()}`}
						setEditReviewOpen={setEditReviewOpen}
						setSuccess={setSuccess}
						setRemoveAlertOpen={setRemoveAlertOpen}
						editReviewOpen={editReviewOpen}
					/>
					<RemoveReviewModal
						selectedReview={selectedReview}
						mutateString={`/api/get-reviews?${queryParams.toString()}`}
						setRemoveReviewOpen={setRemoveReviewOpen}
						setSuccess={setSuccess}
						setRemoveAlertOpen={setRemoveAlertOpen}
						removeReviewOpen={removeReviewOpen}
					/>
				</>
			) : null}
			<div className="w-full">
				{removeAlertOpen ? (
					<div className="w-full">
						<Alert success={success} setAlertOpen={setRemoveAlertOpen} />
					</div>
				) : null}
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
					zipFilter={zipFilter}
					setZipFilter={setZipFilter}
					cityOptions={cityOptions}
					stateOptions={stateOptions}
					zipOptions={zipOptions}
					removeFilter={removeFilter}
					setSearchState={setSearchState}
				/>
				<ReviewTable
					data={reviews}
					setReportOpen={setReportOpen}
					setSelectedReview={setSelectedReview}
					setRemoveReviewOpen={setRemoveReviewOpen}
					setEditReviewOpen={setEditReviewOpen}
				/>
				<Paginator
					onSelect={(page: number) => setPage(page)}
					currentPage={page}
					totalPages={data?.total ?? 0}
					limit={data?.limit ?? 25}
				/>
			</div>
		</>
	)
}

export default Review
