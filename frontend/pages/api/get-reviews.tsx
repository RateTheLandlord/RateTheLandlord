import {NextApiRequest, NextApiResponse} from 'next'

const getReviews = (req: NextApiRequest, res: NextApiResponse) => {
	const url = process.env.API_URL as string
	const queryParams = Object.entries(req.query)
		.map(
			([key, value]) =>
				`${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`,
		)
		.join('&')

	fetch(`${url}/review?${queryParams}`, {
		headers: {
			'Content-Type': 'application/json',
		},
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
		.catch((err: Response) => {
			console.log(err)
			res
				.status(err.status)
				.json({error: 'Failed to get Reviews', response: err.statusText})
		})
}

export default getReviews
