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
	date_added: string
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

export interface ILinks {
	name: string
	href: string
	icon: JSX.Element
	umami: string
}

export interface INav {
	href: string
	name: string
	umami: string
	mobileumami: string
}

export interface ILocationResponse {
	address: {
		["code"]: string,
		city: string
		country: string
		country_code: string
		county: string
		postcode: string
		state: string
		state_district: string
	}
	boundingbox: Array<string>
	class: string
	display_name: string
	icon: string
	importance: number
	lat: string
	licence: string
	lon: string
	osm_id: number
	osm_type: string
	place_id: number
	type: string
}

export interface ILocationHookResponse {
	id: number,
	city: string
	state: string
}