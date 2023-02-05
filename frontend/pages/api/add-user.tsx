import {NextApiRequest, NextApiResponse} from 'next'

interface IBody {
	name: string
	email: string
	password: string
	role: string
	blocked: boolean
}

const AddUser = (req: NextApiRequest, res: NextApiResponse) => {
	const url = process.env.API_URL as string

	const cookies = req.cookies
	const jwt = cookies.ratethelandlord

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const {body}: {body: IBody} = req

	console.log(body)

	fetch(`${url}/users`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${jwt}`,
		},
		body: JSON.stringify(body),
	})
		.then((result: Response) => {
			if (!result.ok) {
				throw new Error()
			}
			res.status(200).json(result)
		})
		.catch((error: Response) => {
			console.log('error: ', error)
			res.status(500).json({error: 'Failed to Add User', response: error})
		})
}

export default AddUser
