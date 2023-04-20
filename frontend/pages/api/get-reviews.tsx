import {NextApiRequest, NextApiResponse} from 'next'

const getReviews = (req: NextApiRequest, res: NextApiResponse) => {
	const url = process.env.API_URL as string

	fetch(`${url}/review?page=1`, {
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((result: Response) => {
			if (!result.ok) {
				throw new Error()
			}
			return result.json()
		})
		.then((data) => {
			res.status(200).json(data)
		})
		.catch((err: Response) => {
			console.log(err)
			res.status(500).json({error: 'Failed to get Reviews', response: err})
		})
}

export default getReviews
