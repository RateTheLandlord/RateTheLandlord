export const sortOptions = [
	{id: 1, name: 'Name A-Z'},
	{id: 2, name: 'Name Z-A'},
]

export const initialFilters = [
	{
		id: 'country',
		name: 'Country',
		options: [
			{value: 'canada', label: 'Canada', checked: false},
			{value: 'usa', label: 'USA', checked: false},
		],
	},
	{
		id: 'province/state',
		name: 'Province / State',
		options: [
			//Will need to load in available province/state info
			{value: 'ontario', label: 'Ontario', checked: false},
		],
	},
	{
		id: 'city',
		name: 'City',
		options: [
			//Will need to load in available city info
			{value: 'toronto', label: 'Toronto', checked: false},
		],
	},
]
