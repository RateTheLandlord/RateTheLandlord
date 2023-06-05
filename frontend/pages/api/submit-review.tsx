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
				throw result
			}
			console.log('HERE GOOD')
			console.log('res')
			res.status(200).json(result)
		})
		.catch((error: Response) => {
			console.log('HERE BAD')
			res
				.status(error.status)
				.json({error: 'Failed to Submit Review', response: error.statusText})
		})
}

export default SubmitReview
