/**
 * @jest-environment jsdom
 */
import React from 'react'
import {render, screen} from '@testing-library/react'
import AboutUs from './aboutUs'

jest.mock('react-i18next', () => ({
	useTranslation: jest.fn().mockReturnValue({
		t: jest.fn().mockImplementation((key) => {
			if (key === 'about.about-us.about') {
				return 'About Us'
			} else if (key === 'about.about-us.info') {
				return ['Info 1', 'Info 2', 'Info 3']
			}
		}),
	}),
}))

test('renders about section with info items', () => {
	render(<AboutUs />)
	const aboutSection = screen.getByTestId('about-aboutus-1')
	expect(aboutSection).toBeInTheDocument()

	expect(screen.getByText('About Us')).toBeInTheDocument()
})