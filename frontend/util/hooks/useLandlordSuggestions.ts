import { useEffect, useState } from "react";

export const useLandlordSuggestions = (landlord: string) => {
	const [landlordSuggestions, setLandlordSuggestions] = useState<string[]>([])
	const [isSearching, setIsSearching] = useState(false)

	useEffect(() => {
		let timer: NodeJS.Timeout
		if (landlord) {
			setIsSearching(true)
			timer = setTimeout(() => {
				const fetchData = async () => {
					fetch('/api/get-landlord-suggestions', {
						method: 'POST',
						headers: {
							'Content-Type':'application/json'

						},
						body: JSON.stringify({input: landlord})
					}).then(res => {
						if(!res.ok){
							throw new Error()
						}
						return res.json()
					}).then(data => {
						setLandlordSuggestions(data)
					}).catch(err =>
					console.log(err)).finally(() => setIsSearching(false))

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