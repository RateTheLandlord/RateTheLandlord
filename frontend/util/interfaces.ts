export interface AllReviews {
	['/api/get-reviews']: [Review]
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
	flagged: boolean
	flageedReason: string
	adminApproved: boolean | null
}

export interface Options {
	id: number
	name: string
	value: string
}

export interface NewFilter {
	key: string
	value: string
}
