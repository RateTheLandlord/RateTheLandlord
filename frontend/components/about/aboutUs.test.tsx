/**
 * @jest-environment jsdom
 */
import React from 'react'
import {render, RenderResult} from '@testing-library/react'
import AboutUs from './aboutUs'

// Define custom translations for testing
const translations: Record<string, string> = {
	'about.about-us.about': 'About Us',
	'about.about-us.header': 'Header',
	'about.about-us.p-1': 'Paragraph 1',
	'about.about-us.p-2': 'Paragraph 2',
	'about.about-us.p-3': 'Paragraph 3',
	'about.about-us.p-4': 'Paragraph 4',
}

// Mock the useTranslation hook
jest.mock('react-i18next', () => ({
	useTranslation: () => {
		return {
			t: jest.fn((key: string) => translations[key] || key),
		}
	},
}))

describe('AboutUs', () => {
	let renderResult: RenderResult

	beforeEach(() => {
		renderResult = render(<AboutUs />)
	})

	test('renders the component with translated content', () => {
		const {getByTestId, getByText} = renderResult

		// Check if the component renders correctly
		const aboutUsElement = getByTestId('about-aboutus-1')
		expect(aboutUsElement).toBeInTheDocument()

		// Check if the translated text is displayed correctly
		const headerElement = getByText('Header')
		expect(headerElement).toBeInTheDocument()

		const p1Element = getByText('Paragraph 1')
		expect(p1Element).toBeInTheDocument()

		const p2Element = getByText('Paragraph 2')
		expect(p2Element).toBeInTheDocument()

		const p3Element = getByText('Paragraph 3')
		expect(p3Element).toBeInTheDocument()

		const p4Element = getByText('Paragraph 4')
		expect(p4Element).toBeInTheDocument()
	})

	// Add more test cases as needed
})
