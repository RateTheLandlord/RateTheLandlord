import {NextApiRequest, NextApiResponse} from 'next'

interface IBody {
	captchaToken: string
	review: {
		landlord: string
		country_code: string
		city: string
		state: string
		review: string
		zip: string
		repair: number
		health: number
		stability: number
		privacy: number
		respect: number
		flagged: boolean
		flagged_reason: string
		admin_approved: boolean
		admin_edited: boolean
	}
}

interface IErrorDetails {
	statusCode?: number
	message?: string[]
	error?: string
}

const SubmitReview = (req: NextApiRequest, res: NextApiResponse) => {
	const url = process.env.API_URL as string

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const {body}: {body: IBody} = req

	fetch(`${url}/review`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	})
		.then((result: Response) => {
			if (!result.ok) {
				return result.json().then((errorDetails) => {
					throw errorDetails
				})
			}
			return result.json()
		})
		.then((resultJSON) => {
			res.status(200).json(resultJSON)
		})
		.catch((error: IErrorDetails) => {
			let errorMessage = 'Failed to Submit Review'
			if (
				error.message &&
				error.message[0] === 'review.landlord name must not be empty'
			) {
				errorMessage = 'Landlord name must not be empty'
			}

			res
				.status(error.statusCode || 500)
				.json({error: errorMessage, response: error.error})
		})
}

export default SubmitReview
