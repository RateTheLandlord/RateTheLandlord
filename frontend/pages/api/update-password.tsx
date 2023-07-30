import {NextApiRequest, NextApiResponse} from 'next'

interface IBody {
	id: number
	password: string
}

const updatePassword = (req: NextApiRequest, res: NextApiResponse) => {
	const url = process.env.API_URL as string

	const cookies = req.cookies
	const jwt: string = cookies.ratethelandlord || ''

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const {body}: {body: IBody} = req

	const id = body.id
	const password = body.password

	fetch(`${url}/password/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${jwt}`,
		},
		body: JSON.stringify({password: password}),
	})
		.then((result: Response) => {
			if (!result.ok) {
				throw result
			}
			return result.json()
		})
		.then((data) => {
			return res.status(200).json(data)
		})
		.catch((err: Response) => {
			return res
				.status(err.status)
				.json({error: 'Failed to edit password', response: err.statusText})
		})
}

export default updatePassword