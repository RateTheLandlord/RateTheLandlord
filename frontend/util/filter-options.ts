export const sortOptions = [
	{id: 1, name: 'Name A-Z'},
	{id: 2, name: 'Name Z-A'},
]

export const initialFilters = [
	{
		id: 'country',
		name: 'Country',
		options: [
			{value: 'ca', label: 'Canada', type: 'countrycode', checked: false},
			{value: 'us', label: 'USA', type: 'countrycode', checked: false},
		],
	},
	{
		id: 'province/state',
		name: 'Province / State',
		options: [
			//Will need to load in available province/state info
			{value: 'ontario', label: 'Ontario', type: 'state', checked: false},
		],
	},
	{
		id: 'city',
		name: 'City',
		options: [
			//Will need to load in available city info
			{value: 'toronto', label: 'Toronto', type: 'city', checked: false},
			{
				value: 'mississauga',
				label: 'Mississauga',
				type: 'city',
				checked: false,
			},
		],
	},
]
