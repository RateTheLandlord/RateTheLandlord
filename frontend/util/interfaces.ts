export interface AllReviews {
	'/api/get-reviews': [Review]
}

export interface Review {
	city: string
	countrycode: string
	health: string
	id: number
	landlord: string
	privacy: string
	repair: string
	respect: string
	review: string
	stability: string
	state: string
	zip: string
}

export interface Options {
	value: string
	label: string
	checked: boolean
}

export interface Filters {
	id: string
	name: string
	options: [Options]
}

export interface SortOptions {
	name: string
	href: string
	current: boolean
}

export interface ActiveFilters {
	value: string
	label: string
}
