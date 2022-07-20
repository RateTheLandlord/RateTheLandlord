import countries from '@/util/countries.json'

export const sortOptions = [
	{id: 1, name: 'Name A-Z', value: 'az'},
	{id: 2, name: 'Name Z-A', value: 'za'},
]

export const countryOptions = Object.keys(countries)
	.filter((c) => c === 'CA' || c === 'US')
	.forEach((obj, ind) => (obj.id = ind + 1))

export const stateOptions = [{id: 1, name: 'Ontario', value: 'ON'}]

export const cityOptions = [
	{id: 1, name: 'Mississauga', value: 'MISS'},
	{id: 2, Name: 'Toronto', value: 'TOR'},
]
