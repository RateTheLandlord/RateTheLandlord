/**
 * @jest-environment jsdom
 */

import {render, screen} from '@testing-library/react'
import Privacy from './privacy'

describe('Privacy', () => {
	it('renders privacy information correctly', () => {
		render(<Privacy />)

		const heading = screen.getByRole('heading', {name: /privacy/i})
		const paragraph = screen.getByText(/At Rate the Landlord/i)

		expect(heading).toBeInTheDocument()
		expect(paragraph).toBeInTheDocument()

		expect(heading).toHaveTextContent('Privacy') // Update with the expected translation
		expect(paragraph).toHaveTextContent('At Rate the Landlord') // Update with the expected translation
	})
})
