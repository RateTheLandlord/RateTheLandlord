import countries from '@/util/countries/countries.json'
import {Options} from '../interfaces/interfaces'

export const country_codes: string[] = Object.keys(countries).filter(
	(c) => c === 'CA' || c === 'US' || c === 'GB' || c === 'AU' || c === 'NZ',
)

export const countryOptions: Options[] = country_codes.map(
	(item: string, ind: number): Options => {
		return {id: ind + 1, name: countries[item] as string, value: item}
	},
)
