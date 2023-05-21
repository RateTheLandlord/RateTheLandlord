/**
 * @jest-environment jsdom
 */
import React from 'react'
import {render, RenderResult} from '@testing-library/react'
import Contact from './contact'

describe('Contact', () => {
	let renderResult: RenderResult

	beforeEach(() => {
		renderResult = render(<Contact />)
	})

	test('renders the component with contact information', () => {
		const {getByTestId, getByText} = renderResult

		// Check if the component renders correctly
		const contactElement = getByTestId('about-contact-1')
		expect(contactElement).toBeInTheDocument()

		// Check if the contact title is displayed correctly
		const titleElement = getByText('Contact Us')
		expect(titleElement).toBeInTheDocument()

		// Check if the contact email is displayed correctly
		const emailElement = getByText('Email us: contact@ratethelandlord.org')
		expect(emailElement).toBeInTheDocument()
		expect(emailElement).toHaveAttribute(
			'href',
			'mailto:contact@ratethelandlord.org',
		)
	})

	// Add more test cases as needed
})
