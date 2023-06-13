/**
 * @jest-environment jsdom
 */
import React from 'react'
import {render, screen} from '@testing-library/react'
import Contact from './contact'

jest.mock('react-i18next', () => ({
	useTranslation: jest.fn().mockReturnValue({
		t: jest.fn().mockImplementation((key) => {
			if (key === 'about.contact.title') {
				return 'Contact Us'
			} else if (key === 'about.contact.email') {
				return 'contact@ratethelandlord.org'
			}
		}),
	}),
}))

test('renders contact section with title and email', () => {
	render(<Contact />)
	const contactSection = screen.getByTestId('about-contact-1')
	expect(contactSection).toBeInTheDocument()

	expect(screen.getByText('Contact Us')).toBeInTheDocument()

	const emailLink = contactSection.querySelector(
		"a[href='mailto:contact@ratethelandlord.org']",
	)
	expect(emailLink).toBeInTheDocument()
	expect(emailLink).toHaveTextContent('contact@ratethelandlord.org')
})