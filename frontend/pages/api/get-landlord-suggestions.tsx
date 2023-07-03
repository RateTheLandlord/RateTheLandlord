/* eslint-disable no-useless-escape */
const url = 'http://localhost:8080'

export const removeSpecialChars = (input: string) => {
	const specialCharsRegex = /[\/@#$%^*<>?\[\]{}|]/g
	return input.replace(specialCharsRegex, '')
}

export const getLandlordSuggestions = async (landlord: string) => {
	const sanitizedLandlord = removeSpecialChars(landlord)

	try {
		const response = await fetch(
			`${url}/review/landlord/suggestions?landlord=${encodeURIComponent(
				sanitizedLandlord,
			)}`,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		)

		if (!response.ok) {
            console.error('Failed to get landlord suggestions')
            return []
		}

		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const data: string[] = await response.json()
		console.log('Response data:', data)
		return data
	} catch (err) {
		console.error(err)
        return []
	}
}
