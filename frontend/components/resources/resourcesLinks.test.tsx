/**
 * @jest-environment jsdom
 */
import React from 'react'
import {render, screen} from '@testing-library/react'
import ResourceTenantLinks from './resourcesLinks'

describe('ResourceTenantLinks', () => {
	it('renders the component with correct country links', () => {
		render(<ResourceTenantLinks />)

		const countryLinks = screen.getAllByTestId('about-ResourceTenantLinks-1')
		expect(countryLinks).toHaveLength(1) // Assuming only one element with this test id

		const countryElements = screen.getAllByRole('heading', {level: 3})
		const countryNames = countryElements.map((element) => element.textContent)
		expect(countryNames).toEqual([
			'Canada',
			'United States',
			'United Kingdom',
			'Australia',
			'New Zealand',
		])
	})
})
