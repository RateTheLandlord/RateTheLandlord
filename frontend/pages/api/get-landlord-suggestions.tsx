/* eslint-disable no-useless-escape */
import { NextApiRequest, NextApiResponse } from "next";

export const removeSpecialChars = (input: string) => {
	const specialCharsRegex = /[\/@#$%^*<>?\[\]{}|]/g
	return input.replace(specialCharsRegex, '')
}

const getLandlordSuggestions = (req: NextApiRequest, res: NextApiResponse) => {
	const url = process.env.API_URL as string
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const {body}: {body: {input: string}} = req
	const sanitizedLandlord = removeSpecialChars(body.input)

	fetch(`${url}/review/landlord/suggestions?landlord=${encodeURIComponent(
			sanitizedLandlord,
		)}`,
		{
			headers: {
				'Content-Type': 'application/json',
			},
		},
	).then((result: Response) => {
		if (!result.ok) {
			throw result
		}
		return result.json()
	}).then(data => {
		res.status(200).json(data)
	}).catch((error: Response) => {
		console.log('error: ', error)
		res
			.status(error.status)
			.json({error: 'Failed to Report Review', response: error.statusText})
	})
}

export default getLandlordSuggestions