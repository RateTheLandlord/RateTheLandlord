/**
 * @jest-environment jsdom
 */

import {render, screen} from '@testing-library/react'
import Moderation from './moderation'

describe('Moderation', () => {
	it('renders moderation paragraphs correctly', () => {
		render(<Moderation />)

		const paragraphs = screen.getAllByRole('paragraph')
		const expectedParagraphs = [
			'Tenants visit Rate The Landlord to find information on prospective landlords based on reviews from their previous tenants. We will carefully moderate the submitted reviews to ensure they are relevant, appropriate, and respect the privacy of both parties.',
			'We strictly prohibit the posting of threats, hate speech, lewd or discriminatory language.',
			"At Rate The Landlord, privacy is important. A landlord's name is used in reviews because they operate a business under that name. However, we do not permit the posting of addresses, phone numbers, or any personal information related to the landlord or other parties involved.",
			'Any reviews found in violation of this policy will be amended or removed at our discretion. We remain neutral and will not engage in factual disputes regarding the content of the reviews.',
			// Update with the content of other paragraphs...
		]

		expect(paragraphs).toHaveLength(4) // Assuming there are 4 paragraphs

		paragraphs.forEach((paragraph, index) => {
			expect(paragraph).toHaveTextContent(expectedParagraphs[index])
		})
	})
})
