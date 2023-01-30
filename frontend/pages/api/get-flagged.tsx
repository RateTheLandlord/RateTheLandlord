import {Review} from '@/util/interfaces'
import {NextApiRequest, NextApiResponse} from 'next'
import {parseCookies} from 'nookies'

const getReviews = async (req: NextApiRequest, res: NextApiResponse) => {
	const url = process.env.API_URL as string

	const cookies = parseCookies()
	const jwt = cookies.ratethelandlord

	try {
		const request = await fetch(`${url}/review/flagged`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${jwt}`,
			},
		})

		const response = (await request.json()) as Array<Review>

		console.log(response)

		res.status(200).json(response)
	} catch (error) {
		console.log(error)
		res.status(500).json({error: 'Failed to get Reviews', response: error})
	}
}

export default getReviews
