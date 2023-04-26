import {NextApiRequest, NextApiResponse} from 'next'

interface IBody {
	email: string
	password: string
}

const SubmitReview = (req: NextApiRequest, res: NextApiResponse) => {
	const url = process.env.API_URL as string

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const {body}: {body: IBody} = req

	fetch(`${url}/auth/login`, {
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
			return result.json()
		})
		.then((data) => {
			res.status(200).json(data)
		})
		.catch((error: Response) => {
			res
				.status(error.status)
				.json({error: 'Failed to Login', response: error.statusText})
		})
}

export default SubmitReview
