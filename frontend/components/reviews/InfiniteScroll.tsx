import React, {useState, useEffect, Dispatch, SetStateAction} from 'react'
import ReviewTable from './review-table'
import {Review} from '@/util/interfaces/interfaces'

interface IProps {
	data: Review[]
	setReportOpen: Dispatch<SetStateAction<boolean>>
	setSelectedReview: Dispatch<SetStateAction<Review | undefined>>
	setRemoveReviewOpen: Dispatch<SetStateAction<boolean>>
	setEditReviewOpen: Dispatch<SetStateAction<boolean>>
	page: number
	setPage: Dispatch<SetStateAction<number>>
}

function InfiniteScroll({
	data,
	setReportOpen,
	setSelectedReview,
	setRemoveReviewOpen,
	setEditReviewOpen,
	page,
	setPage,
}: IProps) {
	const [content, setContent] = useState<Review[]>([]) // Store loaded content
	const [isLoading, setIsLoading] = useState(false) // Track loading state
	const [hasMore, setHasMore] = useState(true) // Track if there is more content to load

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
			{isLoading && <div>Loading...</div>}
		</div>
	)
}

export default InfiniteScroll
