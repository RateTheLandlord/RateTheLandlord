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
			console.log('Result: ', result)
			if (!result.ok) {
				throw new Error()
			}
			return result.json()
		})
		.then((data) => {
			console.log(data)
			res.status(200).json(data)
		})
		.catch((error: Response) => {
			console.log('error: ', error)
			res.status(500).json({error: 'Failed to Login', response: error})
		})
}

export default SubmitReview
