import {Dispatch, SetStateAction} from 'react'

interface IProps {
	review: string | undefined
	setReview: Dispatch<SetStateAction<string>>
}

const EditReviewModal = ({review, setReview}: IProps) => {
	return (
		<div>
			<div className="mt-1">
				<textarea
					rows={4}
					name="review"
					id="review"
					className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					onChange={(e) => setReview(e.target.value)}
					defaultValue={review}
				/>
			</div>
		</div>
	)
}

export default EditReviewModal
