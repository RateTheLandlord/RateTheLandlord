import {useEffect, useState} from 'react'

export const useLandlordSuggestions = (landlord: string) => {
	const [landlordSuggestions, setLandlordSuggestions] = useState<string[]>([])
	const [searching, setSearching] = useState(false)

	useEffect(() => {
		let timer: NodeJS.Timeout
		if (landlord) {
			setSearching(true)
			timer = setTimeout(() => {
				getLandlordSuggestions()
			}, 500)
		}

		return () => {
			clearTimeout(timer)
		}
	}, [landlord])

	const getLandlordSuggestions = async () => {
		const url = 'http://localhost:8080'
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
				setLandlordSuggestions([])
				return
			}

			const data: string[] = await response.json()
			console.log('Response data:', data)
			setLandlordSuggestions(data)
		} catch (err) {
			console.log(err)
			setLandlordSuggestions([])
		}
	}

	return {searching, landlordSuggestions}
}

const removeSpecialChars = (input: string) => {
	const specialCharsRegex = /[\/@#$%^*<>?\[\]{}|]/g
	return input.replace(specialCharsRegex, '')
}
