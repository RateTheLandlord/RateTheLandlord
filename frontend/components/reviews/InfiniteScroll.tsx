import React, {useState, useEffect, Dispatch, SetStateAction} from 'react'
import ReviewTable from './review-table'
import {Review} from '@/util/interfaces/interfaces'

interface IProps {
	data: Review[]
	setReportOpen: Dispatch<SetStateAction<boolean>>
	setSelectedReview: Dispatch<SetStateAction<Review | undefined>>
	setRemoveReviewOpen: Dispatch<SetStateAction<boolean>>
	setEditReviewOpen: Dispatch<SetStateAction<boolean>>
	setPage: Dispatch<SetStateAction<number>>
	hasMore: boolean
}

function InfiniteScroll({
	data,
	setReportOpen,
	setSelectedReview,
	setRemoveReviewOpen,
	setEditReviewOpen,
	setPage,
	hasMore,
}: IProps) {
	const [content, setContent] = useState<Review[]>([]) // Store loaded content
	const [isLoading, setIsLoading] = useState(false) // Track loading state

	// Add a scroll event listener
	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	// Fetch more content when reaching the bottom
	const handleScroll = () => {
		if (
			window.innerHeight + window.scrollY >= document.body.offsetHeight &&
			!isLoading &&
			hasMore
		) {
			setIsLoading(true)
			// Fetch more content here
			// Update state with the loaded content and adjust page, hasMore, isLoading accordingly
			setPage((page) => page + 1)
		}
	}

	// Fetch initial content when the component mounts
	useEffect(() => {
		// Fetch initial content here
		// Update state with the loaded content and adjust hasMore, isLoading accordingly
		setContent(data)
	}, [data])

	return (
		<div>
			<ReviewTable
				data={content}
				setReportOpen={setReportOpen}
				setSelectedReview={setSelectedReview}
				setRemoveReviewOpen={setRemoveReviewOpen}
				setEditReviewOpen={setEditReviewOpen}
			/>
			{isLoading && (
				<div className="flex w-full items-center justify-center">
					<div className="h-16 w-16 animate-spin rounded-full border-t-4 border-b-4 border-teal-400"></div>
				</div>
			)}
		</div>
	)
}

export default InfiniteScroll
