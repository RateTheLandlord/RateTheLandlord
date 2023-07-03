import {useEffect, useState} from 'react'
import {getLandlordSuggestions} from '../../pages/api/get-landlord-suggestions'

export const useLandlordSuggestions = (landlord: string) => {
	const [landlordSuggestions, setLandlordSuggestions] = useState<string[]>([])
	const [isSearching, setIsSearching] = useState(false)

	useEffect(() => {
		let timer: NodeJS.Timeout
		if (landlord) {
			setIsSearching(true)
			timer = setTimeout(() => {
				const fetchData = async () => {
					try {
						const suggestions: string[] = await getLandlordSuggestions(landlord)
						setLandlordSuggestions(suggestions)
						setIsSearching(false)
					} catch (err) {
						console.error(err)
						setLandlordSuggestions([])
					}
				}
				void fetchData();
			}, 500)
		}

		return () => {
			clearTimeout(timer)
		}
	}, [landlord])

	return {isSearching, landlordSuggestions}
}