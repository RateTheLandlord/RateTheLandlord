import {Review} from '@/util/interfaces'
import {NextApiRequest, NextApiResponse} from 'next'

const getReviews = async (req: NextApiRequest, res: NextApiResponse) => {
	const url = process.env.NEXT_PUBLIC_API_URL as string

	console.log(url)

	try {
		const request = await fetch(`http://host.docker.internal:5000/review`)

		const response = (await request.json()) as Array<Review>

		console.log(response)

		res.status(200).json(response)
	} catch (error) {
		console.log(error)
		res.status(500).json({error: 'Failed to get Reviews', response: error})
	}
}

export default getReviews
