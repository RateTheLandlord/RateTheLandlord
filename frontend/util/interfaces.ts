export interface AllReviews {
	['/api/get-reviews']: [Review]
}

export interface Review {
	city: string
	country_code: string
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
	flagged_reason: string
	admin_approved: boolean | null
	admin_edited: boolean
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
