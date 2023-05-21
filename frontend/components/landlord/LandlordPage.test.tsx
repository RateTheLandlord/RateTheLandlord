/**
 * @jest-environment jsdom
 */
import {render, screen} from '@testing-library/react'
import LandlordPage from './LandlordPage'

describe('LandlordPage', () => {
	const landlord = 'John Doe'
	const reviews = [
		{
			city: 'Testville',
			country_code: 'CA',
			health: '3',
			id: 123,
			landlord: 'John Doe',
			privacy: '1',
			repair: '1',
			respect: '1',
			review:
				"I'm going to write stuff here so that it models the average review, we'll expand these later to include weird stuff.",
			stability: '5',
			state: 'AB',
			zip: 'T1T 1T1',
			flagged: false,
			flagged_reason: '',
			admin_approved: null,
			admin_edited: false,
			date_added: new Date().toLocaleDateString(),
		},
		// ... add more sample reviews if needed
	]

	beforeEach(() => {
		render(<LandlordPage landlord={landlord} reviews={reviews} />)
	})

	it('renders the landlord information', () => {
		const landlordInfo = screen.getByText(landlord)
		expect(landlordInfo).toBeInTheDocument()
	})
})
