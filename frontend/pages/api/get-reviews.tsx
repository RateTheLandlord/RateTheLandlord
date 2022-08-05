import {Review} from '@/util/interfaces'
import {NextApiRequest, NextApiResponse} from 'next'

const getReviews = async (req: NextApiRequest, res: NextApiResponse) => {
	const url = 'http://138.197.146.214:5000/review'

	try {
		const request = await fetch(url)

		const response = (await request.json()) as Review[]

		res.status(200).json(response)
	} catch (error) {
		console.log(error)
		res.status(500).json({error: 'Failed to get Reviews', response: error})
	}
}

export default getReviews
