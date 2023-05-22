/**
 * @jest-environment jsdom
 */
import React from 'react'
import {render, screen} from '@testing-library/react'
import ResourcesInfo from './resourcesInfo'

describe('ResourcesInfo', () => {
	it('renders the component with the correct content', () => {
		render(<ResourcesInfo />)

		const resourcesInfoElement = screen.getByTestId('about-Resources-1')
		expect(resourcesInfoElement).toBeInTheDocument()

		const headingElement = screen.getByRole('heading', {level: 1})
		expect(headingElement).toHaveTextContent('Resources')

		// You can add additional assertions to verify the content and structure of the component.
	})
})
