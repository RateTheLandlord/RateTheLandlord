import {NextApiRequest, NextApiResponse} from 'next'

const getLandlords = (req: NextApiRequest, res: NextApiResponse) => {
	const url = process.env.API_URL as string

	fetch(`${url}/review/landlords`, {
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
				.json({error: 'Failed to get Landlords', response: err.statusText})
		})
}

export default getLandlords
