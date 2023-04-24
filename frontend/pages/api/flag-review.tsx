import {Review} from '@/util/interfaces'
import {NextApiRequest, NextApiResponse} from 'next'

interface IBody {
	newReview: Review
}

const FlagReview = (req: NextApiRequest, res: NextApiResponse) => {
	const url = process.env.API_URL as string

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const {body}: {body: IBody} = req

	fetch(`${url}/review/${body.newReview.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body.newReview),
	})
		.then((result: Response) => {
			if (!result.ok) {
				throw result
			}
			res.status(200).json(result)
		})
		.catch((error: Response) => {
			console.log('error: ', error)
			res
				.status(error.status)
				.json({error: 'Failed to Submit Review', response: error.statusText})
		})
}

export default FlagReview
