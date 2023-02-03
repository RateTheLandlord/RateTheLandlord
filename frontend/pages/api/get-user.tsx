import {NextApiRequest, NextApiResponse} from 'next'
import {parseCookies} from 'nookies'

const GetUser = (req: NextApiRequest, res: NextApiResponse) => {
	const url = process.env.API_URL as string

	const cookies = parseCookies()
	const jwt = cookies.ratethelandlord
	const id = localStorage.getItem('rtl')

	fetch(`${url}/users/${id}`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${jwt}`,
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
			res.status(500).json({error: 'Failed to get User', response: err})
		})
}

export default GetUser
