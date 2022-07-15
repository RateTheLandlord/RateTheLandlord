import Cors from 'cors'
import {NextApiRequest, NextApiResponse} from 'next'

const cors = Cors({
	methods: ['GET', 'HEAD'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
	return new Promise((resolve, reject) => {
		fn(req, res, (result) => {
			if (result instanceof Error) {
				return reject(result)
			}

			return resolve(result)
		})
	})
}

const getScores = async (req: NextApiRequest, res: NextApiResponse) => {
	await runMiddleware(req, res, cors)
	const url = 'http://138.197.146.214:5000/review'

	try {
		const request = await fetch(url)

		const response = await request.json()

		res.status(200).json(response)
	} catch (error) {
		console.log(error)
		res.status(500).json({error: 'Failed to get Reviews', response: error})
	}
}

export default getScores
