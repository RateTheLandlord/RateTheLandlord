/**
 * @jest-environment jsdom
 */
import React from 'react'
import {render, screen} from '@testing-library/react'
import AboutUs from './aboutUs'

test('renders about section with info items', () => {
	render(<AboutUs />)
	const aboutSection = screen.getByTestId('about-aboutus-1')
	expect(aboutSection).toBeInTheDocument()

	expect(screen.getByText('About Us')).toBeInTheDocument()
})