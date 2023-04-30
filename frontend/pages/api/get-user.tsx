import {NextApiRequest, NextApiResponse} from 'next'

const GetUser = (req: NextApiRequest, res: NextApiResponse) => {
	const url = process.env.API_URL as string

	const cookies = req.cookies
	const jwt = cookies.ratethelandlord

	const id = localStorage.getItem('rtl') || ''

	fetch(`${url}/user/${id}`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${jwt}`,
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
				.json({error: 'Failed to get User', response: err.statusText})
		})
}

export default GetUser
