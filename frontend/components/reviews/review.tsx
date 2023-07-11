import ReviewFilters from '@/components/reviews/review-filters'
import {sortOptions} from '@/util/helpers/filter-options'
import {Options, Review} from '@/util/interfaces/interfaces'
import {
	updateActiveFilters,
	getStateOptions,
	getCityOptions,
	getZipOptions,
} from '@/components/reviews/functions'
import React, {useEffect, useMemo, useState} from 'react'
import ReportModal from '@/components/reviews/report-modal'
import useSWR from 'swr'
import Alert from '../alerts/Alert'
import {fetcher} from '@/util/helpers/fetcher'
import EditReviewModal from '../modal/EditReviewModal'
import RemoveReviewModal from '../modal/RemoveReviewModal'
import InfiniteScroll from './InfiniteScroll'

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
	const [hasMore, setHasMore] = useState(true) // Track if there is more content to load

	const [reportOpen, setReportOpen] = useState<boolean>(false)
	const [removeReviewOpen, setRemoveReviewOpen] = useState(false)

	const [selectedReview, setSelectedReview] = useState<Review | undefined>()

	const [previousQueryParams, setPreviousQueryParams] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const queryParams = useMemo(() => {
		const params = new URLSearchParams({
			sort: selectedSort.value,
			state: stateFilter?.value || '',
			country: countryFilter?.value || '',
			city: cityFilter?.value || '',
			zip: zipFilter?.value || '',
			search: searchState || '',
			limit: '25',
		})
		return params.toString()
	}, [
		selectedSort,
		stateFilter,
		countryFilter,
		cityFilter,
		zipFilter,
		searchState,
	])

	const {data} = useSWR<ReviewsResponse>(
		`/api/get-reviews?page=${page}&${queryParams.toString()}`,
		fetcher,
	)

	const [reviews, setReviews] = useState<Review[]>(data?.reviews || [])

	useEffect(() => {
		if (queryParams !== previousQueryParams) {
			setReviews(data?.reviews || [])
			setIsLoading(false)
		} else if (data) {
			setReviews((prevReviews) => [...prevReviews, ...data.reviews])
			setIsLoading(false)
		}
		setPreviousQueryParams(queryParams)
	}, [data, queryParams, previousQueryParams])

	useEffect(() => {
		if (data) {
			if (reviews.length >= data?.total || data.reviews.length <= 0)
				setHasMore(false)
		}
	}, [reviews, data])

	useEffect(() => {
		setActiveFilters(
			updateActiveFilters(countryFilter, stateFilter, cityFilter, zipFilter),
		)
		setPage(1)
	}, [
		cityFilter,
		stateFilter,
		countryFilter,
		zipFilter,
		searchState,
		selectedSort,
	])

	const cityOptions = useMemo(
		() => getCityOptions(data?.cities ?? []),
		[data?.cities],
	)
	const stateOptions = useMemo(
		() => getStateOptions(data?.states ?? []),
		[data?.states],
	)
	const zipOptions = useMemo(
		() => getZipOptions(data?.zips ?? []),
		[data?.zips],
	)

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
						setSelectedReview={setSelectedReview}
					/>
					<RemoveReviewModal
						selectedReview={selectedReview}
						mutateString={`/api/get-reviews?${queryParams.toString()}`}
						setRemoveReviewOpen={setRemoveReviewOpen}
						setSuccess={setSuccess}
						setRemoveAlertOpen={setRemoveAlertOpen}
						removeReviewOpen={removeReviewOpen}
						setSelectedReview={setSelectedReview}
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
				<InfiniteScroll
					data={reviews}
					setReportOpen={setReportOpen}
					setSelectedReview={setSelectedReview}
					setRemoveReviewOpen={setRemoveReviewOpen}
					setEditReviewOpen={setEditReviewOpen}
					setPage={setPage}
					hasMore={hasMore}
					isLoading={isLoading}
					setIsLoading={setIsLoading}
				/>
			</div>
		</>
	)
}

export default Review
